import controls from './ControlsComponent';
import organism from "./TableHandler"
import tabs from "./TabComponent";

let instance

class StatisticComponent {
  #formatter = new Intl.NumberFormat('de-De', {maximumSignificantDigits: 6}) 
  
  constructor(){
    if (instance)
      throw new Error("Singleton")
    
    instance = this 
  }

  createStatPresentation(){     
    let currentStats = organism.statisticHandler.sendCurrentStatisticsToComponent()  
    let statistics = this.#createNextStatisticsText(currentStats)
    organism.statisticHandler.resetCurrentLivingCells()
    return statistics
  }

  #createNextStatisticsText(currentStats){
    let textArray = ['Generation:', 'Overall living Cells:' , 'Death by Overpolulation:', 'Death by Underpopulation:', 'Resurrection by Reproduction:']
    let stats = document.createElement('p')
    stats.style.textAlign = 'center'
    let status = this.#determineStatus()
    stats.appendChild(status)
    stats.appendChild(document.createElement('br'))

    for(const [index, [_, value]] of Object.entries(Object.entries(currentStats))){
        let text = document.createTextNode(textArray[index])
        let formattedValue = document.createTextNode(this.#formatter.format(value))
        stats.appendChild(document.createElement('br'))
        stats.appendChild(text)
        stats.appendChild(document.createElement('br'))
        stats.appendChild(formattedValue)
        stats.appendChild(document.createElement('br'))
    }
    return stats
  }

 #determineStatus(){
  let status = "Status: Organism is alive!"

    if(!organism.conditionHandler.getIsAlive()){
      controls.hideStartAndStop()      
      status = "Status: Organism is dead!"
    }
   
    if(!organism.conditionHandler.getIsEvolving()){
      controls.hideStartAndStop()
      status = "Status: Stable configuration!"
    }
   
    if(organism.conditionHandler.getIsRepeatingPattern()){
      controls.hideStartAndStop()
      status = "Status: Stable repeating pattern!"
    }

    return document.createTextNode(status)
  }
}

let statisticComponent = Object.freeze(new StatisticComponent())
export default statisticComponent