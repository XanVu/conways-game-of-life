'use strict';

import navbar from './NavigationComponent';
import controls from './ControlsComponent';
import tabs from './TabComponent';
import slider from './SliderComponent';
import tableComp from './TableComponent';

loadApp()

 function loadApp(){
   navbar.loadingNavBar() 
   slider.loadingSlider()
   controls.loadingControls() 
   tableComp.initTable()
   tableComp.resizeEvent()
   tabs.loadingTabs()
 }