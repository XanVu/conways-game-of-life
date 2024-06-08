'use strict';
import HtmlHandler from './HtmlHandler';
import Organism from './organism';


    HtmlHandler.registerTabs()
    HtmlHandler.registerControls()


    Organism.initEvolution(40)
    HtmlHandler.initHtmlTable()
  
export default class Test {

    static test(){
        let table = Organism.getTable()

          Organism.validateStock(table)
          Organism.evolveGeneration(table)
          Organism.runHealthCheck()
          Organism.detectRepetition()
          
          HtmlHandler.updateHtmlSpanInTable(table)
          HtmlHandler.setHtmlStatValues()

          setTimeout( () => {

            if(Organism.getHasStarted() && !Organism.getHasStopped() && Organism.getIsAlive() && !Organism.getIsStable() && !Organism.getIsRepeating())
                Test.test()
            }, Organism.getInterval())
    }
}

