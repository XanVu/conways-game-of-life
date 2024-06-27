import controls from './ControlsComponent';
import tableComp from './TableComponent';

let instance

class StatisticComponent {
  #formatter = new Intl.NumberFormat('de-De', {maximumSignificantDigits: 6}) 
  
  constructor(){
    if (instance)
      throw new Error("Singleton")
    
    instance = this 
  }

  createStatPresentation(){     
    let currentStats = tableComp.sentStatisticalData()  
    let statistics = this.#createNextStatisticsText(currentStats)
    tableComp.resetLoopStatistic()
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

  let conditionFlags = tableComp.sentConditionFlags()


    if(!conditionFlags.isAlive){
      controls.hideStartAndStop()      
      status = "Status: Organism is dead!"
    }
   
    if(!conditionFlags.isEvolving){
      controls.hideStartAndStop()
      status = "Status: Stable configuration!"
    }
   
    if(conditionFlags.isRepeatingPattern){
      controls.hideStartAndStop()
      status = "Status: Stable repeating pattern!"
    }

    return document.createTextNode(status)
  }
}

let statisticComponent = Object.freeze(new StatisticComponent())
export default statisticComponent