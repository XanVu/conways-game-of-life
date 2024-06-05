import Cell from "./cell.js";

export default class Organism {
    static #table
    //controls
    static #size = 0
    static #interval = 100

    //Stats
    static #iteration = 0
    static #livingCellsPerIteration = 0
    static #deadCellsPerIteration = 0

    static #fatalitiesOfOverpopulation = 0
    static #fatalitiesOfUnderpopulation = 0
    static #reproducedCells = 0

    //Loop Cooditions
    static #hasStarted = false
    static #hasStopped = false
    static #isStable = false

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
          this.#setIterationCounter(cell)
        }
      }
      return array
    }

    static #CreateCell(){
      return (Math.random() > 0.5) ? new Cell(true) : new Cell(false)
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

    for(var row = 0; row < array.length; row++){
      for(var col = 0; col < array.length; col++){
      const cell = this.#table[row][col]
      cell.evolve()
      this.#setIterationCounter(cell)
      acc =  this.#validateUnchangedState(acc, cell.getIsUnchanged())      
      }
    }  

    this.#isStable = acc
  }

  static #setIterationCounter(cell){
    cell.getIsAlive() == true ? ++this.#livingCellsPerIteration : ++this.#deadCellsPerIteration
  }

  static #validateUnchangedState(acc, isUnchanged){
    return acc && isUnchanged
  }


//HTML STUFF

  static initHtmlTable(array, size) {
    let table = document.querySelector("table");

    for(var row = 0; row < size; row++){
        let r = table.insertRow()
     
        for(var col = 0; col < size; col++){
            let cell = array[row][col]
        
            let c = r.insertCell()
            let span = document.createElement("span")             
            c.appendChild(span)
            this.#setColorOfSpan(span, cell)
       }
    }

    this.setHtmlStatValues()
}

  static updateHtmlSpanInTable(array){
    for(var row = 0; row < array.length; row++){
      for(var col = 0; col < array.length; col++){
        let cell = array[row][col]

        let table = document.querySelector("table")
        let td = table.rows[row].cells[col]
        let span = td.childNodes[0]

        this.#setColorOfSpan(span, cell)
      }
    }
  }

  static #setColorOfSpan(span, cell){
    if(cell.getIsAlive()){ 
        span.classList.remove(...span.classList)
        span.classList.add("greenCircle")
      }
      else{
        span.classList.remove(...span.classList)
        span.classList.add("blackCircle")
      }
}

static setHtmlStatValues(){
  document.getElementById("underpopulation").innerHTML = "Cell died of Underpopulation: " + Organism.getFatalitiesOfUnderpopulation() 
  document.getElementById("overpopulation").innerHTML = "Cell died of Overpopulation: " + Organism.getFatalitiesOfOverpopulation() 
  document.getElementById("reproduction").innerHTML = "Cells reproduced: " +  Organism.getReproducedCells()
  document.getElementById("currentLivingCells").innerHTML = "Current Living Cells: " + Organism.getLivingCellPerIteration() 
  document.getElementById("currentDeadCells").innerHTML = "Current Dead Cells: " + Organism.getDeadCellPerIteration()   
  document.getElementById("iteration").innerHTML = "Cell Iteration: " + Organism.getIteration()
}

  static resetIterationCounter(){
    this.#deadCellsPerIteration = 0
    this.#livingCellsPerIteration = 0
  }
}