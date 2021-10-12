import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import {action, makeObservable, observable, runInAction} from "mobx";

import {StoreContext} from "../../../context/Store";
import {FieldElement} from "./fieldElement";

export default class BaseMultipleFields extends React.Component {
    static contextType = StoreContext
    sharedFields = [];
    fieldsCounter = 0;

    constructor(props) {
        super(props);

        makeObservable(this, {
            sharedFields: observable
        });
        this.addField = this.addField.bind(this);
        this.removeField = this.removeField.bind(this);
    }

    componentDidMount() {
        this.initializeFields();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.values !== this.props.values) {
            this.initializeFields();
        }
    }

    initializeFields() {
        const keyName = this.props.name

        this.removeAllFields();
        if (this.props.values?.[keyName]?.length) {
            this.props.values[keyName].forEach(value => {
                this.addField({}, value.value)
            })
        } else {
            if (this.props.showDefaultField) {
                this.addField();
            }
        }
    }

    removeButton(counter) {
        if (this.props.showRemoveButton) {

            return <a className={'btn btn-danger no-print'} data-id={`${this.props.name}_${counter}`}
                      onClick={this.removeField}>
                <FontAwesomeIcon icon={faTrash}/>
            </a>
        }
        return <div></div>
    }

    @action
    removeField(e) {
        if (this.sharedFields.length > 1 || this.props.allowDeletionOfAllElements) {
            this.sharedFields = this.sharedFields.filter(field => {
                if ((field.id) === (e.currentTarget.dataset.id)) {
                    delete this.context.rootStore.UIStore.formik.initialValues[field.id]
                    delete this.context.rootStore.UIStore.formik.values[field.id]
                    return false;
                }
                return field;
            })
        }
    }

    removeAllFields() {
        this.sharedFields.forEach(field => {
            if (this.context.rootStore.UIStore.formik.values[field.id] || this.context.rootStore.UIStore.formik.values[field.id] === "") {
                delete this.context.rootStore.UIStore.formik.initialValues[field.id]
                delete this.context.rootStore.UIStore.formik.values[field.id]
            }
        });

        runInAction(() => {
            this.sharedFields = [];
        })
    }

    addField(e, value = '') {
        throw new Error('Implement addField function')
    }

    addButton() {
        if (this.props.showAddButton) {
            return <div className={"row d-flex no-print"}>
                <div className={"col-11 mt-3 mb-3"}><a className={"btn btn-success float-right"}
                                                       onClick={this.addField}><FontAwesomeIcon
                    icon={faPlus}></FontAwesomeIcon> {gettext('add')}</a></div>
            </div>
        }
        return null
    }

    addFieldTemplate(label, element) {
        return <div className={"row d-flex"}>
            <div className="col-3 mb-3">
                {label}
            </div>
            <div className={`form-group col-9`}>
                {element}
            </div>
        </div>
    }

    render() {
        //console.log('render')
        return <div>
            {this.sharedFields.map(field => {
                return field.field
            })}
            {this.addButton()}
        </div>

    }
}

BaseMultipleFields.defaultProps =
    {

        showRemoveButton: true,
        showAddButton: true,
        showDefaultField: true,
        allowDeletionOfAllElements: false,
        showLabel: false
    }

BaseMultipleFields.propTypes =
    {
        name: PropTypes.string,
        values: PropTypes.object,
        showRemoveButton: PropTypes.bool,
        showAddButton: PropTypes.bool,
        showDefaultField: PropTypes.bool,
        allowDeletionOfAllElements: PropTypes.bool,
        showLabel: PropTypes.bool,
        fieldLabel: PropTypes.string
    }
