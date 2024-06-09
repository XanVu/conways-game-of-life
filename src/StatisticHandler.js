
let instance

export default class StatisticHandler {
    #iteration = 0
    #livingCellsPerIteration = 0
    #deadCellsPerIteration = 0
    #fatalitiesOfOverpopulation = 0
    #fatalitiesOfUnderpopulation = 0
    #reproducedCells = 0

    #previousLivingCellsPerIteration = 0
    #previousDeadCellsPerIteration = 0

    constructor(){
      if (instance)
        throw new Error("Singleton")
      
      instance = this;
    }

    getIteration(){
        return this.#iteration
      }
  
    getLivingCellPerIteration(){
      return this.#livingCellsPerIteration
    }
  
    getDeadCellPerIteration(){
      return this.#deadCellsPerIteration
    }
  
      getFatalitiesOfOverpopulation(){
        return this.#fatalitiesOfOverpopulation
      }
  
      getFatalitiesOfUnderpopulation(){
        return this.#fatalitiesOfUnderpopulation
      }
  
      getReproducedCells(){
        return this.#reproducedCells
      }

      getPreviousLivingCellsPerIteration(){
        return this.#previousLivingCellsPerIteration
      }
  
      getPreviousDeadCellsPerIteration(){
        return this.#previousDeadCellsPerIteration
      }


      setPreviousLivingCellsPerIteration(pervious){
        this.#previousLivingCellsPerIteration = pervious
      }
  
      setPreviousDeadCellsPerIteration(pervious){
        this.#previousDeadCellsPerIteration = pervious
      }

      incrementIteration(){
        ++this.#iteration
      }

      incrementFatalitiesOfUnderpopulation(){
        ++this.#fatalitiesOfUnderpopulation
      }

      incrementLivingCellsPerIteration(){
        ++this.#livingCellsPerIteration
      }

      incrementDeadCellsPerIteration(){
        ++this.#deadCellsPerIteration
      }

      incrementFatalitiesOfUnderpopulation(){
        ++this.#fatalitiesOfUnderpopulation
      }

      incrementFatalitiesOfOverpopulation(){
        ++this.#fatalitiesOfOverpopulation
      }

      incrementReproducedCells(){
        ++this.#reproducedCells
      }

      resetStatsPerIteration(){
        this.#deadCellsPerIteration = 0
        this.#livingCellsPerIteration = 0
      }
      
      incrementStatsPerIterationForCell(cell){
        cell.getIsAlive() ? this.incrementLivingCellsPerIteration() : this.incrementDeadCellsPerIteration() 
      }

      updateReasonOfDevelopment(cell){
        if(cell.getIsOverpopulated())
          this.incrementFatalitiesOfOverpopulation()
    
        if(cell.getIsUnderpopulated())
          this.incrementFatalitiesOfUnderpopulation()  
    
        if(cell.getIsReproducing())
          this.incrementReproducedCells()  
      }

      saveAndResetStatsPerIteration(){
        this.saveStatsPerIteration()
        this.resetStatsPerIteration()
      }
    
      saveStatsPerIteration(){
        let currentLivingCells = this.getLivingCellPerIteration()
        this.setPreviousLivingCellsPerIteration(currentLivingCells)
        let currentDeadCells = this.getDeadCellPerIteration()
        this.setPreviousDeadCellsPerIteration(currentDeadCells)
      }

      isCurrentGenEqualToPreviousGen(){
        let currentDeadCells = this.getDeadCellPerIteration()
        let currentLivingCells = this.getLivingCellPerIteration()
        let previousDeadCells = this.getPreviousDeadCellsPerIteration()
        let previousLivingCells = this.getPreviousLivingCellsPerIteration()
        return previousDeadCells == currentDeadCells && previousLivingCells == currentLivingCells
      }
}