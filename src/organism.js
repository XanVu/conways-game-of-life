import StatisticHandler from "./StatisticHandler.js";
import Cell from "./Cell.js";
import LoopConditionHandler from "./LoopConditionHandler.js";

export default class SphereOfLife {
    static #rowDepth = 15
    static #columDepth = 15
    static #table   
    static #interval = 0 

    static getTable(){
      return this.#table
    }

    static getRowDepth(){
      return this.#rowDepth
    }

    static getColumnDepth(){
      return this.#columDepth
    }

    static getInterval(){
      return this.#interval
    }

    static setRowDepth(size){
       this.#rowDepth = size 
    }

    static setColumnDepth(size){
      this.#columDepth = size 
   }

    static setTable(table){
      this.#table = table 
    } 

    static setInterval(interval){
      this.#interval = interval
  }

    static initTable(){
      let rowDepth = this.getRowDepth()
      let columnDepth = this.getColumnDepth()
      let table =  Array.from(new Array(rowDepth), () => new Array(columnDepth))
      this.setTable(table)
    }

    static startingLive(array){
      for(var row = 0; row < array.length; row++){
        let x = array[row]
        for(var col = 0; col < x.length; col++){
          let cell = (Math.random() > 0.75) ? new Cell(true) : new Cell(false)
          StatisticHandler.incrementStatsPerIterationForCell(cell) 
          array[row][col] = cell
        }
      }
      return array
    }

    static validateStock(array){
      for(var row = 0; row < array.length; row++){
        let x = array[row]
        for(var col = 0; col < x.length; col++){
            let cell = array[row][col]
            let livingAdjacentCells = this.#livingAdjacentCells(row, col)
            cell.determineDevelopment(livingAdjacentCells)
            StatisticHandler.updateReasonOfDevelopment(cell)
      }
    }
  }

  static #livingAdjacentCells(row, col){
    let adjacentCellCoordinates = this.#getAdjacentCellCoordinates(row, col)
    let adjacentCells = adjacentCellCoordinates.map(coordinate => this.#getCellbyCoordinate(coordinate))
    return this.#calculateNumberOfLivingAdjacentCells(adjacentCells)
  }

  static #getAdjacentCellCoordinates(row, col){
    let rowDepth = this.getRowDepth()
    let columnDepth = this.getColumnDepth()
    let columns = Array((col - 1), col, ( col + 1)).map(index => this.#calculateValidIndex(index, columnDepth))
    let rows = Array((row - 1), row, (row + 1)).map(index => this.#calculateValidIndex(index, rowDepth)) 
    let cartesianProduct = rows.flatMap(row => columns.map(column => Array(row, column)))
    let adjacentCells = cartesianProduct.filter(coordinateArray => !this.#isIdentity(row, col, coordinateArray))
    return adjacentCells
    }

    static #calculateValidIndex(index, size){
      return this.#mod(index, size)
     }
  
    static #mod(a,b){
      return a - (Math.floor(a / b) * b)
    }

    static #isIdentity(row, col, array){
      let identity = Array(row, col)
      return array.every((element, index) => element === identity[index]);
    }

  static #getCellbyCoordinate(coordinate){
    let row = coordinate[0]
    let col = coordinate[1]
    return this.#table[row][col]
  }

  static #calculateNumberOfLivingAdjacentCells(adjacentCells){
    return adjacentCells.reduce((acc, cell) => {
      return cell.getIsAlive() ? ++acc : acc}, 0);
  }
  
  static evolveGeneration(array){
    StatisticHandler.saveStatsPerIteration()
    StatisticHandler.resetStatsPerIteration()
    StatisticHandler.incrementIteration()
    
    for(var row = 0; row < array.length; row++){
      let x = array[row]
      for(var col = 0; col < x.length; col++){
      const cell = this.#table[row][col]
      cell.evolve()
      StatisticHandler.incrementStatsPerIterationForCell(cell)
      LoopConditionHandler.changeDetection(cell.getHasChanged())
      }
    }
    LoopConditionHandler.resetChangedAndConfirmEvolving()
  }

  static initEvolution(){
      this.initTable()
      let table = this.getTable()
      return this.startingLive(table)
  }
}