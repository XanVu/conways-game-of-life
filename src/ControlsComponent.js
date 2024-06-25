import organism from "./TableHandler.js"
import { recursiveLoop } from  "./TableHandler.js";
import TableExtentions from "./TableExtensions.js";
import StyleManager from "./StyleManager.js";
import * as constants from './Constants';
import tabs from "./TabComponent.js";

let instance
class ControlsComponent {    
    #startButton
    #stopButton

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

  #createButton(iconShape, isHidden = false){
    let parentNode = document.getElementById('controlsContainer')  
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
    let settingButton = this.#createButton(constants.settingIcon)
    
    this.#startButton = startButton
    this.#stopButton = stopButton

    startButton.addEventListener(constants.click, this.#startEvolvingProcess.bind(this))
    stopButton.addEventListener(constants.click, this.#stopEvolvingProcess.bind(this))
    resetButton.addEventListener(constants.click, this.#resetEvolvingProcess.bind(this))
    settingButton.addEventListener(constants.click, this.#toggleSettingsTab)
  }

  #toggleSettingsTab(){
    let settingsWrapper = document.getElementById('settingsWrapper')
    StyleManager.toggleElementsVisibilty(settingsWrapper)
  }

  #toggleStartStop(){
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


  #startEvolvingProcess(){
    if(organism.conditionHandler.getIsAlive() && organism.conditionHandler.getIsEvolving() && !organism.conditionHandler.getIsRepeatingPattern()){
         organism.conditionHandler.setStarted(true)
         recursiveLoop()
         this.#toggleStartStop()
    }
  }

  #stopEvolvingProcess(){   
        organism.conditionHandler.setStopped(true)
        this.#toggleStartStop()
  }

  #resetEvolvingProcess(){
        TableExtentions.resetTable()
        let start = this.#getStartButton()
        if(StyleManager.isHidden(start))
          this.#toggleStartStop()
        tabs.refreshStatisticTab()
  }
}

let controls = Object.freeze(new ControlsComponent())
export default controls
 