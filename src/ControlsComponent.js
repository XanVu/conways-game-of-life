import organism from "./Organism"
import { recursiveLoop } from  "./Organism.js";
import TableExtentions from "./TableExtensions.js";

let instance
class ControlsComponent {
    #controlsContainer
    #settingsContainer
    #startButton
    #stopButton
    #abortController

  constructor(){
    if (instance)
      throw new Error("Singleton")
    
    instance = this 

    this.#controlsContainer = document.getElementById('controlsContainer')
    this.#settingsContainer = document.getElementById('settingsContainer')
  }

  #registerPlayButton(){
    let startButton = document.createElement('button')

    let icon = document.createElement('i')

    let iconClassList = ['fa','fa-play-circle-o','fa-3x']
    icon.classList.add(...iconClassList)
    startButton.appendChild(icon)

    this.#startButton = startButton

    let f = this

    startButton.addEventListener("click", f.test)
    this.#controlsContainer.appendChild(startButton)
  }

  test(){
      if(organism.conditionValidator.getIsAlive() && organism.conditionValidator.getIsEvolving() && !organism.conditionValidator.getIsRepeating()){
         organism.conditionValidator.setHasStarted(true)
         organism.conditionValidator.setStopped(false)
         recursiveLoop()
  }
  }

  #registerStopButton(){
    let stopButton = document.createElement('button')
    this.#stopButton = stopButton

    let icon = document.createElement('i')

    let iconClassList = ['fa','fa-pause-circle-o','fa-3x']

    icon.classList.add(...iconClassList)
    stopButton.appendChild(icon)
    
    stopButton.addEventListener('click', function(){
        organism.conditionValidator.setStopped(true) 
      })

    this.#controlsContainer.appendChild(stopButton)
  }

  #registerResetButton(){
    let resetButton = document.createElement('button')

    let icon = document.createElement('i')

    let iconClassList = ['fa', 'fa-refresh', 'fa-3x']

    icon.classList.add(...iconClassList)
    resetButton.appendChild(icon)

    let f = this

    resetButton.addEventListener('click', () => {
         TableExtentions.resetTable()
        f.#startButton.classList.remove('invisible')
        f.#stopButton.classList.remove('invisible')
      })

      this.#controlsContainer.appendChild(resetButton)
  }

  #registerSettingsButton(){
    let settingButton = document.createElement('button')

    let settingsContainer = this.#settingsContainer

    let icon = document.createElement('i')

    let iconClassList = ['fa','fa-cog','fa-3x']

    icon.classList.add(...iconClassList)
    settingButton.appendChild(icon)


    settingButton.addEventListener('click', function(){
        if(settingsContainer.classList.contains('isHidden'))
            settingsContainer.classList.remove('isHidden')
        else
        settingsContainer.classList.add('isHidden')
    })

    this.#controlsContainer.appendChild(settingButton)
  }

  #applyCssClassToControls(){
    let con = this.#controlsContainer

    for(var i = 0; i < con.children.length; ++i){
      let control = con.children[i]
      control.classList.add('controls')
    }
  } 

  #registerSettingsTab(){
    this.#settingsContainer.classList.add('isHidden')
  }

  #registerIntervalSlider(){
    let intervals = ['FAST', 'MEDIUM', 'SLOW']

  }


  loadingControls(){
    this.#registerPlayButton()
    this.#registerStopButton()
    this.#registerResetButton()
    this.#registerSettingsButton()
    this.#applyCssClassToControls()
    this.#registerSettingsTab()
  }
}

let controls = Object.freeze(new ControlsComponent())
export default controls
