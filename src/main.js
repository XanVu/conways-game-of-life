'use strict';
import presentationHandler from './OrganismPresentationHandler';
import organism from "./Organism.js";

presentationHandler.registerTabs()
presentationHandler.registerControls()
presentationHandler.registerSlider()
    
presentationHandler.initHtmlTable()
  
export default class Test {

    static recursiveLoop(){

        let live = organism

        let table = organism.getTable()

          live.validateStock(table)
          live.evolveGeneration(table)

          live.conditionValidator.executeHealthCheck()
          live.conditionValidator.setRepetitionFlag()
          
          presentationHandler.updateHtmlSpanInTable(table)
          presentationHandler.setHtmlStatValues()

          if(live.conditionValidator.isLooping())
            setTimeout(Test.recursiveLoop, live.getInterval())
    }
}

