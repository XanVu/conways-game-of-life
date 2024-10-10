'use strict';
import controls from './ControlsComponent';
import tableComp from './TableComponent';

loadApp()

/*
A function to load up all need components and register all
events. Basically the main method.

Additionally, this function calculates the dimension of the grid
according to the available screen size.
Before initilising the first grid
*/ 
 function loadApp(){
  controls.loading()
  const d = tableComp.calculateTableDimensions()  
  tableComp.initTable(d.rows, d.columns)  
  tableComp.registerEvents()
}