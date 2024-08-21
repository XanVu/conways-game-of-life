import Cell from "./Cell.js";
import tableComp from "./TableComponent.js";
import controls from "./ControlsComponent.js";

//handles all the logic that is required, so traversing the 2D array and the looping function 

export default class TableHandler {  
  #table
  #rows
  #columns     
  #generation = 1
  #isLooping = false

    constructor(rows, columns){
      this.#rows = rows
      this.#columns = columns
    }

  // #region Getter

    getTable(){
      return this.#table
    }

    getRows(){
      return this.#rows
    }

    getColumns(){
      return this.#columns
    }

  // #endregion Setter  

  // #region Setter 

    setTable(table){
      this.#table = table 
    } 

    setRows(rows){
       this.#rows = rows
    }

    setColumns(columns){
      this.#columns = columns 
    }

    setIsLooping(bool){
      this.#isLooping = bool
    }

  // #endregion  

  // #region Increments
    
  #incrementGeneration(){
    ++this.#generation
  }

  //#endregion

  
  // builds a 2 dimensional array that will hold all the cells, sets the internal table variable
  #buildTable(){
    let rowDepth = this.getRows()
    let columnDepth = this.getColumns()
    let table =  Array.from(Array(rowDepth), () => Array.from(Array(columnDepth), () => new Cell(false)))
    this.setTable(table) 
    return table
  }

  // updates every cell within the table by getting the adjacent cells, calculate the living cells, validate the new cell status and refreshing the reprensentation table
  // in the end we increment the generation variable
  #refreshTable(){ 
    let array = this.getTable()   
    array.forEach((subarray, row) => subarray.forEach((cell, col) => {
        let adjacentCells = this.#getAdjacentCells(row, col)
        let livingAdjacentCells = this.#calculateNumberOfLivingAdjacentCells(adjacentCells)
        let vitalStatus = this.#validateEvolution(cell, livingAdjacentCells)
        tableComp.refreshCell(row, col, vitalStatus)
      }))
    
    this.#incrementGeneration()      
  }


  // evalutes the next cell status depending if the current status is alive or dead and uses the adjacent living cells of that cell to calculate the next status
  // saves the calculation result within the cell and the old status gets saved in the cell cache 
    #validateEvolution(cell, livingAdjacentCells){ 
      let evolvedVitalStatus
      
      if(cell.getVitalStatus()){
        let isUnderpopulated = cell.isUnderpopulated(livingAdjacentCells)
        let isOverpopulated = cell.isOverpopulated(livingAdjacentCells)
        evolvedVitalStatus = !isUnderpopulated && !isOverpopulated
      }
      else 
        evolvedVitalStatus = cell.isResurrected(livingAdjacentCells)
  
      cell.cacheVitalStatusAndEvolveTo(evolvedVitalStatus)
      return evolvedVitalStatus
    }


  // Takes a point and calculates the adjacent points (cells)
  // For the point (1,1) -> (0,0)(0,1)(0,2) (1,0)(1,1)(1,2) (2,0)(2,1)(2,2)
  // Additionally this functions ensures valid values of the cells, so we dont get IndexOutOfBoundExceptions
  // Afterwards we eliminate the identity of that list of points (1,1), we only want the surroundings points and transform these into cell coordinates

  #getAdjacentCells(row, col){
    let rowDepth = this.getRows()
    let columnDepth = this.getColumns()
    let identityPoint = {row: row, col: col}

    let columns = Array((col - 1), col, ( col + 1)).map(index => this.#calculateValidIndex(index, columnDepth))
    let rows = Array((row - 1), row, (row + 1)).map(index => this.#calculateValidIndex(index, rowDepth))
    
    let adjacentCellsCoordinates = rows.flatMap(row => columns.map(column => { return { row: row, col: column} })).filter(point => !(point.row == identityPoint.row && point.col == identityPoint.col))
    let adjacentCells = adjacentCellsCoordinates.map(coordinate => this.#getCellbyCoordinate(coordinate.row, coordinate.col))
    return adjacentCells
    }

    // using the mod function we ensure that we only get positive values, which a within the size barrier
    #calculateValidIndex(index, size){
      return this.#mod(index, size)
     }
  
    // a mod function 
    #mod(a,b){
      return a - (Math.floor(a / b) * b)
    }

    // gets the cell within the table with a point (row, column)
    #getCellbyCoordinate(row, col){
      let table = this.getTable()
          return table[row][col]
    }


    // calculates a value that is equal to the number of cell which are alive
    #calculateNumberOfLivingAdjacentCells(adjacentCells){
      let gen = this.#generation
      return adjacentCells.reduce((acc, cell) => {
       return cell.determineVitalStatus(gen) ? ++acc : acc }, 0 );
      }
  
   // a function with callbacks to the TableComponent to build the representation of the cell table within one loop only
   createTableAndConfig(rowHook, columnHook){
    let table = this.#buildTable() 
  
    table.forEach(subarray => {
      let row = rowHook()  
      subarray.forEach(cell => {
      let vitalStatus = cell.determineInitialVitalStatus()
      columnHook(row, vitalStatus)
    })})
  }

    // the looping function refreshes the table as long it was set to looping and the generation is smaller than 500 else we stop and hide the controls
    evolving(){
      if(this.#isLooping && this.#generation <= 500){
        this.#refreshTable()
        setTimeout(this.evolving.bind(this), 25)
      }
      else if (this.#generation > 500) {
        controls.hideControls()
      }
   }
}