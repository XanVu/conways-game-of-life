import navbar from "./NavigationComponent"
import organism from "./Organism"

let instance

class StatisticComponent {
  #formatter = new Intl.NumberFormat('de-De', {maximumSignificantDigits: 6}) 
  
  constructor(){
    if (instance)
      throw new Error("Singleton")
    
    instance = this 
  }

  loadStatisticTab(){     
    let tab = navbar.getStatisticTab() 
    let currentStats = organism.statisticHandler.getCurrentStatistics()  
    let statistics = this.#createNextStatisticsDiv(currentStats)
    this.#deletePreviousStatisticIfPresent(tab)
    tab.appendChild(statistics)
  }


  #createNextStatisticsDiv(currentStats){
    let textDiv = document.createElement('div')

    for(const property in currentStats){
        let formattedValue = this.#formatNumericalValues(currentStats[property])
        let p = document.createElement('p')
        p.textContent = `${property}: ${formattedValue}`
        textDiv.appendChild(p)
    }
    return textDiv
  }

  #formatNumericalValues(value){
    value == Number ? this.#formatter.format(value) : value
  }

  #deletePreviousStatisticIfPresent(tab){
    let container = tab.getElementsByTagName('div')

    if(container.length == 1){
       let oldStatistics = container.item(0)
       tab.removeChild(oldStatistics)
    }
  }

 #determineStatus(){
  let text = "Status: Organism is alive!"

    if(!organism.conditionValidator.getIsAlive()){
      this.hideButtons()
      text = "Status: Organism is dead!"
    }
   
    if(!organism.conditionValidator.getIsEvolving()){
      this.hideButtons()
      text = "Status: stable configuration!"
    }
   
    if(organism.conditionValidator.getIsRepeating()){
      this.hideButtons()
      text = "Status: stable repeating pattern!"
    }

  return text
  }
}

let statisticComponent = Object.freeze(new StatisticComponent())
export default statisticComponent