import organism from "./Organism.js";

let instance
class TableComponent {
  interval = 0
  organism
  #table

  constructor(){
    if (instance)
      throw new Error("Singleton")
    
    instance = this 
    
    this.organism = organism
    this.#table = document.querySelector("table")
   }

  getTable(){
    return this.#table
  }


    deleteTableAndResetData(){
      organism.resetOrganism()
      let table = this.getTable()
      Array.from(table.rows).forEach(row => row.remove())

      this.initializeTable()

    }


    initializeTable(){
        let internalTable = organism.getTable()
        let table = this.getTable()
        
        internalTable.forEach( subArray => {
          let r = table.insertRow()
          subArray.forEach(cell => {
            let c = r.insertCell()
            let span = document.createElement("span")             
            c.appendChild(span)
            this.#applyCssClassToSpan(span, cell)
          })
        })
    }
    
      updateHtmlSpanInTable(){
        let internalTable = organism.getTable()
        let table = this.getTable()
        internalTable.forEach((subArray, row) => subArray.forEach((cell, col) => {
          let representationTableCell = table.rows[row].cells[col]
          let span = representationTableCell.firstChild
          this.#applyCssClassToSpan(span, cell)
        }))
      }
    
      #applyCssClassToSpan(span, cell){
        if(cell.getIsAlive()){ 
            span.classList.remove('deadCircle')
            span.classList.add('livingCircle')
          }
          else{
            span.classList.remove('livingCircle')
            span.classList.add('deadCircle')
          }
    }
}

let table = Object.freeze(new TableComponent());
export default table;
