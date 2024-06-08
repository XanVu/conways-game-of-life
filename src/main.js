'use strict';
import HtmlHandler from './HtmlHandler';
import Organism from './organism';


    HtmlHandler.registerTabs()
    HtmlHandler.registerControls()


    Organism.initEvolution(40)
    HtmlHandler.initHtmlTable()
  
export default class Test {

    static recursiveLoop(){
        let table = Organism.getTable()

          Organism.validateStock(table)
          Organism.evolveGeneration(table)
          Organism.runHealthCheck()
          Organism.detectRepetition()
          
          HtmlHandler.updateHtmlSpanInTable(table)
          HtmlHandler.setHtmlStatValues()


            
          if(Organism.getHasStarted() && !Organism.getHasStopped() && Organism.getIsAlive() && !Organism.getIsStable() && !Organism.getIsRepeating())
            setTimeout(Test.recursiveLoop, Organism.getInterval())
          
            
    }
}

