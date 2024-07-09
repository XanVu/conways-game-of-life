import navbar from "./NavigationComponent"
import StyleManager from "./StyleManager"
import * as constants from './Constants';
import statisticComponent from "./StatisticComponent";

let instance

class TabComponent {
  #tabWrapper
  #statisticTab

    constructor(){
      if (instance)
        throw new Error("Singleton")

      instance = this
      this.#tabWrapper = document.getElementById('tab-wrapper')
    }

    #getTabWrapper(){
      return this.#tabWrapper
    }

    #setStatisticTab(tab){
      this.#statisticTab = tab
    }

    #getStatisticTab(){
      return this.#statisticTab
    }

    #createTab(){
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

    #createStaticTabs(){
      let rulesTab = this.#createTab()
      let h3r = document.createElement('h3')
      let hlr = constants.navItems[1]
      h3r.textContent = hlr

      let rule1 = document.createElement('p')
      rule1.textContent = '1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.'
      let rule2 = document.createElement('p')
      rule2.textContent = '2. Any live cell with two or three live neighbors lives on to the next generation.'
      let rule3 = document.createElement('p')
      rule3.textContent = '3. Any live cell with more than three live neighbors dies, as if by overpopulation.'
      let rule4 = document.createElement('p')
      rule4.textContent = '4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.'

      rulesTab.appendChild(h3r)
      rulesTab.appendChild(rule1)
      rulesTab.appendChild(rule2)
      rulesTab.appendChild(rule3)
      rulesTab.appendChild(rule4)

      let definitionTab = this.#createTab()
      let h3d = document.createElement('h3')
      let hld = constants.navItems[2]
      h3d.textContent = hld
      let content = document.createElement('p')
      content.textContent = 'The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.'
      definitionTab.appendChild(h3d)
      definitionTab.appendChild(content)


      this.#tabWrapper.appendChild(rulesTab)
      this.#tabWrapper.appendChild(definitionTab)

    }

    #createStatisticTab(){
      let tab = this.#createTab()
      this.#setStatisticTab(tab) 
      let h3 = document.createElement('h3')
      let p = document.createElement('p')

      h3.textContent = constants.statisticHeadLine
      tab.appendChild(h3)
      tab.appendChild(p)
      this.#tabWrapper.appendChild(tab)

      this.refreshStatisticTab()

    }

    refreshStatisticTab(){
      let tab = this.#getStatisticTab()
      let newText = statisticComponent.createStatPresentation()
      let oldText = tab.children[2]

      tab.removeChild(oldText)
      tab.appendChild(newText)
    }

    #connectNavLinksToTabs(){
      let container = this.#getTabWrapper()
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
      this.#createStaticTabs()
      this.#connectNavLinksToTabs()
    } 
}

let tabs = Object.freeze(new TabComponent())
export default tabs