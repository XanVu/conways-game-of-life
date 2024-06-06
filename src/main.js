'use strict';
import HtmlHandler from './HtmlHandler';
import Organism from './organism';


    HtmlHandler.registerTabs()
    HtmlHandler.registerControls()


    let table = Organism.initEvolution(50)
    HtmlHandler.initHtmlTable(table, 50)
  
export default class Test {

    static async test(){
        let table = Organism.getTable()

        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

        while(Organism.getIsAlive() && Organism.getHasStarted() && !Organism.getHasStopped() && !Organism.getIsStable() && !Organism.getIsRepeating()){   
          
          Organism.setPreviousIterationStatsCounter()
          Organism.resetIterationStatsCounter();
          
          Organism.validateStock(table)
          Organism.evolveGeneration(table)
        
          HtmlHandler.updateHtmlSpanInTable(table)
          HtmlHandler.setHtmlStatValues()
             
          await sleep(Organism.getInterval())

          Organism.detectRepetition()
          Organism.setIteration()
        }  
    }
}

