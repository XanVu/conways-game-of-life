
export default class ConditionHandler {
    #started = false 
    #isAlive = true
    #isRepeatingPattern = false
    #isEvolving = true
    #changing = false

    constructor(){
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
      
    getIsAlive(){
        return this.#isAlive
    }
  
    getIsRepeatingPattern(){
        return this.#isRepeatingPattern
    }

    getIsEvolving(){
        return this.#isEvolving
    }
  
    setStarted(bool){
        this.#started = bool
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
        return this.getStarted() && this.getIsAlive() && !this.getIsRepeatingPattern() && this.getIsEvolving()
    }

    getConditionFlags(){
        return {
            isAlive: this.getIsAlive(),
            isRepeatingPattern: this.getIsRepeatingPattern(),
            isEvolving: this.getIsEvolving(),
            started: this.getStarted()
        }
    }
}