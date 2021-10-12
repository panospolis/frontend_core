import React from "react";
import {runInAction} from "mobx";
import PropTypes from "prop-types";
import {observer} from "mobx-react";

import {FieldElement} from "./fieldElement";
import BaseMultipleFields from "./baseMultipleFields";
import SelectFieldWithTextField from "./selectFieldWithTextField";

@observer
export default class TextFieldWithTextField extends BaseMultipleFields {

    componentDidMount() {
        const keyName = this.props.name

        if (this.props.values?.[keyName]?.length) {
            this.props.values[keyName].forEach(value => {
                this.addField({}, value.value, value.value2)
            })
        } else {
            this.addField();
        }
    }

    showIndexing(index){
        if(this.props.showIndexing){
            return `${index + 1}.`;
        }
        return "";
    }

    showLabel(counter, label){
        if(label === ""){
            return "";
        }
        return <strong><label
            className="form-label">{this.showIndexing(counter)} {label}</label></strong>
    }

    addField(e, value = '', value2 = '') {
        const counter = this.fieldsCounter;


        const item = {
            id: `${this.props.name}_${counter}`, field: <div key={`${this.props.field1.id}_${counter}`}>
                {this.addFieldTemplate(this.showLabel(counter, this.props.field2.label), <FieldElement type={this.props.field2.type} values={this.props.field2.values}
                                                                                                                    name={`${this.props.field2.id}_${counter}`}
                                                                                                                    id={`${this.props.field2.id}_${counter}`} value={value2}>

                </FieldElement>)}
                {this.addFieldTemplate(this.showLabel(counter, this.props.field1.label), <FieldElement type={this.props.field1.type} values={this.props.field1.values}
                                                                                                                    name={`${this.props.field1.id}_${counter}`}
                                                                                                                    id={`${this.props.field1.id}_${counter}`} value={value}>
                    <div className={"col-1"}>
                        {this.removeButton(counter)}
                    </div>
                </FieldElement>)}
            </div>
        };
        runInAction(() => {
            this.sharedFields.push(item);
        });
        this.fieldsCounter++;
    }

}

SelectFieldWithTextField.defaultProps =
    {

        showIndexing: true
    }


TextFieldWithTextField.propTypes =
    {
        showIndexing:PropTypes.bool,
        name: PropTypes.string,
        field2: PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.string,
            type: PropTypes.string
        }),
        field1: PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.string,
            type: PropTypes.string
        }),
    }