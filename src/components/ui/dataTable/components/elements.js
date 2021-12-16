import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StoreContext} from "../../../../context/Store";
import {observer} from 'mobx-react';
import DeleteModal from "../../modals/deleteModal";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import InteractButton from "../../interactButtons";

@observer
export default class Elements extends Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);
        this.renderFields = this.renderFields.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
    }

    getValue(value, type = null) {
        if (value === true || (type === 'boolean' && value === 1)) {
            return gettext('Yes')
        } else if (value === false || (type === 'boolean' && value === 0)) {
            return gettext('No')
        } else if (type === 'object') {
            return value.name
        }

        return value;
    }

    renderFields(record) {
        let fields = [];
        const {config} = this.props;
        debugger;
        config.fields.forEach((field, idx) => {
            if (field.name === 'id') {
                fields.push(<th scope="row" style={{width: field.width}} key={"field" + idx}>{record[field.name]}</th>)
            } else {
                fields.push(<td key={"field" + idx}
                                style={{width: field.width}}>{this.getValue(record[field.name], field.type)}</td>)
            }
        });

        return fields;
    }

    onDelete(id) {
        const deleteMessage = this.props.config.actionDeleteMessage ?? gettext('Are you sure you want to delete the record?')
        const {UIStore} = this.context.rootStore;
        UIStore.sModal(<DeleteModal action={this.props.actionDelete} id={id}
                                    message={deleteMessage}></DeleteModal>);
    }

    deleteAction(record) {
        return <div className="col m-1 no-print">
            <InteractButton css={"btn btn-danger"} fn={this.onDelete} id={`delete-${record.id}`} icon={faTrash}/>
        </div>
    }

    actions(record) {
        const extraAction = this.props.extraActions(record);
        return <td className={"no-print"}>
            <div className='container no-print'>
                <div className="row">
                    {this.props.allowDelete && this.deleteAction(record)}
                    {extraAction}
                </div>
            </div>
        </td>
    }


    renderItems() {
        let items = [];
        const {records} = this.props;
        records.forEach((record, idx) => {
            items.push(<tr key={"list" + idx} className="tr-shadow ">
                {this.renderFields(record)}
                {this.actions(record)}
            </tr>)
        })
        return items;
    }

    render() {
        return this.renderItems();
    }

}

Elements.defaultProps = {
    allowDelete: true
}

Elements.propTypes = {
    records: PropTypes.array,
    config: PropTypes.object,
    extraActions: PropTypes.func,
    allowDelete: PropTypes.bool
}