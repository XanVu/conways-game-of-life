import StatisticHandler from "./StatisticHandler.js";
import Cell from "./Cell.js";
import ConditionValidator from "./ConditionValidator.js";
import presentationHandler from './OrganismPresentationHandler';

let instance

class Organism {
    #rowDepth = 45
    #columDepth = 70
    #table   
    #interval = 0
    #distribution = 0.75

    conditionValidator
    lifeStatistics

    constructor(){
      this.lifeStatistics = Object.freeze(new StatisticHandler())
      this.conditionValidator = Object.freeze(new ConditionValidator(this.lifeStatistics))
      
      if (instance)
        throw new Error("Singleton")
      
      instance = this
    }

    getTable(){
      return this.#table
    }

    getRowDepth(){
      return this.#rowDepth
    }

    getColumnDepth(){
      return this.#columDepth
    }

    getInterval(){
      return this.#interval
    }

    getDistribution(){
      return this.#distribution
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

    setDistribution(distribution){
      this.#distribution = distribution
    }

    startingLive(){
      let rowDepth = this.getRowDepth()
      let columnDepth = this.getColumnDepth()
      let table =  Array.from(new Array(rowDepth), () => new Array(columnDepth))
    
      for(var row = 0; row < table.length; row++){
        let x = table[row]
        for(var col = 0; col < x.length; col++){
          let cell = (Math.random() > this.getDistribution()) ? new Cell(true) : new Cell(false) 
          this.lifeStatistics.incrementStatsPerIterationForCell(cell.getIsAlive())
          table[row][col] = cell
        }
      }
      
      this.setTable(table)
    }

    validateStock(){
      let array = this.getTable()
      array.forEach((subarray, row) => subarray.forEach((cell, col) => {
            let livingAdjacentCells = this.#livingAdjacentCells(row, col)
            cell.determineDevelopment(livingAdjacentCells)
            this.lifeStatistics.updateReasonOfDevelopment(cell)
      }))
    }

  #livingAdjacentCells(row, col){
    let adjacentCellCoordinates = this.#getAdjacentCellCoordinates(row, col)
    let adjacentCells = adjacentCellCoordinates.map(coordinate => this.#getCellbyCoordinate(coordinate))
    return this.#calculateNumberOfLivingAdjacentCells(adjacentCells)
  }

  #getAdjacentCellCoordinates(row, col){
    let rowDepth = this.getRowDepth()
    let columnDepth = this.getColumnDepth()
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
      this.lifeStatistics.saveStatsPerIteration()
      this.lifeStatistics.resetStatsPerIteration()
      this.lifeStatistics.incrementIteration()
    
      let array = this.getTable()

      array.forEach(subarray => subarray.forEach(cell => {
            cell.evolve()
            this.lifeStatistics.incrementStatsPerIterationForCell(cell.getIsAlive())
            this.conditionValidator.changeDetection(cell.getHasChanged())
      }))

      this.conditionValidator.resetChangedAndConfirmEvolving()
  }

}
let organism = Object.freeze(new Organism());
export default organism;


export function recursiveLoop(){
  organism.validateStock()
  organism.evolveGeneration()
  organism.conditionValidator.executeHealthCheck()
  organism.conditionValidator.setRepetitionFlag()
  

  //call back would be nice 
  presentationHandler.updateHtmlSpanInTable()

  if(organism.conditionValidator.isLooping())
    setTimeout(recursiveLoop, organism.getInterval())
}