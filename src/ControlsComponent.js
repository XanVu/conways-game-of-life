import StyleManager from "./StyleManager.js";
import * as constants from './Constants';

/*
A Component that holds the controls of the game
and a connection to the actual div that will be 
holding these elements. If the program starts these
elements will be loaded. This component is a singleton 
as its only required once.

- start button -> starts the game/loop
- stop button  -> stops the game/loop 
- reset button -> reset the grid with a new set of cells
*/
let instance
class ControlsComponent {    
  #controlsWrapper
  #startButton
  #stopButton
  #resetButton

  constructor(){
    if (instance)
      throw new Error("Singleton")  

    this.#controlsWrapper = document.getElementById('controls-wrapper')
    instance = this
  }

  /* 
  Getter/Setter/Incremental methods will not be 
  explained as there trivial. It should be obvious 
  what they are used for.
  */

// #region Getter/Setter
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

  #setStartButton(btn){
    this.#startButton = btn
  }

  #setStopButton(btn){
    this.#stopButton = btn
  }

  #setResetButton(btn){
    this.#resetButton = btn
  }
// #endregion 

  /*
  A function that creates an button element and adds
  it to the wrapper. It styles the button and adds 
  specific css classes to it.
  */
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

  /*
  A function that creates all control buttons for the game.
  Registers the button within this class and sets up the buttons
  for the game accordingly.
  */
  loading(){
    let resetButton = this.#buildButton(constants.resetIcon)
    let startButton = this.#buildButton(constants.playIcon)
    let stopButton =  this.#buildButton(constants.stopIcon)
    this.#setStartButton(startButton)
    this.#setStopButton(stopButton)
    this.#setResetButton(resetButton)
    this.#hideButton(stopButton)
  }

  /*
  All following functions are used to either hide or show
  buttons. These should provide a way to control the control 
  buttons visibility by other classes that utilise this class.
  */
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

  hideControls(){
    this.hideStartButton()
    this.hideStopButton()
  }
}

/*
This is the implementation of a singleton pattern
*/
let controls = Object.freeze(new ControlsComponent())
export default controls