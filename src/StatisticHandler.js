
export default class StatisticHandler {
    #generation = 0
    #currentLivingCells = 0
    #overallLivingCells = 0
    #fatalitiesOfOverpopulation = 0
    #fatalitiesOfUnderpopulation = 0
    #resurrectedCells = 0
    #cachedLivingCells = 0 

    constructor(){
    }

    getGeneration(){
        return this.#generation
    }
  
    getCurrentLivingCells(){
      return this.#currentLivingCells
    }

    #getOverallLivingCells(){
      return this.#overallLivingCells
    }

      #getFatalitiesOfOverpopulation(){
        return this.#fatalitiesOfOverpopulation
      }
  
      #getFatalitiesOfUnderpopulation(){
        return this.#fatalitiesOfUnderpopulation
      }
  
      #getResurrectedCells(){
        return this.#resurrectedCells
      }

      #getCachedLivingCells(){
        return this.#cachedLivingCells
      }

      #setLivingCells(value){
        this.#currentLivingCells = value
      }

      #accumulateOverallLivingCells(value){
        this.#overallLivingCells += value
      }

      setCachedLivingCells(pervious){
        this.#cachedLivingCells = pervious
      }

    #incrementGeneration(){
      ++this.#generation
    }

      #setFatalitiesOfUnderpopulation(value){
        this.#fatalitiesOfUnderpopulation = value
      }

      #setFatalitiesOfOverpopulation(value){
        this.#fatalitiesOfOverpopulation = value
      }

      #setResurrectedCells(value){
        this.#resurrectedCells = value
      }

      resetCurrentLivingCells(){
        this.#currentLivingCells = 0
      }

      #cacheCurrentLivingCells(){
        let currentLivingCells = this.getCurrentLivingCells()
        this.setCachedLivingCells(currentLivingCells)
      }

      #compareLivingCellsForRepetition(){
        let currentLivingCells = this.getCurrentLivingCells()
        let previousLivingCells = this.#getCachedLivingCells()
        return previousLivingCells == currentLivingCells
      }      
  
      getCurrentStatistics(){
        let dataStructureForComponent = {
          generation: this.getGeneration(),
          overallLivingCells: this.#getOverallLivingCells(),
          fatalitiesOfOverpopulation: this.#getFatalitiesOfOverpopulation(),
          fatalitiesOfUnderpopulation: this.#getFatalitiesOfUnderpopulation(),
          resurrectedCells: this.#getResurrectedCells(),
        }

        this.resetCurrentLivingCells()
        return dataStructureForComponent
      }

      #setStaticalDataFromTableHandler(acc){
        let currentLivingCells = acc.currentLivingCells
        this.#setLivingCells(currentLivingCells)
        this.#setFatalitiesOfOverpopulation(acc.deathsByOverpopulation)
        this.#setFatalitiesOfUnderpopulation(acc.deathsByUnderpopulation)
        this.#setResurrectedCells(acc.resurrectedCells)
        this.#accumulateOverallLivingCells(currentLivingCells)
        this.#incrementGeneration()
      }

      getAccumulator(){
        let accumulators = {
          currentLivingCells: this.getCurrentLivingCells(),
          deathsByOverpopulation: this.#getFatalitiesOfOverpopulation(),
          deathsByUnderpopulation: this.#getFatalitiesOfUnderpopulation(),
          resurrectedCells: this.#getResurrectedCells(),

          incrementLivingCells(){
            this.currentLivingCells += 1
          },

          incrementDeathsByOverpopulation(){
            this.deathsByOverpopulation += 1
          },

          incrementDeathsByUnderpopulation(){
            this.deathsByUnderpopulation += 1
          },

          incrementRessurectedCells(){
            this.resurrectedCells += 1
          }
        }
        return accumulators
      }

      processDataAndComputeCondition(acc){
        this.#setStaticalDataFromTableHandler(acc)
        return this.#validateRepetitionAndCache()
      }

      #validateRepetitionAndCache(){
        let isRepeating = this.#compareLivingCellsForRepetition()
        this.#cacheCurrentLivingCells()
        return isRepeating
      }
}