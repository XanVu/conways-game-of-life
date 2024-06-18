import StatisticHandler from "./StatisticHandler.js";
import Cell from "./Cell.js";
import ConditionValidator from "./ConditionValidator.js";
import table from "./TableComponent.js";
import statisticComponent from "./StatisticComponent.js";

let instance

class Organism {
    #rowDepth = 45
    #columDepth = 45
    #table   
    #interval = 0

    conditionValidator
    statisticHandler

    constructor(){
      this.statisticHandler = new StatisticHandler(this.#getRowDepth(), this.#getColumnDepth())
      this.conditionValidator = new ConditionValidator()
      
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

    getInterval(){
      return this.#interval
    }

    setRowDepth(size){
       this.#rowDepth = size
       this.statisticHandler.setRowDimension(size)
    }

    setColumnDepth(size){
      this.#columDepth = size 
      this.statisticHandler.setColumnDimension(size)
   }

    setTable(table){
      this.#table = table 
    } 

    setInterval(interval){
      this.#interval = interval
    }


    resetOrganism(){
      this.setTable(null)
      this.statisticHandler.initToDefault()
      this.conditionValidator.initToDefault()
      this.initializeTable()
    }

    initializeTable(){
      let rowDepth = this.#getRowDepth()
      let columnDepth = this.#getColumnDepth()
      let table =  Array.from(Array(rowDepth), () => Array.from(Array(columnDepth), () => new Cell(false)))
    
      table.forEach(subarray => {
        subarray.forEach(cell => {
        cell.validateProbailityOfComingAlive()
        this.statisticHandler.incrementStatsPerIterationForCell(cell.getIsAlive())
      })})

        this.statisticHandler.setPreviousLivingCellsPerIteration(this.statisticHandler.getLivingCellsPerIteration())

     this.setTable(table)   
    }

    validateStock(){
      let array = this.getTable()

      let currentIteration = this.statisticHandler.getIteration()
      let nextIterationValue = currentIteration + 1

      

      array.forEach((subarray, row) => subarray.forEach((cell, col) => {
            let adjacentCells = this.#getAdjacentCells(row, col)
            let livingAdjacentCells = this.#calculateNumberOfLivingAdjacentCells(adjacentCells, currentIteration)
            cell.evolving(livingAdjacentCells, nextIterationValue)       
            this.statisticHandler.updateReasonOfDevelopment(cell)
            this.conditionValidator.changingCellExists(cell.getHasChanged())
          })) 

            let repetitionCounter = this.statisticHandler.handleRepetitionCounter()
            let livingCells = this.statisticHandler.getLivingCellsPerIteration()
            this.conditionValidator.validateInternnalLoopingConditions(repetitionCounter, livingCells)
            this.statisticHandler.saveStatsPerIteration()
           
    }

  #getAdjacentCells(row, col){
    let rowDepth = this.#getRowDepth()
    let columnDepth = this.#getColumnDepth()
    let columns = Array((col - 1), col, ( col + 1)).map(index => this.#calculateValidIndex(index, columnDepth))
    let rows = Array((row - 1), row, (row + 1)).map(index => this.#calculateValidIndex(index, rowDepth))
    let identityPoint = {row: row, col: col}
    let adjacentCellsCoordinates = rows.flatMap(row => columns.map(column => {return {row: row, col: column}})).filter(point => !(point.row == identityPoint.row && point.col == identityPoint.col))
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

    #calculateNumberOfLivingAdjacentCells(adjacentCells, currentIteration){
      return adjacentCells.reduce((acc, cell) => {
        
        if(currentIteration != cell.getCurrentEvolutionStep())
           return cell.getPreviousState() ? ++acc : acc
         else
          return cell.getIsAlive() ? ++acc : acc
          }, 0 );
    }
}


let organism = Object.freeze(new Organism());
export default organism;

export function recursiveLoop(){

    if(organism.conditionValidator.isLooping()){
  
      organism.validateStock()
      table.updateHtmlSpanInTable()
      statisticComponent.loadStatisticTab()

      setTimeout(recursiveLoop, organism.getInterval())
    }
        
}