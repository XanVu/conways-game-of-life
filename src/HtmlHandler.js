import Test from "./main";
import StatisticHandler from "./StatisticHandler.js";
import SphereOfLife from "./organism";
import LoopConditionHandler from "./LoopConditionHandler.js";

export default class HtmlHandler {
  static #formatter = new Intl.NumberFormat('de-De', {maximumSignificantDigits: 6}) 

  static registerTabs(){
        let tabContainer = document.getElementById("tabContainer")

        let buttonTabs = tabContainer.children

        let tabContentContainer = document.getElementById("tabContentContainer")

        let contentTabs = tabContentContainer.children

        for(var i = 0; i < contentTabs.length; ++i){
        let tab = contentTabs[i]    
        buttonTabs[i].addEventListener("click", function(){
          
            if(!tab.classList.contains('invisible'))
               tab.classList.add('invisible')
            else {
            let otherTabs = Array.prototype.filter.call(contentTabs, function(t) {
              return t != tab 
            })
            otherTabs.map(x => x.classList.add('invisible'))    
            tab.classList.remove('invisible')    
            }         
          })
        }
    }
    
   static registerControls(){
        let startButton = document.getElementById("Start")
        let stopButton = document.getElementById("Stop") 
        let resetButton = document.getElementById("Reset")
    

        startButton.addEventListener("click", function(){
            LoopConditionHandler.setHasStarted(true)
            Test.recursiveLoop()
            LoopConditionHandler.setStopped(false)
        }, false)
    
        stopButton.addEventListener("click", function(){
          LoopConditionHandler.setStopped(true) 
        }, false)

        resetButton.addEventListener("click", function(){
            location.reload()
        })
    
    }

    static initHtmlTable() {
        let array = SphereOfLife.getTable()
        let table = document.querySelector("table");
    
        for(var row = 0; row < array.length; row++){
          let x = array[row]
            let r = table.insertRow()
            for(var col = 0; col < x.length; col++){
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
          let x = array[row]
          for(var col = 0; col < x.length; col++){
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
            span.classList.add("livingCircle")
          }
          else{
            span.classList.remove(...span.classList)
            span.classList.add("deadCircle")
          }
    }
    
    static setHtmlStatValues(){

        let underpopulation = document.getElementById("underpopulation")
        let overpopulation = document.getElementById("overpopulation")
        let repoduction = document.getElementById("reproduction")
        let currentLiving = document.getElementById("currentLivingCells")
        let currentDead = document.getElementById("currentDeadCells")
        let iteration = document.getElementById("iteration")
        let status = document.getElementById("status")
        
        
        
        this.#addingStats(status, this.#determineStatus())
        this.#addingStats(iteration, this.#formatter.format(StatisticHandler.getIteration()) + " generation")
        this.#addingStats(underpopulation, this.#formatter.format(StatisticHandler.getFatalitiesOfUnderpopulation()) + " cells died by virtue of underpolulation!") 
        this.#addingStats(overpopulation, this.#formatter.format(StatisticHandler.getFatalitiesOfOverpopulation()) + " cells died by virtue of overpolulation!") 
        this.#addingStats(repoduction, this.#formatter.format(StatisticHandler.getReproducedCells()) + " cells came alive by virtue of reproduction!")
        this.#addingStats(currentLiving, this.#formatter.format(StatisticHandler.getLivingCellPerIteration()) + " cells are currently alive!") 
        this.#addingStats(currentDead, this.#formatter.format(StatisticHandler.getDeadCellPerIteration()) + " cells are currently dead!")   
        
        


    }

    static #addingStats(element, text){
        element.textContent = text
    }

    static #determineStatus(){
      let text = "Status: Organism is alive!"

      if(!LoopConditionHandler.getIsAlive())
        text = "Status: Organism is dead!"
      
      if(!LoopConditionHandler.getIsEvolving())
        text = "Status: stable configuration!"

      if(LoopConditionHandler.getIsRepeating()){
        text = "Status: stable repeating pattern!"
      }
      return text
    }
}
