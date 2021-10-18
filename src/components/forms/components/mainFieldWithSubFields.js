import React from "react";
import {observer} from "mobx-react";
import {makeObservable, observable, runInAction} from "mobx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

import {StoreContext} from "../../../context/Store";
import PropTypes from "prop-types";
import {FieldElement} from "./fieldElement";
import OrganizationsTextFieldWithField from "../../../components/organizationsTextFieldWithField";

@observer
export default class MainFieldWithSubFields extends React.Component {
    static contextType = StoreContext
    selectedActor = "";

    constructor(props) {
        super(props);

        makeObservable(this, {
            selectedActor: observable
        });

        this.showActorFields = this.showActorFields.bind(this);
        this.selectedFieldsByActor = this.selectedFieldsByActor.bind(this);
    }

    componentDidMount() {
        runInAction(() => {
            this.selectedActor = this.props.actorsData[0].value;
        })
    }

    showActorFields() {
        const totalItems = [];

        const fields = [
            {
                textField: 'men_:id'
            },
            {
                textField: 'women_:id'
            }
        ]

        this.props.actorsData.forEach(actor => {
            const items = [];
            items.push(<div key={`${actor.value}_actors`} className={"col-6 mb-3"}>
                {actor.label}
            </div>)
            fields.forEach((field, idx) => {
                const selectField = field.textField.replace(':id', `${parseInt(actor.value)}`);
                items.push(<div className={"col-3 mb-3"} key={`${actor.value}_${idx}`}>
                    <FieldElement id={selectField} name={selectField} type={"number"} value={"0"}/>
                </div>);
            });
            totalItems.push(<div key={`container-${actor.value}`} className={"row d-flex"}>{items}</div>);
        });
        return totalItems;
    }

    selectedFieldsByActor(e) {
        runInAction(() => {
            this.selectedActor = e.target.value;
        })
    }

    customFields() {
        const custom = [];
        const actors = [<div key={"columns"} className={"row mb-4"}>
            <div className={"col"}><strong>{gettext('Column')}</strong></div>
        </div>];
        const fields = [{
            id: `extra_field`,
            value: '',
            type: 'text',
            label: ''
        }]

        this.props.actorsData.forEach(item => {
            fields.push({
                id: `extra_value_${item.value}`,
                value: '',
                type: 'number',
                label: ''
            })
            actors.push(<div key={`${item.value}_x`} className={"row mb-3"}>
                <div className={"col label-control"}>{item.label}</div>
            </div>)
        })

        custom.push(<OrganizationsTextFieldWithField allowDeletionOfAllElements={true} key={"custom"} name={"organizations_groups_fields"} showIndexing={false} values={this.props.values}
                                                     fields={fields}


        >
            <div className={"col-4 mb-4"}>{actors}</div>
        </OrganizationsTextFieldWithField>);

        return <div className={"row"}>{custom}</div>;
    }


    render() {
        return <div key={`a_total}`}>
            <div className={"row d-flex"}>
                <div className={"col"}>
                    <div className="row d-flex">
                        <div className="col-6 mb-3">
                            <strong><label
                                className="form-label">{gettext('Actor groups and their members')}</label></strong>
                        </div>
                        <div className="col-3 mb-3">
                            <strong><label
                                className="form-label">{gettext('Men')}</label></strong>
                        </div>
                        <div className="col-3 mb-3">
                            <strong><label
                                className="form-label">{gettext('Women')}</label></strong>
                        </div>
                    </div>
                    {this.showActorFields()}
                </div>
            </div>
            <div className={"row d-flex mb-5"}>
                <div className={"col"}>
                    <div className="bg-info">
                        <div className="info-question  text-white">
                            <div className={"info-left"}><i className={""}><FontAwesomeIcon
                                icon={faInfoCircle}></FontAwesomeIcon>
                            </i>
                            </div>
                            <div className={"info-right"}>
                                <div
                                    className={"col"}>{gettext('You can add more columns based on other social differences, including ethnicity, age, etc. as relevant to the assessment')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {this.customFields()}

        </div>
    }

}

Organizations.propTypes =
    {
        actorsData: PropTypes.array,
        values: PropTypes.object,
    }