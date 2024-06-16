
let instance

export default class StatisticHandler {
    static repetitionThreshold = 5
    #rowDimensions
    #columnDimensions
    #repetitionCounter
    #iteration
    #livingCellsPerIteration
    #fatalitiesOfOverpopulation
    #fatalitiesOfUnderpopulation
    #reproducedCells
    #previousLivingCellsPerIteration

    constructor(rowLength, colLength){
      if (instance)
        throw new Error("Singleton")
      
      this.#rowDimensions = rowLength
      this.#columnDimensions = colLength

      this.initToDefault()

      instance = this;
    }

    initToDefault(){
      this.#repetitionCounter = 0
      this.#iteration = 1
      this.#livingCellsPerIteration = 0
      this.#fatalitiesOfOverpopulation = 0
      this.#fatalitiesOfUnderpopulation = 0
      this.#reproducedCells = 0
      this.#previousLivingCellsPerIteration = 0
    }

    getCurrentStatistics(){
      const data = {
        iteration: this.getIteration(),
        livingCellsPerIteration:  this.getLivingCellsPerIteration(),
        deadCellsPerIteration: this.calculateDeadCells(),
        fatalitiesOfOverpopulation: this.getFatalitiesOfOverpopulation(),
        fatalitiesOfUnderpopulation: this.getFatalitiesOfUnderpopulation(),
        reproducedCells: this.getReproducedCells(),
      }
      return data
    }

    getRowDimensions(){
      return this.#rowDimensions
    }

    getColumnDimensions(){
      return this.#columnDimensions
    }

    getRepetitionCounter(){
      return this.#repetitionCounter
  }

    getIteration(){
        return this.#iteration
    }
  
    getLivingCellsPerIteration(){
      return this.#livingCellsPerIteration
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
  
      setPreviousLivingCellsPerIteration(pervious){
        this.#previousLivingCellsPerIteration = pervious
      }

      setRowDimension(value){
        this.#rowDimensions = value
      }

      setColumnDimension(value){
        this.#columnDimensions = value
      } 

      


    resetRepetitionCounter(){
        this.#repetitionCounter = 0
    }

    incrementRepetitionCounter(){
        ++this.#repetitionCounter
    }

    #incrementIteration(){
      ++this.#iteration
    }

      incrementFatalitiesOfUnderpopulation(){
        ++this.#fatalitiesOfUnderpopulation
      }

      incrementLivingCellsPerIteration(){
        ++this.#livingCellsPerIteration
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
        this.#livingCellsPerIteration = 0
      }
      
      incrementStatsPerIterationForCell(isCellAlive){
        if(isCellAlive)
           this.incrementLivingCellsPerIteration()
      }

      updateReasonOfDevelopment(cell){
        if(cell.getIsOverpopulated())
          this.incrementFatalitiesOfOverpopulation()
    
        if(cell.getIsUnderpopulated())
          this.incrementFatalitiesOfUnderpopulation()  
    
        if(cell.getIsReproducing())
          this.incrementReproducedCells()
        
        if(cell.getIsAlive())
          this.incrementLivingCellsPerIteration()
      }

      saveAndResetStatsPerIteration(){
        this.saveStatsPerIteration()
        this.resetStatsPerIteration()
      }
    
      saveStatsPerIteration(){
        let currentLivingCells = this.getLivingCellsPerIteration()
        this.setPreviousLivingCellsPerIteration(currentLivingCells)
        this.#incrementIteration()
      }

      handleRepetitionCounter(){
        let currentLivingCells = this.getLivingCellsPerIteration()
        let previousLivingCells = this.getPreviousLivingCellsPerIteration()
        previousLivingCells == currentLivingCells ? this.incrementRepetitionCounter() : this.resetRepetitionCounter()
        return this.getRepetitionCounter()
      }      

      calculateDeadCells(){
       return (this.getRowDimensions() * this.getColumnDimensions()) - this.getLivingCellsPerIteration()
      }
}