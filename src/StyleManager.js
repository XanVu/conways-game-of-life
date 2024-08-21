export default class StyleManager{
   static #isHidden = 'isHidden'
   static #isAlive = 'living'
   static #isDead = 'dead'

   static hideElement(element){
    element.classList.add(StyleManager.#isHidden)
   }

   static showElement(element){
    element.classList.remove(StyleManager.#isHidden)
   }

   static addCssClass(element, styleClass){
      element.classList.add(styleClass)
   }

   static hideElments(elements){
      let arr = Array.from(elements)
      arr.forEach(element =>  StyleManager.hideElement(element))
   }

   static styleCell(span, condition){
      if(condition){
         span.classList.remove(StyleManager.#isDead)
         span.classList.add(StyleManager.#isAlive)
      }
      else{
         span.classList.remove(StyleManager.#isAlive)
         span.classList.add(StyleManager.#isDead)
      }
   }
}