import React, {Component} from "react";
import {StoreContext} from "../../context/Store";
import {observer} from "mobx-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {makeObservable, observable, runInAction} from "mobx";
import parse from 'html-react-parser';

@observer
export default class InformationBox extends Component {
    static contextType = StoreContext
    visible = false;

    constructor(props) {
        super(props);

        makeObservable(this, {
            visible: observable
        })

        this.toggle = this.toggle.bind(this);
    }


    toggle() {
        runInAction(() => {
            this.visible = !this.visible
        })
    }

    render() {
        const show = this.visible ? "show" : "";
        const arrow = this.visible ? <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon> :
            <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
        return <div className="card mt-5 m-3 bg-info text-white info-box">
            <div className="card-header" onClick={this.toggle}>

                <i className={"mr-2"}>{arrow}</i>
                <i className={"mr-2"}><FontAwesomeIcon
                    icon={faInfoCircle}></FontAwesomeIcon>
                </i>

                {gettext('Guidance')}
            </div>
            <div className={`collapse ${show}`}>
                <div className="card-body">

                    {parse(this.props.content)}
                </div>
            </div>
        </div>
    }
}
