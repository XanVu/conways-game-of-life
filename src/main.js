'use strict';
import HtmlHandler from './HtmlHandler';
import Organism from './organism';


    HtmlHandler.registerTabs()
    HtmlHandler.registerControls()


    Organism.initEvolution(40)
    HtmlHandler.initHtmlTable()
  
export default class Test {

    static async test(){
        let table = Organism.getTable()

        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

        while(Organism.getHasStarted() && !Organism.getHasStopped() && Organism.getIsAlive() && !Organism.getIsStable() && !Organism.getIsRepeating()){   
                      
          Organism.validateStock(table)
          Organism.evolveGeneration(table)
        
          await sleep(Organism.getInterval())

          Organism.runHealthCheck()
          Organism.detectRepetition()
          
          HtmlHandler.updateHtmlSpanInTable(table)
          HtmlHandler.setHtmlStatValues()
        }  
    }
}

