import Cell from "./cell.js";

export default class Organism {
    static #table
    //controls
    static #size = 0
    static #interval = 100
    static #repetitionCounter = 0
    static #repetitionThreshold = 5

    //Stats
    static #iteration = 0
    static #livingCellsPerIteration = 0
    static #deadCellsPerIteration = 0

    static #fatalitiesOfOverpopulation = 0
    static #fatalitiesOfUnderpopulation = 0
    static #reproducedCells = 0

    static #previousLivingCellsPerIteration = 0
    static #previousDeadCellsPerIteration = 0

    //Loop Cooditions
    static #hasStarted = false
    static #hasStopped = false
    static #isStable = false
    static #isAlive = true
    static #isRepeating = false

    static getPreviousLivingCellsPerIteration(){
      return this.#previousLivingCellsPerIteration
    }

    static getPreviousDeadCellsPerIteration(){
      return this.#previousDeadCellsPerIteration
    }

    static getRepetitionCounter(){
      return this.#repetitionCounter
    }

    static getRepetitionThreshold(){
      return this.#repetitionThreshold
    }

    static getTable(){
      return this.#table
    }

    static getSize(){
      return this.#size
    }

    static getInterval(){
      return this.#interval
    }

    static getTable(){
      return this.#table
    }

    static getIteration(){
      return this.#iteration
    }

    static getLivingCellPerIteration(){
      return this.#livingCellsPerIteration
    }

    static getDeadCellPerIteration(){
      return this.#deadCellsPerIteration
    }

    static getFatalitiesOfOverpopulation(){
      return this.#fatalitiesOfOverpopulation
    }

    static getFatalitiesOfUnderpopulation(){
      return this.#fatalitiesOfUnderpopulation
    }

    static getReproducedCells(){
      return this.#reproducedCells
    }

    static getHasStarted(){
      return this.#hasStarted
    }

    static getHasStopped(){
      return this.#hasStopped
    }

    static getIsStable(){
      return this.#isStable
    }

    static getIsAlive(){
      return this.#isAlive
    }

    static getIsRepeating(){
      return this.#isRepeating
    }

    static setSize(size){
       this.#size = size 
    }

    static setTable(table){
      this.#table = table 
    } 

    static getInterval(interval){
      this.#interval = interval
    }

    static getHasStarted(){
      return this.#hasStarted
    }

    static setHasStarted(){
      this.#hasStarted = true
    }

    static setStopped(){
      this.#hasStopped = true
    }

    static setInterval(interval){
      this.#interval = interval
    }

    static setIteration(){
     ++this.#iteration
    }

    static setIsAlive(bool){
      this.#isAlive = bool
    }

    static setIsRepeating(bool){
      this.#isRepeating = bool
    }

    static setRepetitionCounter(){
      ++this.#repetitionCounter
    }

    static resetRepetitionCounter(){
      this.#repetitionCounter = 0
    }

    static setPreviousLivingCellsPerIteration(number){
      this.#previousLivingCellsPerIteration = number
    }

    static setPreviousDeadCellsPerIteration(number){
      this.#previousDeadCellsPerIteration = number
    }

    static resetIterationStatsCounter(){
      this.#deadCellsPerIteration = 0
      this.#livingCellsPerIteration = 0
    }

    static initTable(){
      let size = this.getSize()
      let table =  Array.from(new Array(size), () => new Array(size))
      this.setTable(table)
    }

    static startingLive(array){
      for(var row = 0; row < array.length; row++){
        for(var col = 0; col < array.length; col++){
          let cell = this.#CreateCell()
          array[row][col] = cell
          this.#setIterationStatsCounter(cell)
        }
      }
      return array
    }

    static #CreateCell(){
      return (Math.random() > 0.75) ? new Cell(true) : new Cell(false)
     }

    static validateStock(array){
      for(var row = 0; row < array.length; row++){
        for(var col = 0; col < array.length; col++){
            let cell = array[row][col]
            let livingAdjacentCells = this.#livingAdjacentCells(row, col)
            cell.determineDevelopment(livingAdjacentCells)
            this.#updateStatsForCells(cell)
      }
    }
  }

  static #livingAdjacentCells(row, col){
    let adjacentCellCoordinates = this.#getAdjacentCellCoordinates(row, col)
    let adjacentCells = adjacentCellCoordinates.map(coordinate => this.#getCellbyCoordinate(coordinate))
    return this.#calculateNumberOfLivingAdjacentCells(adjacentCells)
  }

  static #getAdjacentCellCoordinates(row, col){
    let size = this.getSize()
    let columns = Array((col - 1), col, ( col + 1)).map(index => this.#calculateValidIndex(index, size))
    let rows = Array((row - 1), row, (row + 1)).map(index => this.#calculateValidIndex(index, size)) 
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

  static #updateStatsForCells(cell){
    if(cell.getIsOverpopulated())
      ++this.#fatalitiesOfOverpopulation

    if(cell.getIsUnderpopulated())
      ++this.#fatalitiesOfUnderpopulation  

    if(cell.getIsReproducing())
      ++this.#reproducedCells  
  }
  
  static evolveGeneration(array){
    let acc = true
    this.#saveCurrentStatsAndReset()

    for(var row = 0; row < array.length; row++){
      for(var col = 0; col < array.length; col++){
      const cell = this.#table[row][col]
      cell.evolve()
      this.#setIterationStatsCounter(cell)
      acc =  acc && cell.getIsUnchanged()     
      }
    }  
    this.#isStable = acc
    this.setIteration()
  }

  static #saveCurrentStatsAndReset(){
    this.setPreviousIterationStatsCounter()
    this.resetIterationStatsCounter()
  }

  static #setIterationStatsCounter(cell){
    cell.getIsAlive() == true ? ++this.#livingCellsPerIteration : ++this.#deadCellsPerIteration
  }

  static setPreviousIterationStatsCounter(){
    let currentDeadCells = this.getDeadCellPerIteration()
    let currentLivingCells = this.getLivingCellPerIteration()

    this.setPreviousLivingCellsPerIteration(currentLivingCells)
    this.setPreviousDeadCellsPerIteration(currentDeadCells)
  }


  static initEvolution(size){
      this.setSize(size)
      this.initTable()

      let table = this.getTable()
      return this.startingLive(table)
  }

 static detectRepetition(){
  let previousDeadCells = this.getPreviousDeadCellsPerIteration()
  let previousLivingCells = this.getPreviousLivingCellsPerIteration()

  let currentDeadCells = this.getDeadCellPerIteration()
  let currentLivingCells = this.getLivingCellPerIteration()

  previousDeadCells == currentDeadCells && previousLivingCells == currentLivingCells ? this.setRepetitionCounter() : this.resetRepetitionCounter()

  this.#validateRepetitionCondition()
 }

 static #validateRepetitionCondition(){
  if(this.getRepetitionCounter() == this.getRepetitionThreshold()){  
    this.setIsRepeating(true)
  }
 }

 static runHealthCheck(){
  if(Organism.getLivingCellPerIteration() == 0){
    Organism.setIsAlive(false)
  }
 }

}