import React from "react";
import PropTypes from "prop-types";
import {observer} from "mobx-react";
import {makeObservable, observable, runInAction} from "mobx";

import {StoreContext} from "../../../context/store";
import MultipleFields from "./multipleFields";
import {SelectField} from "./selectField";


@observer
export default class SelectFieldWithTextField extends React.Component {
    static contextType = StoreContext
    addFields = false;
    selectedValue = "";
    values = []


    constructor(props) {
        super(props);
        makeObservable(this, {
            addFields: observable,
            selectedValue: observable
        });

        this.onSelected = this.onSelected.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const value = this.props.value;
        this.values = this.props.values[this.props.name];
        this.toggle(value)
    }


    toggle(value) {
        let addField = false;
        if (["shared", "other"].includes(value)) {
            addField = true;
        }

        runInAction(() => {
            this.selectedValue = value === '' ? this.props.value : value;
            this.addFields = addField;
        });

        if (this.context.rootStore.UIStore?.formik?.values) {
            this.context.rootStore.UIStore.formik.values[this.props.name] = value;
            //this.context.rootStore.UIStore.formik.initialValues[this.props.name] = value;
            for (const field in this.context.rootStore.UIStore.formik.values ) {
                if(field.includes(this.props.name) && field !== this.props.name) {
                    delete this.context.rootStore.UIStore.formik.values[field];
                    delete this.context.rootStore.UIStore.formik.initialValues[field];
                }
            }
        }
    }

    onSelected(e) {
        const value = e.target.value;
        this.values = [];
        this.toggle(value)
    }

    render() {
        let showRemoveButton = true, showAddButton = true;
        if (this.selectedValue === "other") {
            showRemoveButton = false;
            showAddButton = false;
        }

        let values = {};
        values[this.props.name] = this.values ?? [];
        const language = this.context.rootStore.UIStore.getLanguage();
        return <div>
            <div className="row d-flex">
                <div className="col-3 mb-3">
                    <strong><label className="form-label">{this.props.label}</label></strong>
                </div>
                <div className="col-9 mb-3">
                    <div className="row d-flex">
                        <SelectField value={this.selectedValue} onChange={this.onSelected} id={this.props.name}
                                     name={this.props.name}
                                     options={this.context.rootStore.config.models[language][this.props.config]}/>
                    </div>
                    {this.addFields &&
                        <MultipleFields showLabel={this.props.showLabel} fieldLabel={this.props.textFieldLabel}
                                        showAddButton={showAddButton} showRemoveButton={showRemoveButton}
                                        name={this.props.name} values={values}/>}
                </div>
            </div>
        </div>
    }
}

SelectFieldWithTextField.defaultProps =
    {

        showLabel: false,
        textFieldLabel: ''
    }


SelectFieldWithTextField.propTypes =
    {
        value: PropTypes.string,
        values: PropTypes.object,
        name: PropTypes.string,
        label: PropTypes.string,
        config: PropTypes.string,
        textFieldLabel: PropTypes.string,
        showLabel: PropTypes.bool
    }

