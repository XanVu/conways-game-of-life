'use strict';
import HtmlHandler from './HtmlHandler';
import LoopConditionHandler from './LoopConditionHandler';
import SphereOfLife from './organism';


    HtmlHandler.registerTabs()
    HtmlHandler.registerControls()
    
    SphereOfLife.initEvolution(40)
    HtmlHandler.initHtmlTable()
  
export default class Test {

    static recursiveLoop(){
        let table = SphereOfLife.getTable()

          SphereOfLife.validateStock(table)
          SphereOfLife.evolveGeneration(table)

          LoopConditionHandler.executeHealthCheck()
          LoopConditionHandler.setRepetitionFlag()
          
          HtmlHandler.updateHtmlSpanInTable(table)
          HtmlHandler.setHtmlStatValues()

          if(LoopConditionHandler.isLooping())
            setTimeout(Test.recursiveLoop, SphereOfLife.getInterval())
    }
}

