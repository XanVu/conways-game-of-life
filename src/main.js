'use strict';
import navbar from './NavigationComponent';
import controls from './ControlsComponent';
import table from './TableComponent'
import tableHandler from './TableHandler';
import tabs from './TabComponent';
import slider from './SliderComponent';

loadApp()

 function loadApp(){
    navbar.loadingNavBar()
    tabs.loadingTabs()
    controls.loadingControls()
    slider.loadingSlider()
    tableHandler.createTableAndConfig(table.addRow.bind(table), table.addCell.bind(table))
    tabs.refreshStatisticTab()
 }