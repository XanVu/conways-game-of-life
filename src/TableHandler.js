import StatisticHandler from "./StatisticHandler.js";
import Cell from "./Cell.js";
import ConditionHandler from "./ConditionHandler.js";
import tableComp from "./TableComponent.js";
import tabs from "./TabComponent.js";

let instance

class TableHandler {
    #rowDepth = 45
    #columDepth = 45
    #table   
    #interval = 0
    #repetitionCounter = 0
    #repetitionThreshold = 5
    conditionHandler
    statisticHandler

    constructor(){
      this.statisticHandler = new StatisticHandler()
      this.conditionHandler = new ConditionHandler()
      
      if (instance)
        throw new Error("Singleton")
      
      instance = this
    }

    getTable(){
      return this.#table
    }

    #getRowDepth(){
      return this.#rowDepth
    }

    #getColumnDepth(){
      return this.#columDepth
    }

    #getRepetitionCounter(){
      return this.#repetitionCounter
    }

    #getRepetitionThreshold(){
      return this.#repetitionThreshold
    }

    getInterval(){
      return this.#interval
    }

    setRowDepth(size){
       this.#rowDepth = size
    }

    setColumnDepth(size){
      this.#columDepth = size 

   }

    setTable(table){
      this.#table = table 
    } 

    setInterval(interval){
      this.#interval = interval
    }

    #incrementRepetitionCounter(){
      this.#repetitionCounter += 1
    }

    #resetRepetitionCounter(){
      this.#repetitionCounter = 0
    }

    resetOrganism(rowHook, columnHook){
      this.setTable(null)
      this.statisticHandler.initToDefault()
      this.conditionHandler.initToDefault()
      this.createTableAndConfig(rowHook, columnHook)
    }

    #buildTable(){
        let rowDepth = this.#getRowDepth()
        let columnDepth = this.#getColumnDepth()
        let table =  Array.from(Array(rowDepth), () => Array.from(Array(columnDepth), () => new Cell(false)))
        this.setTable(table) 
        return table
    }

    createTableAndConfig(rowHook, columnHook){
      let table = this.#buildTable() 
      let acc = this.statisticHandler.getAccumulator()
    
      table.forEach(subarray => {
        let row = rowHook()  
        subarray.forEach(cell => {
        let vitalStatus = cell.determineInitialVitalStatus()
        if(cell.getVitalStatus())
          ++acc.currentLivingCells


        columnHook(row, vitalStatus)
      })})
      this.statisticHandler.processDataAndComputeCondition(acc)
    }

    validateStock(){
      let array = this.getTable()
      let acc = this.statisticHandler.getAccumulator()
      
      array.forEach((subarray, row) => subarray.forEach((cell, col) => {
            let adjacentCells = this.#getAdjacentCells(row, col)
            let livingAdjacentCells = this.#calculateNumberOfLivingAdjacentCells(adjacentCells)
            let vitalStatus = this.#validateEvolution(acc, cell, livingAdjacentCells)
            this.#accumulatedLivingCellsAfterEvolving(acc, cell)
            this.#validateChangeBehavior(cell)

            tableComp.refreshCell(row, col, vitalStatus)

          }))  

      
            this.#validateTableRelatedConditions(acc)
    }

    #validateEvolution(acc, cell, livingAdjacentCells){ 
      let evolvedVitalStatus
      
      if(cell.getVitalStatus()){
        let isUnderpopulated = this.#validateUnderpopulation(acc, cell, livingAdjacentCells)
        let isOverpopulated = this.#validateOverpopulation(acc, cell, livingAdjacentCells)
        evolvedVitalStatus = !isUnderpopulated && !isOverpopulated
      }
      else{
        evolvedVitalStatus = this.#validateRessurection(acc, cell, livingAdjacentCells)     
      }
      cell.cacheVitalStatusAndEvolveTo(evolvedVitalStatus)
      return evolvedVitalStatus
    }

    #accumulatedLivingCellsAfterEvolving(acc, cell){
      if(cell.getVitalStatus()) 
        acc.incrementLivingCells()
    }

    #validateUnderpopulation(acc, cell, livingAdjacentCells){
      let isUnderpopulated = cell.isUnderpopulated(livingAdjacentCells)
      if(isUnderpopulated)
         acc.incrementDeathsByUnderpopulation()

      return isUnderpopulated
    }

    #validateOverpopulation(acc, cell, livingAdjacentCells){ 
      let isOverpopulated = cell.isOverpopulated(livingAdjacentCells)  
      if(isOverpopulated)  
        acc.incrementDeathsByOverpopulation()
      
      return isOverpopulated
    }

    #validateRessurection(acc, cell, livingAdjacentCells){
      let isResurrected = cell.isResurrected(livingAdjacentCells)
      if(isResurrected)
        acc.incrementRessurectedCells()
      return isResurrected
    }

    #validateChangeBehavior(cell) {
      if(cell.hasSwitchedStatus())
        this.conditionHandler.setChanging(cell.hasSwitchedStatus())
    }
    
  
    #validateTableRelatedConditions(acc){
    let isRepeating = this.statisticHandler.processDataAndComputeCondition(acc)

    

    let currentLivingCells = this.statisticHandler.getCurrentLivingCells()

    isRepeating ? this.#incrementRepetitionCounter() : this.#resetRepetitionCounter()
    let repetitionCounter = this.#getRepetitionCounter()
    
    if(repetitionCounter >= this.#getRepetitionThreshold())
      this.conditionHandler.setIsRepeatingPattern(true)

    if(currentLivingCells	 == 0)
      this.conditionHandler.setIsAlive(false)

    this.#confirmChangeBehavior()
    }

    #confirmChangeBehavior(){
      let evolved = this.conditionHandler.getChanging()
      this.conditionHandler.setIsEvolving(evolved)
      this.conditionHandler.resetChanging()
    }

  #getAdjacentCells(row, col){
    let rowDepth = this.#getRowDepth()
    let columnDepth = this.#getColumnDepth()
    let identityPoint = {row: row, col: col}

    let columns = Array((col - 1), col, ( col + 1)).map(index => this.#calculateValidIndex(index, columnDepth))
    let rows = Array((row - 1), row, (row + 1)).map(index => this.#calculateValidIndex(index, rowDepth))
    
    let adjacentCellsCoordinates = rows.flatMap(row => columns.map(column => { return { row: row, col: column} })).filter(point => !(point.row == identityPoint.row && point.col == identityPoint.col))
    let adjacentCells = adjacentCellsCoordinates.map(coordinate => this.#getCellbyCoordinate(coordinate.row, coordinate.col))
    return adjacentCells
    }

    #calculateValidIndex(index, size){
      return this.#mod(index, size)
     }
  
    #mod(a,b){
      return a - (Math.floor(a / b) * b)
    }

    #getCellbyCoordinate(row, col){
      let table = this.getTable()
          return table[row][col]
    }

    #calculateNumberOfLivingAdjacentCells(adjacentCells){
      let evolvedIndicator = this.statisticHandler.getGeneration()
      return adjacentCells.reduce((acc, cell) => {
       return cell.determineVitalStatus(evolvedIndicator) ? ++acc : acc }, 0 );
      }
   
    isOrganismStillEvolving(){
     return this.conditionHandler.isEvolving()
    }
 }

let tableHandler = Object.freeze(new TableHandler());
export default tableHandler;

export function recursiveLoop(){

    if(tableHandler.isOrganismStillEvolving()){
      tableHandler.validateStock()
      tabs.refreshStatisticTab()

      setTimeout(recursiveLoop, tableHandler.getInterval())
    } 
}