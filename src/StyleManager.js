export default class StyleManager{
   static #isHidden = 'isHidden'
   static #isAlive = 'livingCircle'
   static #isDead = 'deadCircle'


   static hideElement(element){
    element.classList.add(StyleManager.#isHidden)
   }

   static showElement(element){
    element.classList.remove(StyleManager.#isHidden)
   }

   static isHidden(element){
    return element.classList.contains(StyleManager.#isHidden)
   }

   static toggleElementsVisibilty(element){
    StyleManager.isHidden(element) ? StyleManager.showElement(element) : StyleManager.hideElement(element)
   }

   static addCssClass(element, styleClass){
      element.classList.add(styleClass)
   }

   static toggleVisibility(element){
      element.classList.toggle(StyleManager.#isHidden)
   }

   static hideAllElments(elements){
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