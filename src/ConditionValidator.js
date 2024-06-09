import StatisticHandler from "./StatisticHandler.js";

let instance

export default class ConditionValidator {
    #statisticHandler
    #repetitionCounter = 0
    #repetitionThreshold = 5

    #hasStarted = false
    #hasStopped = false
    #isAlive = true
    #isRepeating = false
    #isEvolving = true
    #changed = false

    constructor(statisticHandler){
        if (instance)
          throw new Error("Singleton")
        
        instance = this;
        this.#statisticHandler = statisticHandler
    }

    #getChanged(){
        return this.#changed
    }

    #resetChanged(){
        this.#changed = false
    }

    getHasStarted(){
        return this.#hasStarted
    }
  
    getHasStopped(){
        return this.#hasStopped
    }
      
    getIsAlive(){
        return this.#isAlive
    }
  
    getIsRepeating(){
        return this.#isRepeating
    }

    getRepetitionCounter(){
        return this.#repetitionCounter
    }
  
    getRepetitionThreshold(){
        return this.#repetitionThreshold
    }

    getHasStarted(){
        return this.#hasStarted
    }

    getIsEvolving(){
        return this.#isEvolving
    }
  
    setHasStarted(){
        this.#hasStarted = true
    }
  
    setStopped(bool){
        this.#hasStopped = bool
    }
  
    setIsAlive(bool){
        this.#isAlive = bool
    }
  
    setIsRepeating(bool){
        this.#isRepeating = bool
    }

    setIsEvolving(bool){
        this.#isEvolving = bool
    }

    
    incrementRepetitionCounter(){
        ++this.#repetitionCounter
    }
  
    
    resetRepetitionCounter(){
        this.#repetitionCounter = 0
    }


    setRepetitionFlag(){
        this.#statisticHandler.isCurrentGenEqualToPreviousGen() ? this.incrementRepetitionCounter() : this.resetRepetitionCounter()
        this.inspectRepetitionCondition()
       }
      
    inspectRepetitionCondition(){
        if(this.getRepetitionCounter() == this.getRepetitionThreshold()){  
          this.setIsRepeating(true)
        }
       }
      
    changeDetection(hasChanged){
       if(hasChanged)
        this.#changed = true
    } 

    resetChangedAndConfirmEvolving(){
        let changed = this.#getChanged()
        this.#resetChanged()
        this.setIsEvolving(changed)
    }

    executeHealthCheck(){
        if(this.#statisticHandler.getLivingCellPerIteration() == 0){
          this.setIsAlive(false)
        }
    }

    isLooping(){
        return this.getHasStarted() && !this.getHasStopped() && this.getIsAlive() && this.getIsEvolving() && !this.getIsRepeating()
    }
}