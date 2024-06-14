'use strict';
import navbar from './NavigationComponent';
import controls from './ControlsComponent';
import TableExtentions from './TableExtensions';
import table from './TableComponent'
import organism from './Organism';
import statisticComponent from './StatisticComponent';


navbar.loadingNavBarAndTabs()
controls.loadingControls()
organism.initializeTable()
table.initializeTable()
statisticComponent.loadStatisticTab()

