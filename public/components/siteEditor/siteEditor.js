import React from "react";
import {TabulatorFull as Tabulator} from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import SiteEditorAdapter from "./siteEditorAdapter";
import TableFactory from "./tableFactory";

// https://tabulator.info/docs/5.4/frameworks#react

class SiteEditor extends React.Component{

    reactRef = React.createRef();

    componentDidMount() {

        var siteEditorAdapter = new SiteEditorAdapter();
        var tableFactory = new TableFactory();
        var siteObjectData = siteEditorAdapter.formatDataForSiteEditor();
        var table = tableFactory.createSiteEditorTable(siteObjectData, this.reactRef);
        table.redraw(true);

    }

        // ComponetDidMount is called after the component is rendered. This is where the table should be initialized.

    render() {
        return <div ref={reactRef => (this.reactRef = reactRef)}></div>
    }
}

export default SiteEditor
