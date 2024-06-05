export default class Cell {
    #nextStatus = false
    #isAlive
    #isUnderpopulated = null
    #isOverpopulated = null
    #reproduce = null
    #Unchanged = false
    
    constructor(isAlive){
      this.#isAlive = isAlive
    }

    getUnchanged(){
      return this.#Unchanged
    }

    getIsUnderpopulated(){
      return this.#isUnderpopulated
    }

    getIsOverpopulated(){
      return this.#isOverpopulated
    }

    getWillReproduce(){
      return this.#reproduce
    }

    getIsAlive(){
      return this.#isAlive
    }

    #setNextStatus(nextStatus){
      this.#nextStatus = nextStatus
    }

    evolve(){
      this.#Unchanged = this.#isAlive == this.#nextStatus
      this.#isAlive = this.#nextStatus
    }

    //Rules:

    #isNotUnderpopulated(livingCells){
      let isNotUnderpopulated = livingCells >= 2  
      this.#isUnderpopulated = !isNotUnderpopulated
      return isNotUnderpopulated
    }

    #isNotOverpopulated(livingCells){
      let isNotOverpopulated = livingCells <= 3  
      this.#isOverpopulated = !isNotOverpopulated
      return isNotOverpopulated
    }

    #willReproduce(livingCells){
      let willReproduce = livingCells == 3
      this.#reproduce = willReproduce
      return willReproduce
    }

  //Any live cell with two or three live neighbors lives on to the next generation.
    #isSurvivingOnToTheNextGen(livingCells){    
      let isAlive =  this.#isNotUnderpopulated(livingCells) && this.#isNotOverpopulated(livingCells)
      this.#setNextStatus(isAlive)
    }

  //Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    #isAliveByReproduction(livingCells){
      let isAlive = this.#willReproduce(livingCells)
      this.#setNextStatus(isAlive)
    }

    determineNextGenerationStatus(numberOfLivingNeigburs){
      let status = this.getIsAlive();  
      status ? this.#isSurvivingOnToTheNextGen(numberOfLivingNeigburs) 
      : this.#isAliveByReproduction(numberOfLivingNeigburs)
    }
  }