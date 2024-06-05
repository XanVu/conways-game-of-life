import Cell from "./cell.js";

export default class Organism {
    #livingCellsPerIteration = 0
    #deadCellsPerIteration = 0
    #CellsDiedOfOverpopulation = 0
    #CellsDiedOfUnderpopulation = 0
    #CellsRevivedByReproduction = 0
    #iteration = 0
    #org
    #size
    #interval = 100
    #hasStarted = false
    #stopped = false
    #stable = false

    constructor(size){
      this.#size = size
      this.#org = this.#startingLive()
    }

    resetOrg(){
    }

    getHasStarted(){
      return this.#hasStarted
    }

    setHasStarted(){
      this.#hasStarted = true
    }

    setStopped(){
      this.#stopped = true
    }

    setInterval(interval){
      this.#interval = interval
    }

    #resetCurrentEvolutionCounter(){
      this.#deadCellsPerIteration = 0
      this.#livingCellsPerIteration = 0
    }

    #isEqualToIdentityCoordinates(row, col, array){
      let identity = Array(row, col)
      return array.every((element, index) => element === identity[index]);
    }

    #getNeighbursCoordinates(row, col){
    let columns = this.#sanitizeArrayIndecies(Array((col - 1), col, ( col + 1)))
    let rows = this.#sanitizeArrayIndecies(Array((row - 1), row, (row + 1)))
    let cartesianProduct = rows.flatMap(row => columns.map(column => Array(row, column)))
    let cartesianProductWithoutIdentity = cartesianProduct.filter(coordinateArray => !this.#isEqualToIdentityCoordinates(row, col, coordinateArray))
    return cartesianProductWithoutIdentity
  }

  #getCellbyCoordinate(coordinate){
    let row = coordinate[0]
    let col = coordinate[1]
    return this.#org[row][col]
  }

  #sanitizeArrayIndecies(array){
    return array.map(value => value - (Math.floor(value / this.#size) * this.#size));
  }

  #startingLive(){
    let array =  Array.from(new Array(this.#size), () => new Array(this.#size))
      let table = document.querySelector("table");

      for(var row = 0; row < array.length; row++){

        let r = table.insertRow()

        for(var col = 0; col < array.length; col++){
          let cell = this.#GeneratingLife()
          this.#incrementStats(cell)
          array[row][col] = cell
          let ce = r.insertCell()

          var container = document.createElement("span")
          
          if(cell.getIsAlive())
            container.classList.add("greenCircle");
          else
          container.classList.add("blackCircle")
          
      
          ce.appendChild(container)
        }
      }
      
      
      this.#setHtmlStatValues()
      this.#setHmtlIterationValue();
      return array
    }

    #incrementStats(cell){
      cell.getIsAlive() == true ? this.#livingCellsPerIteration++ : this.#deadCellsPerIteration++
    }

    #findNumberOfLivingNeighbursCells(row, col){
      let neighburCellCoordinates = this.#getNeighbursCoordinates(row, col)
      let cellNeighburs = neighburCellCoordinates.map(x => this.#getCellbyCoordinate(x))
      return cellNeighburs.reduce((acc, cell) => {
              return cell.getIsAlive() ? ++acc : acc     
      }, 0);
    }

    #GeneratingLife(){
     return (Math.random() > 0.5) ? new Cell(true) : new Cell(false)
    }

    #validateCurrentGeneneration(){
      for(var row = 0; row < this.#org.length; row++){
        for(var col = 0; col < this.#org.length; col++){
            let cell = this.#org[row][col]
            let livingNeighboursCells = this.#findNumberOfLivingNeighbursCells(row, col)
            cell.determineDevelopment(livingNeighboursCells)

            let o = cell.getIsOverpopulated()
            let u = cell.getIsUnderpopulated()
            let r = cell.getIsReproducing()

          	if(o)
              ++this.#CellsDiedOfOverpopulation 
              if(u)
                ++this.#CellsDiedOfUnderpopulation
                if(r)
                  ++this.#CellsRevivedByReproduction
      }
    }
  }
  
  #evolveGeneration(){
    let unchanged = true

    for(var row = 0; row < this.#org.length; row++){
      for(var col = 0; col < this.#org.length; col++){
      const cell = this.#org[row][col]
      cell.evolve()
      this.#incrementStats(cell)
      
      unchanged =  unchanged && cell.getIsUnchanged()

      let table = document.querySelector("table")
      let td = table.rows[row].cells[col]

      let span = td.childNodes[0]


      if(cell.getIsAlive()){ 
        span.classList.remove(...span.classList)
        span.classList.add("greenCircle")
      }
      else{
        span.classList.remove(...span.classList)
        span.classList.add("blackCircle")
      }
      }
    }  

    this.#stable = unchanged

    this.#setHtmlStatValues();
  
  }

  #setHtmlStatValues(){
    document.getElementById("underpopulation").innerHTML = "Cell died of Underpopulation: " + this.#CellsDiedOfUnderpopulation 
    document.getElementById("overpopulation").innerHTML = "Cell died of Overpopulation: " + this.#CellsDiedOfOverpopulation
    document.getElementById("reproduction").innerHTML = "Cells reproduced: " +  this.#CellsRevivedByReproduction
    document.getElementById("currentLivingCells").innerHTML = "Current Living Cells: " + this.#livingCellsPerIteration 
    document.getElementById("currentDeadCells").innerHTML = "Current Dead Cells: " + this.#deadCellsPerIteration 

  }

  #setHmtlIterationValue(){
    document.getElementById("iteration").innerHTML = "Cell Iteration: " + this.#iteration
  }




  async cycleOfLife(){
    var organismIsDead = false


    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))


    while(!organismIsDead && this.#hasStarted && !this.#stopped && !this.#stable){   
      this.#validateCurrentGeneneration()







      this.#evolveGeneration()

      if(this.#livingCellsPerIteration == 0){
        organismIsDead = true
      }
      
    
      await sleep(this.#interval)


      this.#iteration++
      this.#resetCurrentEvolutionCounter();
      this.#setHmtlIterationValue();
    }  
  }
}