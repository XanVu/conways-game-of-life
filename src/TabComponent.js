import navbar from "./NavigationComponent"
import StyleManager from "./StyleManager"
import * as constants from './Constants';
import statisticComponent from "./StatisticComponent";

let instance

class TabComponent {
  #tabContainer
  #statisticTab

    constructor(){
      if (instance)
        throw new Error("Singleton")

      instance = this
      this.#tabContainer = document.getElementById('tabsContainer')
    }

    #getTabContainer(){
      return this.#tabContainer
    }

    #setStatisticTab(tab){
      this.#statisticTab = tab
    }

    #getStatisticTab(){
      return this.#statisticTab
    }

    #createStatisticTab(){
      let tab = document.createElement('div')
      this.#setStatisticTab(tab) 
      let h3 = document.createElement('h3')
      let p = document.createElement('p')
      h3.textContent = constants.statisticHeadLine
      tab.appendChild(h3)
      tab.appendChild(p)
  
      let firstTabElement = this.#getTabContainer().firstChild   
      this.#tabContainer.insertBefore(tab, firstTabElement)
    }

    refreshStatisticTab(){
      let tab = this.#getStatisticTab()
      let newText = statisticComponent.createStatPresentation()
      let oldText = tab.children[1]

      tab.removeChild(oldText)
      tab.appendChild(newText)
    }


    #styleTabs(){
      let container = this.#getTabContainer()
      let statTab = this.#getStatisticTab()
      let tabs = container.children

      Array.from(tabs).forEach(tab => {
            StyleManager.addCssClass(tab, 'tabContent')

            if(tab != statTab)
              StyleManager.hideElement(tab)
      })
    }

    #connectNavLinksToTabs(){
      let container = this.#getTabContainer()
      let tabs = container.children

      let links = navbar.getNavBarLinks()  
  
      for(var i = 0; i < tabs.length; ++i){ 
         let link = links[i] 
         let tab = tabs[i]
         let otherTabs = Array.from(tabs).filter(otherTab => otherTab != tab)
  
         link.addEventListener(constants.click, () => {
           StyleManager.toggleVisibility(tab)
           StyleManager.hideAllElments(otherTabs)
         })
      }
    }

    loadingTabs(){
      this.#createStatisticTab()
      this.#styleTabs()
      this.#connectNavLinksToTabs()
    } 
}

let tabs = Object.freeze(new TabComponent())
export default tabs