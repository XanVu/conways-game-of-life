
let instance
class NavigationComponent {
  #tabContainer
  #statisticTab
  #navItems  

  constructor(){
    if (instance)
      throw new Error("Singleton")

    this.#navItems = ['STATISTIC', 'BASIC RULES', 'DEFINITION']
    this.#tabContainer = document.getElementById('tabContainer')
    instance = this 
  }

  getStatisticTab(){
    return this.#statisticTab
  }

  #registerNavigation(){
    let nav = document.getElementById('navigation')
    let list = document.createElement('ul')

    let tabs = this.#tabContainer.children


    for(var i = 0; i < this.#navItems.length; ++i){
      let listItem = document.createElement('li')
      let link = document.createElement('a')
      
      link.textContent = this.#navItems[i]
      listItem.appendChild(link)
      list.appendChild(listItem)

      let tab = tabs[i]     

      link.addEventListener('click', function(){
         tab.classList.toggle('isHidden')
         Array.from(tabs).filter(otherTab => otherTab != tab).forEach(x => x.classList.add('isHidden'))
      })
    }
    nav.appendChild(list)
  }

 #registerStatisticTabs(){
    let statisticTab = document.createElement('div')
    this.#statisticTab = statisticTab
    let h3 = document.createElement('h3')
    h3.textContent = this.#navItems[0]
    statisticTab.appendChild(h3)

    let firstStaticTabRef = this.#tabContainer.children[0]    
    this.#tabContainer.insertBefore(statisticTab, firstStaticTabRef)
  }

  #applyCssClassToTabs(){
    let con = this.#tabContainer

    for(var i = 0; i < con.children.length; ++i){
      let tab = con.children[i]

      if(i == 0)
        tab.classList.add('tabContent')
      else{
        tab.classList.add('tabContent')
        tab.classList.add('isHidden')
      }
    }
  }

  loadingNavBarAndTabs(){
    this.#registerStatisticTabs()
    this.#registerNavigation()
    this.#applyCssClassToTabs()
  }
}

let navbar = Object.freeze(new NavigationComponent())
export default navbar
