import React from "react";
import {observer} from "mobx-react";
import TextFieldWithTextField from "./textFieldWithTextField";
import {FieldElement} from "./fieldElement";
import {runInAction} from "mobx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

@observer
export default class OrganizationsTextFieldWithField extends TextFieldWithTextField {

    addFieldTemplate(label, element, id) {
        return <div key={`elem-${id}`}>
            {element}
        </div>

    }

    componentDidMount() {
        const keyName = this.props.name
        if (this.props.values?.[keyName]?.length) {
            this.props.values[keyName].forEach(value => {
                this.addField({}, value)
            })
        } else {
            //this.addField();
        }
    }

    addField(e, fields = []) {
        const counter = this.fieldsCounter;
        const ids = [];
        let item = {id: `${this.props.name}_${counter}`, field: [], counter: counter, keys: []};
        const items = [];
        const parseFields = fields.length ? fields : this.props.fields
        parseFields.forEach((field, id) => {
            const name = field.itemVal ? field.id : `${field.id}_${counter}`
            if (field.itemVal) {
                ids.push(field.itemVal);
            }
            items.push(this.addFieldTemplate('', <FieldElement classValue={"col-10 mb-3"} key={`ell-${id}`}
                                                               type={field.type}
                                                               name={name}
                                                               id={name} value={`${field.value}`}>
                <div className={"col-1"}>
                    {id === parseFields.length - 1 && this.removeButton(counter)}
                </div>

            </FieldElement>, id))
            item.keys.push(name)
        })
        item.field.push(this.props.children);
        item.field.push(<div key={`item-${counter}`} className={"col-4 mb-4"}>
            {items}
        </div>)
        item.field.push(<div key={`empty-${counter}`} className={"col-4 mb-4"}></div>)

        runInAction(() => {
            this.sharedFields.push(item);
        });

        if (ids.length) {
            const maxNumber = Math.max(...ids);
            this.fieldsCounter = maxNumber + 1;
        } else {
            this.fieldsCounter++;
        }
    }

    addButton() {
        if (this.props.showAddButton) {
            return <div className={"col-8 d-flex no-print"}>
                <div className={"col-11 mt-3 mb-3"}><a className={"btn btn-success float-right"}
                                                       onClick={this.addField}><FontAwesomeIcon
                    icon={faPlus}></FontAwesomeIcon> {gettext('add')}</a></div>
            </div>
        }
        return null
    }

    removeField(e) {
        if (this.props.allowDeletionOfAllElements) {
            this.sharedFields = this.sharedFields.filter(field => {
                if ((field.id) === (e.currentTarget.dataset.id)) {
                    field.keys.forEach(key => {
                        delete this.context.rootStore.UIStore.formik.initialValues[key]
                        delete this.context.rootStore.UIStore.formik.values[key]
                    })
                    return false;
                }
                return field;
            })
        }
    }

    render() {
        return <>
            {this.sharedFields.map(field => {
                return field.field
            })}
            {this.addButton()}
        </>

    }
}
