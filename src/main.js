'use strict';
import controls from './ControlsComponent';
import tableComp from './TableComponent';

loadApp()

// main function to load up all needed classes and set everything up

 function loadApp(){
  controls.loading()
  const d = tableComp.calculateTableDimensions()  
  tableComp.initTable(d.rows, d.columns)  
  tableComp.registerEvents()
 }