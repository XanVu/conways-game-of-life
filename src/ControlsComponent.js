import organism from "./TableHandler.js"
import { recursiveLoop } from  "./TableHandler.js";
import TableExtentions from "./TableExtensions.js";

let instance
class ControlsComponent {
    #controlsContainer
    #settingsContainer
    #startButton
    #stopButton
    #wrapper

  constructor(){
    if (instance)
      throw new Error("Singleton")
    
    instance = this 

    this.#controlsContainer = document.getElementById('controlsContainer')
    this.#settingsContainer = document.getElementById('settingsContainer')
    this.#wrapper = document.getElementById('wrapper')
  }

  getStartButton(){
    return this.#startButton
  }

  getStopButton(){
    return this.#stopButton
  }


  #registerPlayButton(){
    let startButton = document.createElement('button')

    let icon = document.createElement('i')

    let iconClassList = ['fa','fa-play-circle-o','fa-3x']
    icon.classList.add(...iconClassList)
    startButton.appendChild(icon)

    this.#startButton = startButton

    let f = this

    startButton.addEventListener("click", function() {
  
    if(organism.conditionHandler.getIsAlive() && organism.conditionHandler.getIsEvolving() && !organism.conditionHandler.getIsRepeatingPattern()){
         organism.conditionHandler.setStarted(true)
         organism.conditionHandler.setStopped(false)
         recursiveLoop()
         this.classList.add('isHidden')
         f.#stopButton.classList.remove('isHidden')
    }})
    this.#controlsContainer.appendChild(startButton)
  }

  #registerStopButton(){
    let stopButton = document.createElement('button')
    this.#stopButton = stopButton

    stopButton.classList.add('isHidden')

    let icon = document.createElement('i')

    let iconClassList = ['fa','fa-pause-circle-o','fa-3x']

    icon.classList.add(...iconClassList)
    stopButton.appendChild(icon)

    let g = this
    
    stopButton.addEventListener('click', function(){
        organism.conditionHandler.setStopped(true)
        this.classList.add('isHidden') 
        g.#startButton.classList.remove('isHidden')
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
        f.#startButton.classList.remove('isHidden')
        f.#stopButton.classList.add('isHidden')
      })

      this.#controlsContainer.appendChild(resetButton)
  }

  #registerSettingsButton(){
    let settingButton = document.createElement('button')

    let wrap = this.#wrapper

    let icon = document.createElement('i')

    let iconClassList = ['fa','fa-cog','fa-3x']

    icon.classList.add(...iconClassList)
    settingButton.appendChild(icon)


    settingButton.addEventListener('click', function(){
        if(wrap.classList.contains('isHidden'))
          wrap.classList.remove('isHidden')
        else
        wrap.classList.add('isHidden')
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
    let settingsTab = document.getElementById('settingsContainer')
    settingsTab.classList.add('isHidden')

    let label = document.createElement('label')
    label.textContent = "Interval Speed between Evolution"

    //settingsTab.appendChild(label)
    
    let slider = document.getElementById('sliderInput')
    let sliderDiv = document.getElementById('slider')

    let intervals = ['FAST', 'MEDIUM', 'SLOW']
  
    for (var i = 0; i < intervals.length; i++) {
      let span = document.createElement('span')
      span.textContent = intervals[i]
      sliderDiv.append(span);
    }

    settingsTab.appendChild(slider)   
    settingsTab.appendChild(sliderDiv)

    slider.addEventListener('input',() => {
      organism.setInterval(slider.value)
    })
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
