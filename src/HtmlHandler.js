import Test from "./main";
import Organism from "./organism";

export default class HtmlHandler {

  static registerTabs(){
        let StatsTab = document.getElementById("StatsTab")
        let RulesTab = document.getElementById("RulesTab")
        let DefinitionTab = document.getElementById("DefinitionTab")

        let stats = document.getElementById("Stats")
        let rules = document.getElementById("Rules")
        let definition = document.getElementById("Definition")    
       
        this.#addOnCLickEventListener(StatsTab, stats)
        this.#addOnCLickEventListener(RulesTab, rules)
        this.#addOnCLickEventListener(DefinitionTab, definition)

    }

    static #addOnCLickEventListener(tab, element){
        tab.addEventListener("click", function(){
            if(element.style.display === "none"){
                element.style.display = "block" 
            }
            else
            element.style.display = "none"
        })
    }
    
   static registerControls(){
        let startButton = document.getElementById("Start")
        let stopButton = document.getElementById("Stop") 
        let resetButton = document.getElementById("Reset")
    

        startButton.addEventListener("click", function(){
            Organism.setHasStarted(true)
            Test.test()
        }, false)
    
        stopButton.addEventListener("click", function(){
            Organism.setStopped(true) 
        }, false)

        resetButton.addEventListener("click", function(){
            location.reload()
        })
    
    }

    static initHtmlTable(array, size) {
        let table = document.querySelector("table");
    
        for(var row = 0; row < size; row++){
            let r = table.insertRow()
         
            for(var col = 0; col < size; col++){
                let cell = array[row][col]
                let c = r.insertCell()
                let span = document.createElement("span")             
                c.appendChild(span)
                this.#setColorOfSpan(span, cell)
           }
        }
    
        this.setHtmlStatValues()
    }
    
      static updateHtmlSpanInTable(array){
        for(var row = 0; row < array.length; row++){
          for(var col = 0; col < array.length; col++){
            let cell = array[row][col]
    
            let table = document.querySelector("table")
            let td = table.rows[row].cells[col]
            let span = td.childNodes[0]
    
            this.#setColorOfSpan(span, cell)
          }
        }
      }
    
      static #setColorOfSpan(span, cell){
        if(cell.getIsAlive()){ 
            span.classList.remove(...span.classList)
            span.classList.add("greenCircle")
          }
          else{
            span.classList.remove(...span.classList)
            span.classList.add("blackCircle")
          }
    }
    
    static setHtmlStatValues(){

        let underpopulation = document.getElementById("underpopulation")
        let overpopulation = document.getElementById("overpopulation")
        let repoduction = document.getElementById("reproduction")
        let currentLiving = document.getElementById("currentLivingCells")
        let currentDead = document.getElementById("currentDeadCells")
        let iteration = document.getElementById("iteration")

        this.#addingStats(underpopulation, "Cell died of Underpopulation: " + Organism.getFatalitiesOfUnderpopulation()) 
        this.#addingStats(overpopulation, "Cell died of Overpopulation: " + Organism.getFatalitiesOfOverpopulation()) 
        this.#addingStats(repoduction, "Cells reproduced: " +  Organism.getReproducedCells())
        this.#addingStats(currentLiving, "Current Living Cells: " + Organism.getLivingCellPerIteration()) 
        this.#addingStats(currentDead, "Current Dead Cells: " + Organism.getDeadCellPerIteration())   
        this.#addingStats(iteration, "Cell Iteration: " + Organism.getIteration())
    }

    static #addingStats(element, text){
        element.textContent = text
    }

    static setReasonOfDeath(){
      let causeOfDeath = document.getElementById("status")

      let text = "Status: alive"

      if(!Organism.getIsAlive())
        text = "Status: died"
      
      if(Organism.getIsStable())
        text = "Status: reached stable configuration"

      if(Organism.getIsRepeating()){
        text = "Status: reached stable repeating pattern after repeating " + Organism.getRepetitionCounter() + " times"
      }

      causeOfDeath.textContent = text
    }
}
