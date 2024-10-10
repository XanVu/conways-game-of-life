import Cell from "./Cell.js";
import tableComp from "./TableComponent.js";
import controls from "./ControlsComponent.js";
import * as constants from './Constants';

/*
This class handles the internal reprensentation of the grid
in form of an 2 dimensional Array.

- holds the value of the dimensions (rows, columns)
- keeps track of the generation number
- holds the 2D Array
- the looping condition, per default false
*/
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
  
  /* 
  Getter/Setter/Incremental methods will not be 
  explained as there trivial. It should be obvious 
  what they are used for.
  */

// #region Getter/Setter/Increments

    getTable(){
      return this.#table
    }

    getRows(){
      return this.#rows
    }

    getColumns(){
      return this.#columns
    }

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
    
  #incrementGeneration(){
    ++this.#generation
  }

  //#endregion

  
  /*
  This function builds the 2 dimensional array that 
  will hold all the cells, sets the internal table variable
  and initilised the cells in side the grid as all dead.
  */ 
  #buildTable(){
    let rowDepth = this.getRows()
    let columnDepth = this.getColumns()
    let table =  Array.from(Array(rowDepth), () => Array.from(Array(columnDepth), () => new Cell(false)))
    this.setTable(table) 
    return table
  }

  /*
  A function which handles all actions needed within a discrete
  time frame. Loops through the whole grid and executes following
  steps for every cell in the grid.
  - searches all adjacent cells of the selected cell
  - counts the living cells from that adjacent cells
  - calculates the next cell state according to the rules
  - invokes a call back to the html table through the
    TableComponent and updates the cells css
  - finally after all actions for each cell in the grid are completed
    we increase the generation number as every cell has evolved into
    the next generation
  */
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

  /*
  A function that evalutes the next cell status depending
  on the current status of the cell and enforces the game
  rules. Afterwards let the cell handle their internal states
  and returns the new state.
  */
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

  /*
  A function that calculates the adjacent cells of a given cell.
  Valid indices are garantueed by using the modulo operator.
  After executing the cartesian product we only need to filter out
  the position of our given cell to end up with only the neighbour
  cells.
  */
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

  /*
  By calcuteding mod of our current index and the size of the array.
  we ensure that we get a valid index number back.
  */ 
  #calculateValidIndex(index, size){
    return this.#mod(index, size)
  }
  
  /*
  A function that calculates modulo for two given numbers.
  */
  #mod(a,b){
    return a - (Math.floor(a / b) * b)
  }

  /*
  Returns back a cell from the 2D array by using coordinates.
  */
  #getCellbyCoordinate(row, col){
    let table = this.getTable()
    return table[row][col]
  }


  /*
  A function that utilizes an accumolator to count living cells.
  By providing the generation number as an way to compare we ensure 
  that only cached cell states or untouched cell values are foundation
  for the calculation. Already updated cells would distort the result.
  */ 
  #calculateNumberOfLivingAdjacentCells(adjacentCells){
  let gen = this.#generation
  return adjacentCells.reduce((acc, cell) => {
    return cell.determineVitalStatus(gen) ? ++acc : acc }, 0);
  }
  
  /*
  While traversing the 2 dim array it creates the html rows and
  cell by calling back to the tableComponent. It provides 2 placeholder
  hooks, that will be use for the fitting function in the table component
  class. Additionally, it initilizes all cells in the grid.
  */
  createTableAndConfig(rowHook, columnHook){
  let table = this.#buildTable() 
  
  table.forEach(subarray => {
      let row = rowHook()  
      subarray.forEach(cell => {
      let vitalStatus = cell.determineInitialVitalStatus()
      columnHook(row, vitalStatus)
    })})
  }

  /*
  The looping function, basically an recursive endless loop, which can 
  only be stopped by certain condition to be true.
  - someone stops the loop manually
  - the generation number is greater than the max value
  While looping we repeat all actions needed for a cell and do 
  that to each cell in the grid. Afterwards recursively calling the function
  again till we come to an end. 
  */
  evolving(){
    if(this.#isLooping && this.#generation <= constants.maxGeneration){
      this.#refreshTable()
      setTimeout(this.evolving.bind(this), constants.timeStep)
    }
    else if (this.#generation > constants.maxGeneration)
      controls.hideControls() 
   }
}