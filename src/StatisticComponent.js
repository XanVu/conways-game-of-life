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

    if(tab.hasChildNodes())
      tab.replaceChildren()

    let list = document.createElement('ul')

    for(const property in currentStats){
        let value = currentStats[property]

        if(currentStats[property] == Number){
            value = this.#formatter(currentStats[property])
        }
        this.#addListItem(list, `${property}: ${value}`)
    }
    tab.appendChild(list)
  }


  #addListItem(list, text){
    let item = document.createElement('li')    
    item.textContent = text
    list.appendChild(item)
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