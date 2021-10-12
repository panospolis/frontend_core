import React from "react";
import {Field} from "formik";
import {runInAction} from "mobx";
import PropTypes from "prop-types";
import {observer} from "mobx-react";


import {FieldElement} from "./fieldElement";
import BaseMultipleFields from "./baseMultipleFields";

@observer
export default class TextFieldWithSelector extends BaseMultipleFields {

    componentDidMount() {
        const keyName = this.props.name

        if (this.props.values?.[keyName]?.length) {
            this.props.values[keyName].forEach(value => {
                this.addField({}, value.value, value.select_value)
            })
        } else {
            this.addField();
        }
    }

    addField(e, value = '', select_value = '') {
        const counter = this.fieldsCounter;
        const options = [];
        this.props.select.values.forEach(option => {
            options.push(<option key={option.value} value={option.value}>{option.label}</option>)
        });
        const id = `${this.props.select.id}_${counter}`;

        const item = {
            id: `${this.props.name}_${counter}`, field: <div key={`${this.props.select.id}_${counter}`}>
                <div className={"row d-flex"}>
                    <div className={`form-group col-11`}>
                        <Field id={id}
                               name={id}
                               value={select_value}
                               className={'form-control'}>
                            {({field, form, meta}) => {
                                if (this.props.select.value || field.value) {
                                    form.initialValues[id] = field.value || this.props.select.value;
                                }
                                return <div>
                                    <select onChange={this.props.select.onChange}
                                            id={id}
                                            name={id}
                                            value={field.value}
                                            className={'form-control'}
                                    >
                                        {options}
                                    </select>
                                    {meta.error &&
                                    <div className="bg-danger form-control text-center text-light">{meta.error}</div>}
                                </div>
                            }}
                        </Field>
                    </div>
                </div>
                <FieldElement type={this.props.field.type} values={this.props.field.values}
                              name={`${this.props.field.id}_${counter}`} id={`${this.props.field.id}_${counter}`}
                              value={value}>
                    <div className={"col-1"}>
                        {this.removeButton(counter)}
                    </div>
                </FieldElement>
            </div>
        };
        runInAction(() => {
            this.sharedFields.push(item);
        });
        this.fieldsCounter++;
    }

}


TextFieldWithSelector.propTypes =
    {
        name: PropTypes.string,
        select: PropTypes.shape({
            id: PropTypes.string,
            values: PropTypes.array,
            value: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string]),
            onChange: PropTypes.func
        }),
        field: PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.string,
            type: PropTypes.string
        }),
    }