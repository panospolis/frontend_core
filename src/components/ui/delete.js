import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StoreContext} from "../../context/store";
import DeleteModal from "./modals/deleteModal";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Delete extends Component {
    static contextType = StoreContext

    onDelete(id) {
        const deleteMessage = this.props?.actionDeleteMessage
        const {UIStore} = this.context.rootStore;
        UIStore.sModal(<DeleteModal action={this.props.actionDelete} id={id}
                                    message={deleteMessage}/>);
    }

    render(){
        const {id} = this.props;
        return <button className={'btn btn-danger no-print'} type={"button"}
                       id={id}
                       data-testid={`delete-button-${id}`}
                       onClick={() => this.onDelete(id)}>

            <FontAwesomeIcon icon={faTrash}/>
        </button>
    }
}

Delete.defaultProps = {
    actionDeleteMessage : gettext('Are you sure you want to delete the record?')
}

Delete.propTypes = {
    actionDeleteMessage: PropTypes.string,
    actionDelete: PropTypes.func,
    id: PropTypes.number
}