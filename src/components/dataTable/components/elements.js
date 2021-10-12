import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StoreContext} from "../../../context/Store";
import {observer} from 'mobx-react';
import DeleteModal from "../../ui/modals/deleteModal";

@observer
export default class Elements extends Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);
        this.renderFields = this.renderFields.bind(this);
        this.renderItems = this.renderItems.bind(this);
    }

    renderFields(record) {
        let fields = [];
        const {config} = this.props;
        config.fields.forEach((field, idx) => {
            if (field.name === 'id') {
                fields.push(<th scope="row" style={{width: field.width}} key={"field" + idx}>{record[field.name]}</th>)
            } else {
                fields.push(<td key={"field" + idx} style={{width: field.width}}>{record[field.name]}</td>)
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

        const deleteLabel = this.props.config.actionDelete ?? gettext('Delete')
        return <div className="col m-1 no-print">
            <button className="btn btn-danger" onClick={
                () => this.onDelete(record.id)
            }>
                {deleteLabel}
            </button>
        </div>
    }

    actions(record) {
        const extraAction = this.props.extraActions(record);
        return <td>
            <div className='container no-print'>
                <div className="row">
                    {this.deleteAction(record)}
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

Elements.propTypes = {
    records: PropTypes.array,
    config: PropTypes.object,
    extraActions: PropTypes.func
}