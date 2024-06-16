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
     this.setTable(table)   
    }

    validateStock(){
      let array = this.getTable()
      array.forEach((subarray, row) => subarray.forEach((cell, col) => {
            let livingAdjacentCells = this.#livingAdjacentCells(row, col)
            cell.determineDevelopment(livingAdjacentCells)
            this.statisticHandler.updateReasonOfDevelopment(cell)
      }))
    }

  #livingAdjacentCells(row, col){
    let adjacentCellCoordinates = this.#getAdjacentCellCoordinates(row, col)
    let adjacentCells = adjacentCellCoordinates.map(coordinate => this.#getCellbyCoordinate(coordinate))
    return this.#calculateNumberOfLivingAdjacentCells(adjacentCells)
  }

  #getAdjacentCellCoordinates(row, col){
    let rowDepth = this.#getRowDepth()
    let columnDepth = this.#getColumnDepth()
    let columns = Array((col - 1), col, ( col + 1)).map(index => this.#calculateValidIndex(index, columnDepth))
    let rows = Array((row - 1), row, (row + 1)).map(index => this.#calculateValidIndex(index, rowDepth)) 
    let cartesianProduct = rows.flatMap(row => columns.map(column => Array(row, column)))
    let adjacentCells = cartesianProduct.filter(coordinateArray => !this.#isIdentity(row, col, coordinateArray))
    return adjacentCells
    }

    #calculateValidIndex(index, size){
      return this.#mod(index, size)
     }
  
    #mod(a,b){
      return a - (Math.floor(a / b) * b)
    }

    #isIdentity(row, col, array){
      let identity = Array(row, col)
      return array.every((element, index) => element === identity[index]);
    }

    #getCellbyCoordinate(coordinate){
      let table = this.getTable()
      let row = coordinate[0]
      let col = coordinate[1]
      return table[row][col]
    }

    #calculateNumberOfLivingAdjacentCells(adjacentCells){
      return adjacentCells.reduce((acc, cell) => {
      return cell.getIsAlive() ? ++acc : acc}, 0 );
    }
  
    evolveGeneration(){
      this.statisticHandler.saveStatsPerIteration()
      this.statisticHandler.resetStatsPerIteration()    
      this.statisticHandler.incrementIteration()
      let array = this.getTable()

      array.forEach(subarray => subarray.forEach(cell => {
            cell.evolve()
            this.statisticHandler.incrementStatsPerIterationForCell(cell.getIsAlive())
            this.conditionValidator.changeDetection(cell.getHasChanged())
      }))

      this.conditionValidator.resetChangedAndConfirmEvolving()
  }

  setRepetitionFlag(){
    let counter = this.statisticHandler.handleRepetitionCounter()
    this.conditionValidator.inspectRepetitionCondition(counter)
   }
}


let organism = Object.freeze(new Organism());
export default organism;

export function recursiveLoop(){
 
    if(organism.conditionValidator.isLooping()){
    
      organism.validateStock()
      organism.evolveGeneration()
      let livingCells = organism.statisticHandler.getLivingCellsPerIteration()
      organism.conditionValidator.executeHealthCheck(livingCells)
      organism.setRepetitionFlag()


      table.updateHtmlSpanInTable()
      statisticComponent.loadStatisticTab()
      
      setTimeout(recursiveLoop, organism.getInterval())
    }
        
}