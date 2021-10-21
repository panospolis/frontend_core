import React from "react";
import Columns from "../columns";

export default class ListColumns extends Columns {

    renderColumns() {
        let labels = [];
        const {config} = this.props;
        config.labels.forEach((label, idx) => {
            labels.push(<div style={{width: config.fields[idx].width}} key={'label' + idx} id={config.fields[idx].name}>
                <strong>{label}</strong></div>)
        });

        return labels;
    }

}
