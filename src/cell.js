import * as constants from './Constants';

/* 
class that holds all neccessary information 
about a cell and provide functions to validate
adjacent cells

- evolvedIndicator = indicates if a cell state has been 
                     updated or not in the current 
                     genereation
- cachedStatus = old cell state
- vitalStatus = current cell state
*/
export default class Cell { 
    #evolvedIndicator = 1
    #cachedStatus = false
    #vitalStatus
    
    constructor(vitalStatus){
      this.#vitalStatus = vitalStatus
    }

    /* 
    Getter/Setter/Incremental methods will not be 
    explained as there trivial. It should be obvious 
    what they are used for.
    */

    // #region Getter/Setter/Incremental methods

    #getEvolvedIndicator(){
      return this.#evolvedIndicator
    }
    
    #getCachedStatus(){
      return this.#cachedStatus
    }
    
    getVitalStatus(){
      return this.#vitalStatus
    }  

    #setCachedStatus(status){
      this.#cachedStatus = status
    }

    #setVitalStatus(vitalStatus){
      this.#vitalStatus = vitalStatus
    }

    #incrementEvolvedIndicator(){
      ++this.#evolvedIndicator
    }

    // #endregion 

    /* 
    Rule from the game:
    a cell is underpopulated and dies if it 
    has less than 2 adjacent living cells
    */
    isUnderpopulated(adjacentLivingCells){
      return adjacentLivingCells < 2  
    }

    /* 
    Rule from the game:
    a cell is overpopulated and dies if it 
    has more than 3 adjacent living cells
    */
    isOverpopulated(adjacentLivingCells){
      return adjacentLivingCells > 3
    }

    /* 
    Rule from the game:
    cell gets resurrected back to life if 
    it excatly 3 adjacent living cells
    */
    isResurrected(adjacentLivingCells){
      return adjacentLivingCells == 3
    }
    
    /* 
    Saves the current status of the cell within cache
    before applying the fresh calculated cell state on to 
    current state. Afterwards increasing the evolution 
    indicator, marking it as updated within the current 
    generation of cells in the grid.
    */
    cacheVitalStatusAndEvolveTo(nextVitalStatus){    
      let currentVitalStatus = this.getVitalStatus()
      this.#setCachedStatus(currentVitalStatus)
      this.#setVitalStatus(nextVitalStatus)
      this.#incrementEvolvedIndicator()
      return nextVitalStatus
    }
    
    /* 
    Function that creates the cell states (alive / dead)
    for the initial grid configuration.
    If a pseudorandom number between 0 and 1 lies beyound a
    certain threshold the inital state will be true else false.
    */
    determineInitialVitalStatus(){
      let initVitalStatus = Math.random() > constants.cellThresHold
      this.#setVitalStatus(initVitalStatus)
      return initVitalStatus
    }

    /* 
    Compares the evolution indicators to see if the current cell
    was updated or is still untouched and returns a cell state value.
    If the current cell state was already updated, we will use the 
    cached/old cell state value as the calculation would be distorted 
    by the new value.
    */
    determineVitalStatus(evolvedIndicator){
     return evolvedIndicator == this.#getEvolvedIndicator() ? 
       this.getVitalStatus() : this.#getCachedStatus()
    }
  }