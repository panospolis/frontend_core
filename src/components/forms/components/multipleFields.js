import React from "react";
import {runInAction} from "mobx";
import {observer} from "mobx-react";

import {FieldElement} from "./fieldElement";
import BaseMultipleFields from "./baseMultipleFields";

@observer
export default class MultipleFields extends BaseMultipleFields {
    defaultFields = ["_women", "_men"];

    componentDidMount() {
        let name = this.props.name;
        this.defaultFields.forEach(value => {
            name = name.replace(value, '');
        });
        const keyName = name;
        if (this.props.values?.[keyName]?.length) {
            this.props.values[keyName].forEach(value => {
                if (value.types && this.defaultFields.includes(`_${value.types.toLowerCase()}`)) {
                    if (this.props.name.includes(`_${value.types.toLowerCase()}`)) {
                        this.addField({}, value.value)
                    }
                } else {
                    this.addField({}, value.value)
                }
            })
        } else {
            if (this.props.showDefaultField) {
                this.addField();
            }
        }
    }

    addField(e, value = '') {
        const counter = this.fieldsCounter;
        const id = this.sharedFields.length;

        runInAction(() => {
            this.sharedFields.push({
                id: `${this.props.name}_${counter}`, field: <div key={`${this.props.name}_${counter}`}>
                    {this.props.showLabel && <div className="row d-flex">
                        <div className={"col-11"}>
                            <label className="form-label">{this.props.fieldLabel}</label>
                        </div>
                    </div>}
                    <FieldElement key={id} name={`${this.props.name}_${counter}`} value={value}>
                        <div className={"col-1"}>
                            {this.removeButton(counter)}
                        </div>
                    </FieldElement>
                </div>
            });
        });
        this.fieldsCounter++;
    }

}

