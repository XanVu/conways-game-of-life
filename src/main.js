'use strict';

import navbar from './NavigationComponent';
import controls from './ControlsComponent';
import tabs from './TabComponent';
import slider from './SliderComponent';
import tableComp from './TableComponent';

loadApp()

 function loadApp(){
    navbar.loadingNavBar()
    tabs.loadingTabs()
    controls.loadingControls()
    slider.loadingSlider()
    tableComp.initTable()
    tabs.refreshStatisticTab()
 }