import navbar from "./NavigationComponent"
import controls from './ControlsComponent';
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
    
    let statusParagraph = this.#determineStatus()
    let statistics = this.#createNextStatisticsDiv(currentStats)
    
     statistics.insertBefore(statusParagraph, statistics.firstChild)
    
    this.#deletePreviousStatisticIfPresent(tab)
    tab.appendChild(statistics)
  }


  #createNextStatisticsDiv(currentStats){
    let textDiv = document.createElement('div')

    let textArray = ['currerent Generation', 'cells are living in the current Generation.', 'cells are dead in the current Generation.' , 'cells died by virtue of overpolulation.', 'cells died by virtue of underpopulation.', 'cells came alive by virtue of reproduction.']

    for(const [index, [_, value]] of Object.entries(Object.entries(currentStats))){
        let formattedValue = this.#formatter.format(value)
        let p = document.createElement('p')
        p.innerHTML = `${formattedValue} <br/> ${textArray[index]}`
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
      
      let b = controls.getStartButton()
      let b1 = controls.getStopButton()

      b.classList.add('isHidden')
      b1.classList.add('isHidden')
      
      status = "Status: Organism is dead!"
    }
   
    if(!organism.conditionValidator.getIsEvolving()){

      let b = controls.getStartButton()
      let b1 = controls.getStopButton()

      b.classList.add('isHidden')
      b1.classList.add('isHidden')

      status = "Status: stable configuration!"
    }
   
    if(organism.conditionValidator.getIsRepeating()){
      
      let b = controls.getStartButton()
      let b1 = controls.getStopButton()

      b.classList.add('isHidden')
      b1.classList.add('isHidden')
      
      status = "Status: stable repeating pattern!"
    }

    statusParagraph.textContent = status
  return statusParagraph
  }
}

let statisticComponent = Object.freeze(new StatisticComponent())
export default statisticComponent