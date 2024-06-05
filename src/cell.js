export default class Cell {
    #isAlive = false
    #nextState = false

    #isUnderpopulated = false
    #isOverpopulated = false
    #isReproducing = false
    #isUnchanged = false
 
    
    constructor(isAlive){
      this.#isAlive = isAlive
    }
    
    getIsAlive(){
      return this.#isAlive
    }  
    
    getNextState(){
      return this.#nextState
    }

    getIsUnderpopulated(){
      return this.#isUnderpopulated
    }

    getIsOverpopulated(){
      return this.#isOverpopulated
    }

    getIsReproducing(){
      return this.#isReproducing
    }

    getIsUnchanged(){
      return this.#isUnchanged
    }

    #setIsAlive(bool){
      this.#isAlive = bool
    }

    #setNextState(bool){
      this.#nextState = bool
    }

    #setIsUnderpopulated(bool){
      this.#isUnderpopulated = bool
    }

    #setIsOverpopulated(bool){
      this.#isOverpopulated = bool
    }

    #setIsReproducing(bool){
      this.#isReproducing = bool
    }

    #setIsUnchanged(bool){
      this.#isUnchanged = bool
    }



    #isNotUnderpopulated(adjacentLivingCells){
      let isNotUnderpopulated = adjacentLivingCells >= 2  
      this.#setIsUnderpopulated(!isNotUnderpopulated)
      return isNotUnderpopulated
    }

    #isNotOverpopulated(adjacentLivingCells){
      let isNotOverpopulated = adjacentLivingCells <= 3  
      this.#setIsOverpopulated(!isNotOverpopulated)
      return isNotOverpopulated
    }

    #reproducing(adjacentLivingCells){
      let isReproducing = adjacentLivingCells == 3
      this.#setIsReproducing(isReproducing)   
      this.#setNextState(isReproducing)
      return isReproducing
    }

    #isSurviving(adjacentLivingCells){    
      let isSurviving =  this.#isNotUnderpopulated(adjacentLivingCells) && this.#isNotOverpopulated(adjacentLivingCells)
      this.#setNextState(isSurviving)
    }


    determineDevelopment(adjacentLivingCells){
      this.getIsAlive() ? this.#isSurviving(adjacentLivingCells) : this.#reproducing(adjacentLivingCells)
    }

    evolve(){
      let isUnchanged = this.getIsAlive() == this.getNextState()
      this.#setIsUnchanged(isUnchanged)
      this.#setIsAlive(this.getNextState())
    }
  }