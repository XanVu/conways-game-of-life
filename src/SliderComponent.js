import * as constants from "./Constants";
import StyleManager from "./StyleManager";
import tableHandler from "./TableHandler";

let instance

class SliderComponent {
    #settingsWrapper
    #settingsContainer
    #sliderInput


    constructor(){
      if (instance)
        throw new Error("Singleton")

      instance = this

      this.#settingsWrapper = document.getElementById('settingsWrapper') 
      this.#settingsContainer = document.getElementById('settingsContainer')
      this.#sliderInput = document.getElementById('sliderInput')

    }

    #getSettingsWrapper(){
      return this.#settingsWrapper
    }

    #getSettingsContainer(){
      return this.#settingsContainer
    }

    #getSlider(){
      return this.#sliderInput
    }

    loadingSlider(){
      let settingsWrapper = this.#getSettingsWrapper()
      StyleManager.hideElement(settingsWrapper)
      let settingsTab = this.#getSettingsContainer()
      StyleManager.addCssClass(settingsTab, 'tooltip')
      let sliderDiv = this.#buildSliderDiv()
      let tooltip = this.#createToolTip()
      settingsTab.appendChild(tooltip)
      settingsTab.appendChild(sliderDiv)
      this.#connectSliderToOrganism()
    }

    #buildSliderDiv(){
      let sliderDiv = document.createElement('div')
      let intervals = constants.sliderIntervals

      StyleManager.addCssClass(sliderDiv,'slider')
    
      for (var i = 0; i < intervals.length; i++) {
        let span = document.createElement('span')
        span.textContent = intervals[i]
        sliderDiv.append(span);
      }
      return sliderDiv
    }

    #createToolTip(){
      let span = document.createElement('span')
      span.textContent = constants.settingsLabel
      StyleManager.addCssClass(span, 'tooltiptext')
      return span
    }

    #connectSliderToOrganism(){
      let slider = this.#getSlider()
      slider.addEventListener(constants.input,() => {
      tableHandler.setInterval(slider.value)})
    }
}

let slider = Object.freeze(new SliderComponent())
export default slider