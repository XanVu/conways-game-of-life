export default class Cell {
    static #distribiton = 0.75

    #currentEvolutionStep = 1

    #isAlive

    #previousState = false

    #isUnderpopulated = false
    #isOverpopulated = false
    #isReproducing = false
    #hasChanged = false

 
    constructor(isAlive){
      this.#isAlive = isAlive
    }

    getCurrentEvolutionStep(){
      return this.#currentEvolutionStep
    }
    
    getIsAlive(){
      return this.#isAlive
    }  
    
    getPreviousState(){
      return this.#previousState
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

    getHasChanged(){
      return this.#hasChanged
    }

    getPreviousState(){
      return this.#previousState
    }


    #setIsAlive(bool){
      this.#isAlive = bool
    }

    #setPreviousState(bool){
      this.#previousState = bool
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

    #setHasChanged(bool){
      this.#hasChanged = bool
    }

    #setCurrentEvolutionStep(value){
      this.#currentEvolutionStep = value
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
      let currentState = this.getIsAlive()
      let isReproducing = adjacentLivingCells == 3
      this.#setIsReproducing(isReproducing)
      this.#setPreviousState(currentState) 
      this.#setIsAlive(isReproducing)
      this.#setHasChanged(isReproducing != currentState)   
      return isReproducing
    }

    #isSurviving(adjacentLivingCells){    
      let currentState = this.getIsAlive()
      let isSurviving =  this.#isNotUnderpopulated(adjacentLivingCells) && this.#isNotOverpopulated(adjacentLivingCells)
      this.#setPreviousState(currentState) 
      this.#setIsAlive(isSurviving)
      this.#setHasChanged(isSurviving != currentState) 
    }

    evolving(adjacentLivingCells, evolutionStep){
      this.getIsAlive() ? this.#isSurviving(adjacentLivingCells) : this.#reproducing(adjacentLivingCells)
      this.#setCurrentEvolutionStep(evolutionStep)
    }

    validateProbailityOfComingAlive(){
      if(Math.random() > Cell.#distribiton)
         this.#setIsAlive(true)
    }
  }