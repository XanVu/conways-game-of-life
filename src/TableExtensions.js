import tableComp from './TableComponent';
import statisticComponent from './StatisticComponent';
import organism from './TableHandler';


export default class TableExtentions {
    
    static resetTable(){
    tableComp.deleteTableAndResetData()
    statisticComponent.createStatPresentation()
    }

    static reloadTable(){
        organism.setRowDepth(10)
        organism.setColumnDepth(10)
        TableExtentions.resetTable()
    }
}