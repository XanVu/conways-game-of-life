'use strict';
import Organism from './organism';

let or = new Organism(10)
    
    let tab1 = document.getElementById("tab1")
    let tab2 = document.getElementById("tab2")
    let tab3 = document.getElementById("tab3")

  


    let startButton = document.getElementById("start")

    startButton.addEventListener("click", function(){
            or.setHasStarted(true) 
            or.cycleOfLife() 
    }, false)


    let stopButton = document.getElementById("stop")

    stopButton.addEventListener("click", function(){
            or.setStopped(true) 
    }, false)


    let resetButton = document.getElementById("reset")

    resetButton.addEventListener("click", function(){
            or.resetOrg()
            or.cycleOfLife() 
    }, false)


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
    




