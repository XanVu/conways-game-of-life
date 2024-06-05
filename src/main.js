'use strict';
import Organism from './organism';





    let tab1 = document.getElementById("tab1")
    let tab2 = document.getElementById("tab2")
    let tab3 = document.getElementById("tab3")
   
    let startButton = document.getElementById("start")

    startButton.addEventListener("click", function(){
        Organism.setHasStarted(true)
        test()
    }, false)


    let stopButton = document.getElementById("stop")

    stopButton.addEventListener("click", function(){
        Organism.setStopped(true) 
    }, false)


    let resetButton = document.getElementById("reset")

    let stats = document.getElementById("Stats")
    let rules = document.getElementById("Rules")
    let settings = document.getElementById("Definition")



    tab1.addEventListener("click", function(){
        if(stats.style.display === "none"){
            stats.style.display = "block" 
        }
        else
        stats.style.display = "none"
    }, false)

    tab2.addEventListener("click", function(){
        if(rules.style.display === "none"){
            rules.style.display = "block" 
        }
        else
        rules.style.display = "none"
    }, false)

    tab3.addEventListener("click", function(){
        if(settings.style.display === "none"){
            settings.style.display = "block" 
        }
        else
        settings.style.display = "none"
    }, false)
    


    
Organism.setSize(10)
let size = Organism.getSize()
Organism.initTable()    
let table = Organism.getTable()
Organism.startingLive(table)
Organism.initHtmlTable(table, size)


  


    async function test(){

    var organismIsDead = false
    
    

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
    

        while(!organismIsDead && Organism.getHasStarted() && !Organism.getHasStopped() && !Organism.getIsStable()){   
          let table = Organism.getTable()
          Organism.validateStock(table)
          Organism.evolveGeneration(table)
          Organism.updateHtmlSpanInTable(table)
          Organism.setHtmlStatValues()
    
          if(Organism.getLivingCellPerIteration() == 0){
            organismIsDead = true
          }
          
          await sleep(Organism.getInterval())
    
          Organism.setIteration()
          Organism.resetIterationCounter();
        }  
    }


