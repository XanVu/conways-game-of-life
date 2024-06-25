
let instance

export default class ConditionHandler {
    #started
    #stopped
    #isAlive
    #isRepeatingPattern
    #isEvolving
    #changing

    constructor(){
        if (instance)
          throw new Error("Singleton")
        
        instance = this;
        this.initToDefault()
    }

    initToDefault(){
        this.#started = false
        this.#stopped = false
        this.#isAlive = true
        this.#isRepeatingPattern = false
        this.#isEvolving = true
        this.#changing = false
    }

    resetChanging(){
        this.#changing = false
    }

    getChanging(){
        return this.#changing
    }

    getStarted(){
        return this.#started
    }
  
    getStopped(){
        return this.#stopped
    }
      
    getIsAlive(){
        return this.#isAlive
    }
  
    getIsRepeatingPattern(){
        return this.#isRepeatingPattern
    }

    getIsEvolving(){
        return this.#isEvolving
    }
  
    setStarted(){
        this.#started = true
        this.setStopped(false)
    }
  
    setStopped(bool){
        this.#stopped = bool
    }
  
    setIsAlive(bool){
        this.#isAlive = bool
    }

    setChanging(bool){
        this.#changing = bool 
    }
  
    setIsRepeatingPattern(bool){
        this.#isRepeatingPattern = bool
    }

    setIsEvolving(bool){
        this.#isEvolving = bool
    }

    isEvolving(){
        return this.getStarted() && !this.getStopped() && this.getIsAlive() && !this.getIsRepeatingPattern() && this.getIsEvolving()
    }
}