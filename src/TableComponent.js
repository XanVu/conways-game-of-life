import StyleManager from "./StyleManager.js";
import organism from "./TableHandler.js";

let instance
class TableComponent {
  interval = 0
  #table

  constructor(){
    if (instance)
      throw new Error("Singleton")
    
    instance = this
    this.#table = document.querySelector("table")
   }

  #getTable(){
    return this.#table
  }

    deleteTableAndResetData(){
      let table = this.#getTable()
      Array.from(table.rows).forEach(row => row.remove())
      organism.resetOrganism(this.addRow.bind(this), this.addCell.bind(this))
    }
    
      addRow(){
        let table = this.#getTable()
        let row = table.insertRow()
        return row
      }

      addCell(row, vitalStatus){
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
}

let tableComp = Object.freeze(new TableComponent());
export default tableComp;
