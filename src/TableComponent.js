import StyleManager from "./StyleManager.js";
import * as constants from './Constants';
import TableHandler from "./TableHandler.js";
import controls from "./ControlsComponent.js";

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

  // #region Getter

  #getTable(){
    return this.#table
  }

  #getTableHandler(){
    return this.#tableHandler
  }

  // #endregion 

  // #region Setter

  #setTableHandler(handler){
    this.#tableHandler = handler
  }

  // #endregion

  // triggers the loop function to start
  #start(){
    let handler = this.#getTableHandler()
    handler.setIsLooping(true)
  }

  // brings the loop function to an halt
  #stop(){
    let handler = this.#getTableHandler()
    handler.setIsLooping(false)
  }

  // resets the table and reinitilized it with the same dimensions (rows and columns)
  #deleteTableAndResetData(){ 
    this.#setStarted(false)
    let handler = this.#getTableHandler()
    let rows = handler.getRows()    
    let columns = handler.getColumns()
    this.#truncateTable()
    this.initTable(rows, columns)  
    }

    // deletes the representation table
    #truncateTable(){
        let table = this.#getTable()
        Array.from(table.rows).forEach(row => row.remove())
        return table
      }
    
    // addes a row within an html table tag   
      #addRow(){
        let table = this.#getTable()
        let row = table.insertRow()
        return row
      }

    // addes a cell into the row and adds a span to it to represent the dead or living cell
      #addCell(row, vitalStatus){
        let cell = row.insertCell()
        this.#createCellSpan(cell, vitalStatus)
      }

    // creates a span element, sets the the circle css class  
      #createCellSpan(cell, vitalStatus){
        let span = document.createElement("span")
        StyleManager.addCssClass(span, 'circle')             
        cell.appendChild(span)
        StyleManager.styleCell(span, vitalStatus)
      }

    // gets a cell by its position (row, column) and sets updates its status 
      refreshCell(row, col, vitalStatus){
        var table = this.#getTable()
        let cell = table.rows.item(row).cells.item(col)
        let span = cell.firstChild
        StyleManager.styleCell(span, vitalStatus)
      }

    // initilizes the table array within the given dimensions, sets the handler and creates the starting configuration of the cells    
      initTable(rows, columns){
        let handler =  new TableHandler(rows, columns)
        this.#setTableHandler(handler)
        handler.createTableAndConfig(this.#addRow.bind(this), this.#addCell.bind(this))
      }


      #resizeEvent(){
        window.addEventListener('resize', () => {
        this.#stopEvolvingProcess()
        this.#truncateTable()
        let dim = this.calculateTableDimensions()
        this.initTable(dim.rows, dim.columns) 
        })
      }

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

      #validateDimensions(col, row){
        let columns = this.#validateMaxDimensionValue(col)
        let rows = this.#validateMaxDimensionValue(row)
        columns = this.#validateMinDimensionValue(col)
        rows = this.#validateMinDimensionValue(row)

        return {rows: rows, columns: columns}
      }

      #validateMaxDimensionValue(value){
       return value > constants.maxDimension ? constants.maxDimension : value
      }

      #validateMinDimensionValue(value){
        return value < constants.minDimension ? constants.minDimension : value
      }

      registerEvents(){
       let start = controls.getStartButton()
       let stop = controls.getStopButton()
       let reset = controls.getResetButton()
       start.addEventListener(constants.click, this.#startEvolvingProcess.bind(this))
       stop.addEventListener(constants.click, this.#stopEvolvingProcess.bind(this)) 
       reset.addEventListener(constants.click, this.#resetEvolvingProcess.bind(this)) 
       this.#resizeEvent()
      }

      #setStarted(bool){
        let table = this.#getTableHandler()
        table.setIsLooping(bool)
      }

      #startEvolvingProcess(){
        let table = this.#getTableHandler()
        this.#start()
        table.evolving()
        controls.hideStartButton()
        controls.showStopButton()
      }
  
      #stopEvolvingProcess(){   
        this.#stop()
        controls.resetControls()
      }
  
      #resetEvolvingProcess(){
        this.#deleteTableAndResetData()
        controls.resetControls()
    }

   hideControls(){
    controls.hideControls()
   }

   resetControlsAndUpdateStatus(icon, icons){
       controls.hideStopButton()     
        StyleManager.showElement(icon)
        StyleManager.hideElments(icons)
   }
}

let tableComp = Object.freeze(new TableComponent());
export default tableComp;

