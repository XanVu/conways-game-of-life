import StyleManager from "./StyleManager.js";
import statisticComponent from "./StatisticComponent.js";
import TableHandler from "./TableHandler.js";
import slider from "./SliderComponent.js";

let instance
class TableComponent {
  interval = 0
  #table
  #tableHandler

  constructor(){
    if (instance)
      throw new Error("Singleton")
    this.#tableHandler = new TableHandler()
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

    deleteTableAndResetData(){
      let table = this.#getTable()
      Array.from(table.rows).forEach(row => row.remove())
      this.#setTableHandler(new TableHandler())
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
        cell.appendChild(span)
        StyleManager.styleCell(span, vitalStatus)
      }

      refreshCell(row, col, vitalStatus){
        var table = this.#getTable()
        let cell = table.rows.item(row).cells.item(col)
        let span = cell.firstChild
        StyleManager.styleCell(span, vitalStatus)
      }

      resetTable(){
        this.stop()
        this.deleteTableAndResetData()
        statisticComponent.createStatPresentation()
      }

      initTable(){
        let table = this.#getTableHandler()
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
}

let tableComp = Object.freeze(new TableComponent());
export default tableComp;
