import StyleManager from "./StyleManager.js";
import * as constants from './Constants';
import tabs from "./TabComponent.js";
import tableComp from "./TableComponent.js";

let instance
class ControlsComponent {    
    #startButton
    #stopButton
    #refreshButton

  constructor(){
    if (instance)
      throw new Error("Singleton")  
    instance = this
  }

  #getStartButton(){
    return this.#startButton
  }

  #getStopButton(){
    return this.#stopButton
  }

  #getRefreshButton(){
    return this.#refreshButton
  }

  #createButton(iconShape, isHidden = false){
    let parentNode = document.getElementById('controls-wrapper')  
    let button = document.createElement('button') 
    
    let controllCssClass = 'controls'
    button.classList.add(controllCssClass)
    
    if(isHidden)
      StyleManager.hideElement(button)
    
    let icon = document.createElement('i')
    icon.classList.add(...constants.iconAssets, iconShape)

    button.appendChild(icon)
    parentNode.appendChild(button)
    return button
  } 

  loadingControls(){
    let isHidden = true
    let startButton = this.#createButton(constants.playIcon)
    let stopButton =  this.#createButton(constants.stopIcon, isHidden)
    let resetButton = this.#createButton(constants.resetIcon)
    
    this.#startButton = startButton
    this.#stopButton = stopButton
    this.#refreshButton = resetButton

    startButton.addEventListener(constants.click, this.#startEvolvingProcess.bind(this))
    stopButton.addEventListener(constants.click, this.#stopEvolvingProcess.bind(this))
    resetButton.addEventListener(constants.click, this.#resetEvolvingProcess.bind(this))
  }

  toggleStartStop(){
    let start = this.#getStartButton()
    let stop = this.#getStopButton()

    if(StyleManager.isHidden(start)){
      StyleManager.hideElement(stop)
      StyleManager.showElement(start)
    }
    else{
      StyleManager.hideElement(start)
      StyleManager.showElement(stop)
    }
  }

  hideStartAndStop(){
    let start = this.#getStartButton()
    let stop = this.#getStopButton()
    StyleManager.hideElement(start)
    StyleManager.hideElement(stop)
  }

  hideStopButtonIfActive(){
    let start = this.#getStartButton()
    let stop = this.#getStopButton()
    if(!stop.classList.contains('isHidden')){
      StyleManager.hideElement(stop)
      start.classList.remove('isHidden')
    }
  }

 
  #startEvolvingProcess(){
    let conditionFlags = tableComp.sentConditionFlags()

    if(conditionFlags.isAlive && conditionFlags.isEvolving && !conditionFlags.isRepeatingPattern){
      tableComp.evolving()
         this.toggleStartStop()
    }
  }

  #stopEvolvingProcess(){   
        tableComp.stop()
        this.toggleStartStop()
  }

  #resetEvolvingProcess(){
        tableComp.stop()
        tableComp.resetTable(10, 10)
        let start = this.#getStartButton()
        if(StyleManager.isHidden(start))
          this.toggleStartStop()

        tabs.refreshStatisticTab()
  }
}

let controls = Object.freeze(new ControlsComponent())
export default controls
 