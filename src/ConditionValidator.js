import StatisticHandler from "./StatisticHandler"

let instance

export default class ConditionValidator {
    #hasStarted
    #hasStopped
    #isAlive
    #isRepeating
    #isEvolving
    #changed

    constructor(){
        if (instance)
          throw new Error("Singleton")
        
        instance = this;

        this.initToDefault()
    }

    initToDefault(){
        this.#hasStarted = false
        this.#hasStopped = false
        this.#isAlive = true
        this.#isRepeating = false
        this.#isEvolving = true
        this.#changed = false
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
      
    inspectRepetitionCondition(repetitionCounter){
        if(repetitionCounter == StatisticHandler.repetitionThreshold) 
            this.setIsRepeating(true)
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

    isLooping(){
        return this.getHasStarted() && !this.getHasStopped() && this.getIsAlive() && this.getIsEvolving() && !this.getIsRepeating()
    }

    executeHealthCheck(livingCells){
        if(livingCells == 0)
          this.conditionValidator.setIsAlive(false)
    }
}