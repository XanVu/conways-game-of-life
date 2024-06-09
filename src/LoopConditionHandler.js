import StatisticHandler from "./StatisticHandler.js";
import SphereOfLife from './organism';

export default class LoopConditionHandler {
    static #repetitionCounter = 0
    static #repetitionThreshold = 5
    
    static #hasStarted = false
    static #hasStopped = false
    
    static #isAlive = true
    static #isRepeating = false
    
    static #isEvolving = true
    static #changed = false


    static #getChanged(){
        return this.#changed
    }

    static #resetChanged(){
        this.#changed = false
    }

    static getHasStarted(){
        return this.#hasStarted
    }
  
    static getHasStopped(){
        return this.#hasStopped
    }
      
    static getIsAlive(){
        return this.#isAlive
    }
  
    static getIsRepeating(){
        return this.#isRepeating
    }

    static getRepetitionCounter(){
        return this.#repetitionCounter
    }
  
    static getRepetitionThreshold(){
        return this.#repetitionThreshold
    }

    static getHasStarted(){
        return this.#hasStarted
    }

    static getIsEvolving(){
        return this.#isEvolving
    }
  

    static setHasStarted(){
        this.#hasStarted = true
    }
  
    static setStopped(bool){
        this.#hasStopped = bool
    }
  
    static setIsAlive(bool){
        this.#isAlive = bool
    }
  
    static setIsRepeating(bool){
        this.#isRepeating = bool
    }

    static setIsEvolving(bool){
        this.#isEvolving = bool
    }

    
    static incrementRepetitionCounter(){
        ++this.#repetitionCounter
    }
  
    
    static resetRepetitionCounter(){
        this.#repetitionCounter = 0
    }


    static setRepetitionFlag(){
        StatisticHandler.isCurrentGenEqualToPreviousGen() ? this.incrementRepetitionCounter() : this.resetRepetitionCounter()
        this.#inspectRepetitionCondition()
       }
      
       static #inspectRepetitionCondition(){
        if(this.getRepetitionCounter() == this.getRepetitionThreshold()){  
          this.setIsRepeating(true)
        }
       }
      
    static changeDetection(hasChanged){
       if(hasChanged)
        this.#changed = true
    } 

    static resetChangedAndConfirmEvolving(){
        let changed = LoopConditionHandler.#getChanged()
        LoopConditionHandler.#resetChanged()
        LoopConditionHandler.setIsEvolving(changed)
    }
    

    static executeHealthCheck(){
        if(StatisticHandler.getLivingCellPerIteration() == 0){
          this.setIsAlive(false)
        }
    }

    static isLooping(){
        return this.getHasStarted() && !this.getHasStopped() && this.getIsAlive() && this.getIsEvolving() && !this.getIsRepeating()
    }
}