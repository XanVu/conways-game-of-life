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

    let statusParagraph = this.#determineStatus()
    statistics.appendChild(statusParagraph)
    tab.appendChild(statistics)
  }


  #createNextStatisticsDiv(currentStats){
    let textDiv = document.createElement('div')

    for(const property in currentStats){
        let formattedValue = this.#formatter.format(currentStats[property])
        let p = document.createElement('p')
        p.textContent = `${property}: ${formattedValue}`
        textDiv.appendChild(p)
    }
    return textDiv
  }

  #deletePreviousStatisticIfPresent(tab){
    let container = tab.getElementsByTagName('div')

    if(container.length == 1){
       let oldStatistics = container.item(0)
       tab.removeChild(oldStatistics)
    }
  }

 #determineStatus(){
  let statusParagraph = document.createElement('p')
  let status = "Status: Organism is alive!"
 
   
    if(!organism.conditionValidator.getIsAlive()){
      status = "Status: Organism is dead!"
    }
   
    if(!organism.conditionValidator.getIsEvolving()){
      status = "Status: stable configuration!"
    }
   
    if(organism.conditionValidator.getIsRepeating()){
      status = "Status: stable repeating pattern!"
    }

    statusParagraph.textContent = status
  return statusParagraph
  }
}

let statisticComponent = Object.freeze(new StatisticComponent())
export default statisticComponent