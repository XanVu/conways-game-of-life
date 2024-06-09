export default class StatisticHandler {
    static #iteration = 0
    static #livingCellsPerIteration = 0
    static #deadCellsPerIteration = 0
    static #fatalitiesOfOverpopulation = 0
    static #fatalitiesOfUnderpopulation = 0
    static #reproducedCells = 0

    static #previousLivingCellsPerIteration = 0
    static #previousDeadCellsPerIteration = 0

    static getIteration(){
        return this.#iteration
      }
  
      static getLivingCellPerIteration(){
        return this.#livingCellsPerIteration
      }
  
      static getDeadCellPerIteration(){
        return this.#deadCellsPerIteration
      }
  
      static getFatalitiesOfOverpopulation(){
        return this.#fatalitiesOfOverpopulation
      }
  
      static getFatalitiesOfUnderpopulation(){
        return this.#fatalitiesOfUnderpopulation
      }
  
      static getReproducedCells(){
        return this.#reproducedCells
      }

      static getPreviousLivingCellsPerIteration(){
        return this.#previousLivingCellsPerIteration
      }
  
      static getPreviousDeadCellsPerIteration(){
        return this.#previousDeadCellsPerIteration
      }


      static setPreviousLivingCellsPerIteration(pervious){
        this.#previousLivingCellsPerIteration = pervious
      }
  
      static setPreviousDeadCellsPerIteration(pervious){
        this.#previousDeadCellsPerIteration = pervious
      }

      static incrementIteration(){
        ++this.#iteration
      }

      static incrementFatalitiesOfUnderpopulation(){
        ++this.#fatalitiesOfUnderpopulation
      }

      static incrementLivingCellsPerIteration(){
        ++this.#livingCellsPerIteration
      }

      static incrementDeadCellsPerIteration(){
        ++this.#deadCellsPerIteration
      }

      static incrementFatalitiesOfUnderpopulation(){
        ++this.#fatalitiesOfUnderpopulation
      }

      static incrementFatalitiesOfOverpopulation(){
        ++this.#fatalitiesOfOverpopulation
      }

      static incrementReproducedCells(){
        ++this.#reproducedCells
      }

      static resetStatsPerIteration(){
        this.#deadCellsPerIteration = 0
        this.#livingCellsPerIteration = 0
      }
      
      static incrementStatsPerIterationForCell(cell){
        cell.getIsAlive() ? this.incrementLivingCellsPerIteration() : this.incrementDeadCellsPerIteration() 
      }

      static updateReasonOfDevelopment(cell){
        if(cell.getIsOverpopulated())
          this.incrementFatalitiesOfOverpopulation()
    
        if(cell.getIsUnderpopulated())
          this.incrementFatalitiesOfUnderpopulation()  
    
        if(cell.getIsReproducing())
          this.incrementReproducedCells()  
      }

      static saveAndResetStatsPerIteration(){
        this.saveStatsPerIteration()
        this.resetStatsPerIteration()
      }
    
      static saveStatsPerIteration(){
        let currentLivingCells = this.getLivingCellPerIteration()
        this.setPreviousLivingCellsPerIteration(currentLivingCells)
        let currentDeadCells = this.getDeadCellPerIteration()
        this.setPreviousDeadCellsPerIteration(currentDeadCells)
      }

      static isCurrentGenEqualToPreviousGen(){
        let currentDeadCells = StatisticHandler.getDeadCellPerIteration()
        let currentLivingCells = StatisticHandler.getLivingCellPerIteration()
        let previousDeadCells = StatisticHandler.getPreviousDeadCellsPerIteration()
        let previousLivingCells = StatisticHandler.getPreviousLivingCellsPerIteration()
        return previousDeadCells == currentDeadCells && previousLivingCells == currentLivingCells
      }
}