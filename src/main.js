'use strict';
import controls from './ControlsComponent';
import tabs from './TabComponent';
import tableComp from './TableComponent';

loadApp()

 function loadApp(){
  controls.loading()
  tabs.loading()  
  const d = tableComp.calculateTableDimensions()  
  tableComp.initTable(d.rows, d.columns)  
  tableComp.buildStatusContainer()
  tableComp.registerEvents()
  tableComp.resizeEvent()
 }