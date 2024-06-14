import table from './TableComponent';
import statisticComponent from './StatisticComponent';
import organism from './Organism';


export default class TableExtentions {
    
    static resetTable(){
    table.deleteTableAndResetData()
    statisticComponent.loadStatisticTab()
    }

    static reloadTable(){
        organism.setRowDepth(10)
        organism.setColumnDepth(10)
        TableExtentions.resetTable()
    }
}