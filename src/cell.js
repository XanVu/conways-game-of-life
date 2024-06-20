export default class Cell { 
    #evolvedIndicator = 1
    #vitalStatus
    #cachedStatus = false

    constructor(vitalStatus){
      this.#vitalStatus = vitalStatus
    }

    #getEvolvedIndicator(){
      return this.#evolvedIndicator
    }
    
    getVitalStatus(){
      return this.#vitalStatus
    }  
    
    #getCachedStatus(){
      return this.#cachedStatus
    }

    #incrementEvolvedIndicator(){
      this.#evolvedIndicator += 1
    }

    #setVitalStatus(vitalStatus){
      this.#vitalStatus = vitalStatus
    }

    #setCachedStatus(status){
      this.#cachedStatus = status
    }

    isUnderpopulated(adjacentLivingCells){
      return adjacentLivingCells < 2  
    }

    isOverpopulated(adjacentLivingCells){
      return adjacentLivingCells > 3
    }

    isResurrected(adjacentLivingCells){
      return adjacentLivingCells == 3
    }

    hasSwitchedStatus(){
      return this.getVitalStatus() != this.#getCachedStatus()
    }

    cacheVitalStatusAndEvolveTo(nextVitalStatus){    
      let currentVitalStatus = this.getVitalStatus()
      this.#setCachedStatus(currentVitalStatus)
      this.#setVitalStatus(nextVitalStatus)
      this.#incrementEvolvedIndicator()
      return nextVitalStatus
    }
    
    determineInitialVitalStatus(){
      let initVitalStatus = Math.random() > 0.75
      this.#setVitalStatus(initVitalStatus)
      return initVitalStatus
    }

    determineVitalStatus(evolvedIndicator){
     return evolvedIndicator == this.#getEvolvedIndicator() ? 
       this.getVitalStatus() : this.#getCachedStatus()
    }
  }