import * as constants from './Constants';

// class that holds all neccessary information about a cell and provide functions to validate adjacent cells
export default class Cell { 
    #evolvedIndicator = 1
    #cachedStatus = false
    #vitalStatus
    
    constructor(vitalStatus){
      this.#vitalStatus = vitalStatus
    }

    // #region Getter

    #getEvolvedIndicator(){
      return this.#evolvedIndicator
    }
    
    #getCachedStatus(){
      return this.#cachedStatus
    }
    
    getVitalStatus(){
      return this.#vitalStatus
    }  
    
    // #endregion

    // #region Setter 

    #setCachedStatus(status){
      this.#cachedStatus = status
    }

    #setVitalStatus(vitalStatus){
      this.#vitalStatus = vitalStatus
    }

    // #endregion

    // #region Increments 

    #incrementEvolvedIndicator(){
      ++this.#evolvedIndicator
    }

    // #endregion 

    // cell is underpopulated if it has less than 2 adjacent living cells
    isUnderpopulated(adjacentLivingCells){
      return adjacentLivingCells < 2  
    }

    // cell is overpopulated if it has more than 3 adjacent living cells
    isOverpopulated(adjacentLivingCells){
      return adjacentLivingCells > 3
    }

    // cell gets resurrected if it excatly 3 adjacent living cells
    isResurrected(adjacentLivingCells){
      return adjacentLivingCells == 3
    }
    
    // Saves the status within cache and sets the new status and increments the indicator
    cacheVitalStatusAndEvolveTo(nextVitalStatus){    
      let currentVitalStatus = this.getVitalStatus()
      this.#setCachedStatus(currentVitalStatus)
      this.#setVitalStatus(nextVitalStatus)
      this.#incrementEvolvedIndicator()
      return nextVitalStatus
    }
    
    // determines the initial cell status (alive / dead)
    determineInitialVitalStatus(){
      let initVitalStatus = Math.random() > constants.cellThresHold
      this.#setVitalStatus(initVitalStatus)
      return initVitalStatus
    }

    // decides by the indicator which status gets used to calculate the next status for another cell
    determineVitalStatus(evolvedIndicator){
     return evolvedIndicator == this.#getEvolvedIndicator() ? 
       this.getVitalStatus() : this.#getCachedStatus()
    }
  }