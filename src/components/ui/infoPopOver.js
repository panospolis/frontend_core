import React, {Component} from "react";
import {StoreContext} from "../../context/Store";
import {observer} from "mobx-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {makeObservable, observable} from "mobx";
import {OverlayTrigger, Popover} from "react-bootstrap";

@observer
export default class InfoPopOver extends Component {
    static contextType = StoreContext
    visible = false;

    constructor(props) {
        super(props);

        makeObservable(this, {
            visible: observable
        })
        this.popOver = this.popOver.bind(this)
    }

    componentDidMount() {

    }

    popOver(title, body) {
        const styles = {
            "position": "absolute",
            left: "0px",
            transform: "translate(105px, 0px)",
            color:"red"
        }
        return <Popover id="popover-basic" className={"bg-info"}>
            {title && <Popover.Header as="h3">{title}</Popover.Header>}
            <Popover.Body>
                {body}
            </Popover.Body>
        </Popover>
    }

    render() {
        const {infoMessage = null} = this.context.rootStore.config
        if(!infoMessage){
            return null;
        }
        let title = this.props.title;
        let body = this.props.body;
        if (this.props.id) {
            body = this.context.rootStore.config.infoMessage[this.props.id]?.body;
            title = this.context.rootStore.config.infoMessage[this.props.id]?.title;
        }

        if ([null, undefined].includes(body)) {

            return null;
        }

        return <OverlayTrigger placement="top" overlay={this.popOver(title, body)}
        >
            <i><FontAwesomeIcon color="#17a2b8"
                                icon={faInfoCircle}></FontAwesomeIcon>
            </i>
        </OverlayTrigger>


    }
}
