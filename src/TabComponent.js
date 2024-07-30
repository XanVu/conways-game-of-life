import StyleManager from "./StyleManager"
import * as constants from './Constants'
import controls from "./ControlsComponent"

let instance

class TabComponent {
  #tabWrapper
  #statistic

  constructor(){
    if (instance)
      throw new Error("Singleton")
    this.#tabWrapper = document.getElementById('tab-wrapper')
    instance = this
    }

    #getTabWrapper(){
      return this.#tabWrapper
    }

    getStatistic(){
      return this.#statistic
    }

    #setStatistic(tab){
      this.#statistic = tab
    }

    #buildTab(){
      let tab = document.createElement('div')
      StyleManager.addCssClass(tab, 'isHidden')
      StyleManager.addCssClass(tab, 'mobile-tab')

      let closeBtn = document.createElement('button')
      StyleManager.addCssClass(closeBtn, 'close')

      closeBtn.addEventListener(constants.click, () => {
        StyleManager.toggleElementsVisibilty(tab)
      })

      tab.appendChild(closeBtn)

      return tab
    }

    #buildStatisticTab(){
      let wrapper = this.#getTabWrapper()
      let tab = this.#buildTab()
      this.#setStatistic(tab)
      this.#addContentFoundationTo(tab)
      wrapper.appendChild(tab)

      return tab
    }

    #addContentFoundationTo(tab){
      let headline = document.createElement('h3') 
      headline.textContent = constants.navStatistic
      tab.appendChild(headline)
      
      let statisticTexts = ['Generation:', 'Overall living Cells:' , 'Death by Overpolulation:', 'Death by Underpopulation:', 'Resurrection by Reproduction:']
      
      statisticTexts.forEach(text => {
        let textHolder = document.createElement('p')
        let valueHolder = document.createElement('p')
        textHolder.textContent = text
        tab.appendChild(textHolder)
        tab.appendChild(valueHolder)
      })   
    }

    refreshStatisticTab(data){
      let tab = this.getStatistic()
      let formatter = new Intl.NumberFormat('de-De', {maximumSignificantDigits: 6}) 
      let elements = tab.children
      let valueFields = Array.from(elements).filter((_ , index) => index > 1 && index % 2 == 1)
      let values = Object.entries(data)
      values.forEach((entry, index) => {
        let formattedValue = formatter.format(entry[1])
        let valueField = valueFields[index]
        valueField.textContent = formattedValue
      })
    }

    
    #registerEvents(){
      let statisticButton = controls.getStatisticButton()
      let statistic = this.getStatistic()
      statisticButton.addEventListener(constants.click, () => {
        StyleManager.toggleVisibility(statistic)})
    }

    loading(){
      this.#buildStatisticTab()
      this.#registerEvents()
    } 
}

let tabs = Object.freeze(new TabComponent())
export default tabs