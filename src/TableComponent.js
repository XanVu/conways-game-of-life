import StyleManager from "./StyleManager.js";
import * as constants from './Constants';
import TableHandler from "./TableHandler.js";
import controls from "./ControlsComponent.js";

/*
A Singleton, which handles the representation of the
grid within the html.
It holds a tableHandler, which is the class that internally
handles the grid. So the component handles the communication
of other classes with the handler by providing functions.
*/
let instance
class TableComponent {
  #table
  #tableHandler

  constructor(){
    if (instance)
      throw new Error("Singleton")
    this.#table = document.querySelector('table')
    instance = this 
  }

  /* 
  Getter/Setter/Incremental methods will not be 
  explained as there trivial. It should be obvious 
  what they are used for.
  */

  // #region Getter/Setter/Incremental methods
  #getTable(){
    return this.#table
  }

  #getTableHandler(){
    return this.#tableHandler
  }

  #setTableHandler(handler){
    this.#tableHandler = handler
  }
  // #endregion

  /*
  Calls the internal tablehandler and starts the loop
  */ 
  #start(){
    let handler = this.#getTableHandler()
    handler.setIsLooping(true)
  }

  /*
  Calls the internal tablehandler and stops the loop
  */ 
  #stop(){
    let handler = this.#getTableHandler()
    handler.setIsLooping(false)
  }

  /*
  Stops the loop, gets the previous dimensions of the grid
  and reinitilize the grid with the same dimensions.
  */ 
  #deleteTableAndResetData(){ 
    this.#setLooping(false)
    let handler = this.#getTableHandler()
    let rows = handler.getRows()    
    let columns = handler.getColumns()
    this.#truncateTable()
    this.initTable(rows, columns)  
    }

  /*
  Gets the html table element and deletes every row in it.
  Preparing the grid to be resetted.
  */  
  #truncateTable(){
    let table = this.#getTable()
    Array.from(table.rows).forEach(row => row.remove())
    return table
  }
    
  /*
  Adds a row to the html table element
  */   
  #addRow(){
    let table = this.#getTable()
    let row = table.insertRow()
    return row
  }

  /*
  Adds a cell within a row to the html table element.
  and styles it according to it's current cell state.
  */
  #addCell(row, vitalStatus){
    let cell = row.insertCell()
    this.#createCellSpan(cell, vitalStatus)
  }

  /*
  Creates a span element, styles it as a circle and
  appends it to the cell element.
  Adds the fitting style to the span, according to the
  cell's state.
  */   
  #createCellSpan(cell, vitalStatus){
    let span = document.createElement("span")
    StyleManager.addCssClass(span, 'circle')             
    cell.appendChild(span)
    StyleManager.styleCell(span, vitalStatus)
  }

  /*
  Get a cell from the html table element by row and column
  and updates the value of the cell accordingly.
  */ 
  refreshCell(row, col, vitalStatus){
    var table = this.#getTable()
    let cell = table.rows.item(row).cells.item(col)
    let span = cell.firstChild
    StyleManager.styleCell(span, vitalStatus)
  }

  /*
  Initilizes the table array within the given dimensions
  and sets the handler, which creates the starting 
  configuration of the cells.
  */     
  initTable(rows, columns){
    let handler =  new TableHandler(rows, columns)
    this.#setTableHandler(handler)
    handler.createTableAndConfig(this.#addRow.bind(this), this.#addCell.bind(this))
  }

  /*
  An Event that triggers when the window changes in size
  - it stops the current loop
  - it deletes the hmtl table
  - it recalculates the dimensions
  - it reinitializes the grid
  */
  #resizeEvent(){
    window.addEventListener(constants.resize, () => {
    this.#stopEvolvingProcess()
    this.#truncateTable()
    let dim = this.calculateTableDimensions()
    this.initTable(dim.rows, dim.columns) 
    })
  }

  /*
  Calculates the possible dimensions of the grid by
  considering the containing div sizes and cell sizes.
  Additionally validates the dimensions.
  */
  calculateTableDimensions(){
    let tableContainer = document.getElementById('table-wrapper')
    let clientWidth = tableContainer.clientWidth
    let clientHeight = tableContainer.clientHeight
    let tablepaddingAndBorder = 16
    let tdSize = 13        
    let columns = Math.floor((clientWidth - tablepaddingAndBorder * 2 ) / tdSize)
    let rows = Math.floor((clientHeight - tablepaddingAndBorder * 2 - constants.tableOffset ) / tdSize)
    return this.#validateDimensions(columns, rows)
  }

  /*
  Validates the calculated dimension against set limitations.
  */
  #validateDimensions(col, row){
    let columns = this.#validateMaxDimensionValue(col)
    let rows = this.#validateMaxDimensionValue(row)
    columns = this.#validateMinDimensionValue(col)
    rows = this.#validateMinDimensionValue(row)

    return {rows: rows, columns: columns}
  }

  /*
  Validates the value by checking if its surpassed the limit.
  If so, it just returns the max value, else the value.
  */
  #validateMaxDimensionValue(value){
    return value > constants.maxDimension ? constants.maxDimension : value
  }

  /*
  Validates the value by checking if its surpassed the limit.
  If so, it just returns the min value, else the value.
  */
  #validateMinDimensionValue(value){
    return value < constants.minDimension ? constants.minDimension : value
  }

  /*
  Registers all needed events such as the controls and resizing.
  */
  registerEvents(){
    let start = controls.getStartButton()
    let stop = controls.getStopButton()
    let reset = controls.getResetButton()
    start.addEventListener(constants.click, this.#startEvolvingProcess.bind(this))
    stop.addEventListener(constants.click, this.#stopEvolvingProcess.bind(this)) 
    reset.addEventListener(constants.click, this.#resetEvolvingProcess.bind(this)) 
    this.#resizeEvent()
  }

  /*
  Controls the looping property of the internal table handler.
  It can be started or stopped.
  */
  #setLooping(bool){
    let table = this.#getTableHandler()
    table.setIsLooping(bool)
  }

  /*
  A function that the starts the loop condition and executes the
  looping function afterwards. Controls the controls buttons 
  accordingly.
  */
  #startEvolvingProcess(){
    let table = this.#getTableHandler()
    this.#start()
    table.evolving()
    controls.hideStartButton()
    controls.showStopButton()
  }
  
  /*
  A function that stops the current loop by changing the condition
  to false. Afterwards resets the presented control buttons.
  */
  #stopEvolvingProcess(){   
    this.#stop()
    controls.resetControls()
  }
  
  /*
  A function that deletes all cells, but keeps the dimensions of the grid.
  Afterwards reinitilize the grid and resets the presented control buttons.
  */
  #resetEvolvingProcess(){
    this.#deleteTableAndResetData()
    controls.resetControls()
  }
}

/*
This is the implementation of a singleton pattern
*/
let tableComp = Object.freeze(new TableComponent());
export default tableComp;