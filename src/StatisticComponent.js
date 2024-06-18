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

    organism.statisticHandler.resetStatsPerIteration()
  }


  #createNextStatisticsDiv(currentStats){
    let dl = document.createElement('dl')

    let textArray = ['Generation:', 'living Cells:', 'dead Cells:' , 'Death by Overpolulation:', 'Death by Underpopulation:', 'Resurrection by Reproduction']

    for(const [index, [_, value]] of Object.entries(Object.entries(currentStats))){
        let formattedValue = this.#formatter.format(value)
        let dt = document.createElement('dt')
        let dd = document.createElement('dd')
        dt.textContent = textArray[index]
        dd.textContent = formattedValue
        dt.appendChild(dd)
        dl.appendChild(dt)
    }
    return dl
  }

  #deletePreviousStatisticIfPresent(tab){
    let container = tab.getElementsByTagName('dl')

    if(container.length == 1){
       let oldStatistics = container.item(0)
       tab.removeChild(oldStatistics)
    }
  }

 #determineStatus(){
  let dt = document.createElement('dt')
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

      status = "Status: Stable configuration!"
    }
   
    if(organism.conditionValidator.getIsRepeating()){
      
      let b = controls.getStartButton()
      let b1 = controls.getStopButton()

      b.classList.add('isHidden')
      b1.classList.add('isHidden')
      
      status = "Status: Stable repeating pattern!"
    }

    dt.textContent = status
  return dt
  }
}

let statisticComponent = Object.freeze(new StatisticComponent())
export default statisticComponent