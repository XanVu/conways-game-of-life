import StyleManager from "./StyleManager.js";
import statisticComponent from "./StatisticComponent.js";
import TableHandler from "./TableHandler.js";
import slider from "./SliderComponent.js";
import navbar from "./NavigationComponent.js";
import controls from "./ControlsComponent.js";

let instance
class TableComponent {
  interval = 0
  #table
  #tableHandler

  constructor(){
    if (instance)
      throw new Error("Singleton")
    instance = this 
    this.#table = document.querySelector("table")
  }

  #getTable(){
    return this.#table
  }

  #getTableHandler(){
    return this.#tableHandler
  }

  #setTableHandler(handler){
    this.#tableHandler = handler
  }

  setInterval(value){
    let table = this.#getTableHandler()
    table.setInterval(value)
  }

    deleteTableAndResetData(row, column){     
      let table = this.#getTable()
      Array.from(table.rows).forEach(row => row.remove())
      this.#setTableHandler(new TableHandler(row, column))
      this.initTable()  
    }
    
      #addRow(){
        let table = this.#getTable()
        let row = table.insertRow()
        return row
      }

      #addCell(row, vitalStatus){
        let cell = row.insertCell()
        this.#createCellSpan(cell, vitalStatus)
      }

      #createCellSpan(cell, vitalStatus){
        let span = document.createElement("span")
        StyleManager.addCssClass(span, 'circle')             
        cell.appendChild(span)
        StyleManager.styleCell(span, vitalStatus)
      }

      refreshCell(row, col, vitalStatus){
        var table = this.#getTable()
        let cell = table.rows.item(row).cells.item(col)
        let span = cell.firstChild
        StyleManager.styleCell(span, vitalStatus)
      }

      resetTable(r, c){
        this.stop()
        this.deleteTableAndResetData(r, c)
        statisticComponent.createStatPresentation()
      }

      initTable(){
        let dims = this.calculateTableDimensions()
        let table =  new TableHandler(dims.rows, dims.columns)
        this.#setTableHandler(table)
        table.createTableAndConfig(this.#addRow.bind(this), this.#addCell.bind(this))
        this.setInterval(slider.getCurrentSliderValue())
      }

      sentStatisticalData(){
        let table = this.#getTableHandler()
        return table.statisticHandler.sendCurrentStatisticsToComponent()
      } 

      sentConditionFlags(){
        let table = this.#getTableHandler()
        return table.conditionHandler.getConditionFlags()
      }

      resetLoopStatistic(){
        let table = this.#getTableHandler()
        table.statisticHandler.resetCurrentLivingCells()
      }

      evolving(){
        let table = this.#getTableHandler()
        table.conditionHandler.setStarted(true)
        table.evolving()
      }

      stop(){
        let table = this.#getTableHandler()
        table.conditionHandler.setStarted(false)
      }

      resizeEvent(){
        window.addEventListener('resize', () => {
        let dim = this.calculateTableDimensions()  
        this.resetTable(dim.rows, dim.columns)

        controls.hideStopButtonIfActive() 

        })
      }

      calculateTableDimensions(){
        let tableContainer = document.getElementById('table-wrapper')
        let tablepaddingAndBorder = 16
        let tdSize = 13
    
        let clientWidth = tableContainer.clientWidth
        let clientHeight = tableContainer.clientHeight
        
        let colOffset 
        let rowOffset

        if(clientWidth < clientHeight){
        colOffset = 30
        rowOffset = 25 + 50
        }
        else {
          colOffset = 150
          rowOffset = 25 + 50
        }

        let columns = Math.floor((clientWidth - tablepaddingAndBorder * 2 - colOffset) / tdSize)
        let rows = Math.floor((clientHeight - tablepaddingAndBorder * 2 - rowOffset) / tdSize)

        if(columns > 75)
          columns = 75

        if(rows > 75)
          rows = 75

        if(rows < 15)
          rows = 15

        if(columns < 15)
          columns = 15

        return {rows: rows, columns: columns }
      }
}

let tableComp = Object.freeze(new TableComponent());
export default tableComp;
