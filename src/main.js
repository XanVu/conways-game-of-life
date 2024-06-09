'use strict';
import HtmlHandler from './HtmlHandler';
import live from './Live';

    HtmlHandler.registerTabs()
    HtmlHandler.registerControls()
    live.startingLive()

    HtmlHandler.initHtmlTable()
  
export default class Test {

    static recursiveLoop(){
        let table = live.getTable()

          live.validateStock(table)
          live.evolveGeneration(table)

          live.conditionValidator.executeHealthCheck()
          live.conditionValidator.setRepetitionFlag()
          
          HtmlHandler.updateHtmlSpanInTable(table)
          HtmlHandler.setHtmlStatValues()

          if(live.conditionValidator.isLooping())
            setTimeout(Test.recursiveLoop, live.getInterval())
    }
}

