import StyleManager from "./StyleManager.js";
import * as constants from './Constants';

let instance
class ControlsComponent {    
  #controlsWrapper
  #startButton
  #stopButton
  #resetButton
  #statisticButton

  constructor(){
    if (instance)
      throw new Error("Singleton")  

    this.#controlsWrapper = document.getElementById('controls-wrapper')
    instance = this
  }

  #getControlsWrapper(){
    return this.#controlsWrapper
  }

  getStartButton(){
    return this.#startButton
  }

  getStopButton(){
    return this.#stopButton
  }

  getResetButton(){
    return this.#resetButton
  }

  getStatisticButton(){
    return this.#statisticButton
  }

  #setStartButton(btn){
    this.#startButton = btn
  }

  #setStopButton(btn){
    this.#stopButton = btn
  }

  #setResetButton(btn){
    this.#resetButton = btn
  }

  #setStatisticButton(btn){
    this.#statisticButton = btn
  }

  #buildButton(type){
    let wrapper = this.#getControlsWrapper()
    let button = document.createElement('button') 
    
    let controllCssClass = 'controls'
    button.classList.add(controllCssClass)
    
    let icon = document.createElement('i')
    icon.classList.add(...constants.iconAssets, type)

    button.appendChild(icon)
    wrapper.appendChild(button)
    return button
  } 

  loading(){
    let statisticButton = this.#buildButton(constants.statisticIcon)
    let resetButton = this.#buildButton(constants.resetIcon)
    let startButton = this.#buildButton(constants.playIcon)
    let stopButton =  this.#buildButton(constants.stopIcon)

    this.#setStartButton(startButton)
    this.#setStopButton(stopButton)
    this.#setResetButton(resetButton)
    this.#setStatisticButton(statisticButton)

    this.#hideButton(stopButton)
  }

  #showButton(btn){
    StyleManager.showElement(btn)
  }

  #hideButton(btn){
    StyleManager.hideElement(btn)
  }

  resetControls(){
    this.showStartButton()
    this.hideStopButton() 
  }


  showStartButton(){
    let btn = this.getStartButton()
    this.#showButton(btn)
  }

  showStopButton(){
    let btn = this.getStopButton()
    this.#showButton(btn)
  }

  hideStartButton(){
    let btn = this.getStartButton()
    this.#hideButton(btn)
  }

  hideStopButton(){
    let btn = this.getStopButton()
    this.#hideButton(btn)
  }
}

let controls = Object.freeze(new ControlsComponent())
export default controls
 