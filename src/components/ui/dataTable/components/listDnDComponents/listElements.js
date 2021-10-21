import React from "react";
import {observer} from 'mobx-react';
import Elements from "../elements";

@observer
export default class ListElements extends Elements {


    renderFields(record) {
        let fields = [];
        const {config} = this.props;
        config.fields.forEach((field, idx) => {
            if (field.name === 'id') {
                fields.push(<div className={"align-middle"}  style={{width: field.width}} key={"field" + idx}>{record[field.name]}</div>)
            } else {
                fields.push(<div className={"align-middle"} key={"field" + idx} style={{width: field.width}}>{record[field.name]}</div>)
            }
        });

        return fields;
    }

    actions(record) {
        const extraAction = this.props.extraActions(record);
        return <div className={"col no-print"}>
            {this.deleteAction(record)}
            {extraAction}
        </div>
    }

    renderItems() {
        let items = [];
        const {records} = this.props;
        records.forEach((record, idx) => {
            items.push(<div
                className="row default-zone-element" key={"list" + idx}>
                {this.renderFields(record)}
                {this.actions(record)}
            </div>)
        })
        return items;
    }
}