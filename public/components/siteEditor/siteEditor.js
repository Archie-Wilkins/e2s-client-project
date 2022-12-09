import React from "react";
import {TabulatorFull as Tabulator} from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import SiteEditorAdapter from "./siteEditorAdapter.js";
import TableFactory from "./tableFactory.js";

// https://tabulator.info/docs/5.4/frameworks#react

class SiteEditor extends React.Component{

    constructor(props) {
        super();
        this.state = {
            siteEditorAdapter : new SiteEditorAdapter(1),
            tableFactory : new TableFactory()
        }
        this.siteObjectData = this.state.siteEditorAdapter.formatDataForSiteEditor();
    }

    reactRef = React.createRef();
    // TODO: If site object data is none, return an error message

    componentDidMount() {

        let table = this.state.tableFactory.createSiteEditorTable(this.siteObjectData, this.reactRef);
        if (table == null){
            return null;
        }

    }

        // ComponetDidMount is called after the component is rendered. This is where the table should be initialized.

    render() {
        return <div ref={reactRef => (this.reactRef = reactRef)}></div>
    }
}

export default SiteEditor
