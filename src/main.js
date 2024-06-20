'use strict';
import navbar from './NavigationComponent';
import controls from './ControlsComponent';
import table from './TableComponent'
import tableHandler from './TableHandler';
import statisticComponent from './StatisticComponent';


navbar.loadingNavBarAndTabs()
controls.loadingControls()
tableHandler.createTableAndConfig()
table.initializeTable()
statisticComponent.loadStatisticTab()

