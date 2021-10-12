import React, {Component} from "react";
import {withRouter} from "react-router";
import {StoreContext} from "../../context/Store";
import {NavLink} from "react-router-dom";


@withRouter
export default class TopMenu extends Component {
    static contextType = StoreContext
    actorsList = {};
    sageId = null;

    constructor(props) {
        super(props);

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.location.pathname !== this.props.location.pathname;
    }

    render() {
        const {UIStore} = this.context.rootStore;
        const sage = UIStore.getSageId();
        const progress = this.context.rootStore.ProgressStore.lastProgressStep(sage);

        let activeMenu = "active bg-primary";
        let activeMenuTwo = 'bg-dark';
        if(progress > 9){
            activeMenuTwo = "bg-success"
        } else if(progress  > 5){
            activeMenuTwo = "bg-secondary"
        }

        if(this.props.location.pathname.includes("two")){
            activeMenuTwo = "active bg-primary";
            if(progress < 5){
                activeMenu = "bg-secondary";
            }else {
                activeMenu = "bg-success";
            }
        }
        if(this.props.location.pathname.includes("assessment/report")) {
            if (progress === 11) {
                activeMenu = "bg-success";
                activeMenuTwo = "bg-success";
            }
        }

        return <nav className="menu">
            <NavLink activeClassName={activeMenu} className={"menu text-decoration-none text-white "+activeMenu}
                     to={`/sage/${sage}/site/profile/1/`}>
                PHASE I
            </NavLink>
            <NavLink activeClassName={activeMenuTwo} className={"menu text-decoration-none text-white "+activeMenuTwo}
                     to={`/sage/${sage}/two/actor/questions/`}>
                PHASE 2
            </NavLink>
        </nav>
    }
}
