import * as constants from './Constants';


let instance
class NavigationComponent {
  #links

  constructor(){
    if (instance)
      throw new Error("Singleton")
    this.#links = []
    instance = this 
  }

  getNavBarLinks(){
    return this.#links
  }

  loadingNavBar(){
   let nav = document.getElementById('navigation')
   let linkList = this.getNavBarLinks()   
   let navItems = constants.navItems

   for(var i = 0; i < navItems.length; ++i){
      let listItem = document.createElement('li')
      let link = document.createElement('a')
      linkList.push(link)
      link.textContent = navItems[i]
      listItem.appendChild(link)
      nav.appendChild(listItem)
   }
  }
}

let navbar = Object.freeze(new NavigationComponent())
export default navbar
