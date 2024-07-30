import StyleManager from "./StyleManager.js";
import * as constants from './Constants';
import TableHandler from "./TableHandler.js";
import controls from "./ControlsComponent.js";
import tabs from "./TabComponent.js";

let instance
class TableComponent {
  #tableWrapper
  #statusWrapper
  #table
  #tableHandler

  #stableIcon
  #aliveIcon
  #deadIcon
  #repetitionIcon


  constructor(){
    if (instance)
      throw new Error("Singleton")
    this.#tableWrapper = document.getElementById('table-wrapper')
    this.#statusWrapper = document.getElementById('status-wrapper')
    this.#table = document.querySelector('table')
    instance = this 
  }

  #getStatusWrapper(){
    return this.#statusWrapper
  }

  #getTable(){
    return this.#table
  }

  #getTableHandler(){
    return this.#tableHandler
  }

  #getAliveIcon(){
    return this.#aliveIcon
  }

  #getDeadIcon(){
    return this.#deadIcon
  }

  #getStableIcon(){
    return this.#stableIcon
  }

  #getRepetitionIcon(){
    return this.#repetitionIcon
  }


  #setTableHandler(handler){
    this.#tableHandler = handler
  }

  #setAliveIcon(icon){
    this.#aliveIcon = icon
  }

  #setDeadIcon(icon){
    this.#deadIcon = icon
  }

  #setStableIcon(icon){
    this.#stableIcon = icon
  }

  #setRepetitionIcon(icon){
    this.#repetitionIcon = icon
  }


    #deleteTableAndResetData(){ 
      this.#setStarted(false)
      let handler = this.#getTableHandler()
      let rows = handler.getRowDepth()    
      let columns = handler.getColumnDepth()
      this.#truncateTable()
      this.initTable(rows, columns)  
    }

      #truncateTable(){
        let table = this.#getTable()
        Array.from(table.rows).forEach(row => row.remove())
        return table
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

      initTable(rows, columns){
        let table =  new TableHandler(rows, columns)
        let statisticHandler = table.getStatisticHandler()
        this.#setTableHandler(table)
        table.createTableAndConfig(this.#addRow.bind(this), this.#addCell.bind(this))
        let data = statisticHandler.getCurrentStatistics()
        this.refreshStatisticTab(data)
      }

      resizeEvent(){
        window.addEventListener('resize', () => {
        this.#stopEvolvingProcess()
        this.#truncateTable()
        let dim = this.calculateTableDimensions()
        this.initTable(dim.rows, dim.columns) 
        this.#resetStatus()
        })
      }

      calculateTableDimensions(){
        let tableContainer = document.getElementById('table-wrapper')
        let tablepaddingAndBorder = 16
        let tdSize = 13
    
        let clientWidth = tableContainer.clientWidth
        let clientHeight = tableContainer.clientHeight
        
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
      }

      #setStarted(bool){
        let table = this.#getTableHandler()
        let conditionHandler = table.getConditionHandler()
        conditionHandler.setStarted(bool)
      }

      #startEvolvingProcess(){
        this.#setStarted(true)
        let table = this.#getTableHandler()
        table.evolving()
        controls.hideStartButton()
        controls.showStopButton()
      }
  
      #stopEvolvingProcess(){   
        this.#setStarted(false)
        controls.resetControls()
      }
  
      #resetEvolvingProcess(){
        this.#deleteTableAndResetData()
        this.#resetStatus()
        controls.resetControls()
    }

    refreshStatisticTab(data){
      tabs.refreshStatisticTab(data)
    }


    buildStatusContainer(){
      let statusContainer = this.#getStatusWrapper()
      let p = document.createElement('p')
      p.textContent = 'Status '
      statusContainer.appendChild(p)  

      let aliveIcon = this.#buildIcon(constants.aliveIcon, constants.aliveColor)
      let deadIcon = this.#buildIcon(constants.deadIcon, constants.deadColor)
      let stableIcon = this.#buildIcon(constants.stableIcon, constants.stableColor)
      let repetitionIcon = this.#buildIcon(constants.repetitionIcon, constants.repetitionColor)
      
      this.#setAliveIcon(aliveIcon)
      this.#setDeadIcon(deadIcon)
      this.#setStableIcon(stableIcon)
      this.#setRepetitionIcon(repetitionIcon)

      StyleManager.hideElments([deadIcon, stableIcon, repetitionIcon])
      
      statusContainer.appendChild(aliveIcon)
      statusContainer.appendChild(deadIcon)
      statusContainer.appendChild(stableIcon)
      statusContainer.appendChild(repetitionIcon)
    }


    #buildIcon(type, color){
    let span = document.createElement('span')  
    let icon = document.createElement('i')
    icon.style.color = color
    icon.classList.add(...constants.iconAssets, type)
    span.appendChild(icon)  
    return span
   }

   resetControlsAndUpdateStatus(icon, icons){
       controls.hideStopButton()     
        StyleManager.showElement(icon)
        StyleManager.hideElments(icons)
   }

   #resetStatus(){
    let aliveIcon = this.#getAliveIcon()
    let deadIcon = this.#getDeadIcon()
    let stableIcon = this.#getStableIcon()
    let repetitionIcon = this.#getRepetitionIcon()
    this.resetControlsAndUpdateStatus(aliveIcon, [deadIcon, stableIcon, repetitionIcon])
   }

    determineStatus(){
      let table = this.#getTableHandler()
      let conditionHandler = table.getConditionHandler()
      let conditionFlags = conditionHandler.getConditionFlags()

      let aliveIcon = this.#getAliveIcon()
      let deadIcon = this.#getDeadIcon()
      let stableIcon = this.#getStableIcon()
      let repetitionIcon = this.#getRepetitionIcon()

        if(!conditionFlags.isAlive){
         this.resetControlsAndUpdateStatus(deadIcon, [aliveIcon, stableIcon, repetitionIcon])
        }
       
        if(!conditionFlags.isEvolving){
          this.resetControlsAndUpdateStatus(stableIcon, [aliveIcon, deadIcon, repetitionIcon])
        }
       
        if(conditionFlags.isRepeatingPattern){
          this.resetControlsAndUpdateStatus(repetitionIcon, [aliveIcon, deadIcon, stableIcon])
        }
      }
}

let tableComp = Object.freeze(new TableComponent());
export default tableComp;

