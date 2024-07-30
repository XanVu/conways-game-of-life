import StatisticHandler from "./StatisticHandler.js";
import Cell from "./Cell.js";
import ConditionHandler from "./ConditionHandler.js";
import tableComp from "./TableComponent.js";

export default class TableHandler {
    #rowDepth
    #columnDepth
    #table   
    #repetitionCounter = 0
    #repetitionThreshold = 5
    #conditionHandler
    #statisticHandler

    constructor(rowDepth, columnDepth){
      this.#statisticHandler = new StatisticHandler()
      this.#conditionHandler = new ConditionHandler()
      this.#rowDepth = rowDepth
      this.#columnDepth = columnDepth
    }


  //#region GetterSetter


    getTable(){
      return this.#table
    }
    
    getStatisticHandler(){
      return this.#statisticHandler
    }

    getConditionHandler(){
      return this.#conditionHandler
    }

    getRowDepth(){
      return this.#rowDepth
    }

    getColumnDepth(){
      return this.#columnDepth
    }

    #getRepetitionCounter(){
      return this.#repetitionCounter
    }

    #getRepetitionThreshold(){
      return this.#repetitionThreshold
    }

    setRowDepth(size){
       this.#rowDepth = size
    }

    setColumnDepth(size){
      this.#columnDepth = size 

   }

    setTable(table){
      this.#table = table 
    } 
    //#endregion


    #incrementRepetitionCounter(){
      this.#repetitionCounter += 1
    }

    #resetRepetitionCounter(){
      this.#repetitionCounter = 0
    }

    #buildTable(){
        let rowDepth = this.getRowDepth()
        let columnDepth = this.getColumnDepth()
        let table =  Array.from(Array(rowDepth), () => Array.from(Array(columnDepth), () => new Cell(false)))
        this.setTable(table) 
        return table
    }

    #refreshTable(){ 
      let array = this.getTable()
      let statisticHandler = this.getStatisticHandler()
      let acc = statisticHandler.getAccumulator()

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
      let conditionHandler = this.getConditionHandler()

      if(cell.hasSwitchedStatus())
        conditionHandler.setChanging(cell.hasSwitchedStatus())
    }
    
  
    #validateTableRelatedConditions(acc){
      let statisticHandler = this.getStatisticHandler()
      let conditionHandler = this.getConditionHandler()

      let isRepeating = statisticHandler.processDataAndComputeCondition(acc)
      let currentLivingCells = statisticHandler.getCurrentLivingCells()

      isRepeating ? this.#incrementRepetitionCounter() : this.#resetRepetitionCounter()
      let repetitionCounter = this.#getRepetitionCounter()
    
       if(repetitionCounter >= this.#getRepetitionThreshold())
          conditionHandler.setIsRepeatingPattern(true)

        if(currentLivingCells	 == 0)
          conditionHandler.setIsAlive(false)

        this.#confirmChangeBehavior()
    }

    #confirmChangeBehavior(){
      let conditionHandler = this.getConditionHandler()
      let evolved = conditionHandler.getChanging()
      conditionHandler.setIsEvolving(evolved)
      conditionHandler.resetChanging()
    }

  #getAdjacentCells(row, col){
    let rowDepth = this.getRowDepth()
    let columnDepth = this.getColumnDepth()
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
      let statisticHandler = this.getStatisticHandler()
      let evolvedIndicator = statisticHandler.getGeneration()
      return adjacentCells.reduce((acc, cell) => {
       return cell.determineVitalStatus(evolvedIndicator) ? ++acc : acc }, 0 );
      }

     isOrganismStillEvolving(){
        let conditionHandler = this.getConditionHandler()
        return conditionHandler.isEvolving()
    }
  
   //#region external Functions

   createTableAndConfig(rowHook, columnHook){
    let table = this.#buildTable() 
    let statisticHandler = this.getStatisticHandler()
    let acc = statisticHandler.getAccumulator()
  
    table.forEach(subarray => {
      let row = rowHook()  
      subarray.forEach(cell => {
      let vitalStatus = cell.determineInitialVitalStatus()
      
      if(cell.getVitalStatus())
        ++acc.currentLivingCells

      columnHook(row, vitalStatus)
    })})
    statisticHandler.processDataAndComputeCondition(acc)
  }

    evolving(){

      if(this.isOrganismStillEvolving()){
       this.#refreshTable()
        let statisticHandler = this.getStatisticHandler()
        tableComp.refreshStatisticTab(statisticHandler.getCurrentStatistics())
        tableComp.determineStatus()    
        setTimeout(this.evolving.bind(this), 25)
      }
   }

   //endregion
}