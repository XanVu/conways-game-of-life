'use strict';
import HtmlHandler from './HtmlHandler';
import Organism from './organism';


    HtmlHandler.registerTabs()
    HtmlHandler.registerControls()


    let table = Organism.initEvolution(10)
    HtmlHandler.initHtmlTable(table, 10)


  
export default class Test {

    static async test(){

        let repetitionCounter = 0

        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

        while(Organism.getIsAlive() && Organism.getHasStarted() && !Organism.getHasStopped() && !Organism.getIsStable() && !Organism.getIsRepeating()){   
          let table = Organism.getTable()
          
          let x = Organism.getDeadCellPerIteration()
          let y = Organism.getLivingCellPerIteration()
          
          Organism.validateStock(table)
          Organism.evolveGeneration(table)
        
          if(Organism.getLivingCellPerIteration() == 0){
            Organism.setIsRepeating(true)
          }
          
          HtmlHandler.updateHtmlSpanInTable(table)
          HtmlHandler.setHtmlStatValues()
             
          await sleep(Organism.getInterval())
    
          let x1 = Organism.getDeadCellPerIteration()
          let y1 = Organism.getLivingCellPerIteration()  


          console.log("dead be " + x1)
          console.log("dead : " + x)
          console.log(y1)
          console.log(y)



          if(x == x1 && y == y1){
            ++repetitionCounter
          }

    

          if(repetitionCounter > 3){
            Organism.setIsRepeating(true)
          }
        
          Organism.setIteration()
          Organism.resetIterationStatsCounter();

        }  
    }
}

