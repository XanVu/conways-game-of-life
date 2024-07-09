import * as constants from "./Constants";
import StyleManager from "./StyleManager";
import tableComp from "./TableComponent";


let instance

class SliderComponent {
    #sliderContainer
    #sliderInput


    constructor(){
      if (instance)
        throw new Error("Singleton")

      instance = this

      this.#sliderContainer = document.getElementById('slider-wrapper')
      this.#sliderInput = document.getElementById('sliderInput')

    }

    #getSliderContainer(){
      return this.#sliderContainer
    }

    #getSlider(){
      return this.#sliderInput
    }

    loadingSlider(){
      let sliderWrapper = this.#getSliderContainer()
      StyleManager.addCssClass(sliderWrapper, 'tooltip')
      let sliderDiv = this.#buildSliderDiv()
      let tooltip = this.#createToolTip()
      sliderWrapper.insertBefore(tooltip, sliderWrapper.firstChild)
      sliderWrapper.appendChild(sliderDiv)
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

    getCurrentSliderValue(){
      let slider = this.#getSlider()
      return slider.value
    }

    #connectSliderToOrganism(){
      let slider = this.#getSlider()
      slider.addEventListener(constants.input,() => {

        console.log(slider.value)
      tableComp.setInterval(slider.value)})
    }
}

let slider = Object.freeze(new SliderComponent())
export default slider