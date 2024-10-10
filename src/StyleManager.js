/*
A class that provides static functions for manipulation
of css related tasks.

Provides a function for updates the css style for cells.
*/
export default class StyleManager {
   static #isHidden = 'isHidden'
   static #isAlive = 'living'
   static #isDead = 'dead'
   
   /*
   A function that styles the element that represents the 
   cells in the grid. Depending on the state it toggles
   between dead or alive, which is presented differently.
   */
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

   /*
   Every following function is a helper function for
   hiding or showing elements or adding own css attributes
   to that element 
   */
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
}