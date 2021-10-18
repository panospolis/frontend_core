import React, {Component} from "react";
import {withRouter} from "react-router";
import {StoreContext} from "../../context/Store";
import {NavLink} from "react-router-dom";


@withRouter
export default class TopMenu extends Component {
    static contextType = StoreContext
    actorsList = {};
    appId = null;

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.location.pathname !== this.props.location.pathname;
    }

    render() {
        const {UIStore, config} = this.context.rootStore;
        const app = UIStore.getAppId();
        const progress = this.context.rootStore.ProgressStore.lastProgressStep(app);

        let activeMenu = "active bg-primary";
        let activeMenuTwo = 'bg-dark';
        if(progress > config.topMenu.phase.two.id){
            activeMenuTwo = "bg-success"
        } else if(progress  > config.topMenu.phase.one.id){
            activeMenuTwo = "bg-secondary"
        }

        if(this.props.location.pathname.includes("two")){
            activeMenuTwo = "active bg-primary";
            if(progress < config.topMenu.phase.one.id){
                activeMenu = "bg-secondary";
            }else {
                activeMenu = "bg-success";
            }
        }

        return <nav className="menu">
            <NavLink activeClassName={activeMenu} className={"menu text-decoration-none text-white "+activeMenu}
                     to={config.topMenu.phase.one.url}>
                {config.topMenu.phase.one.label}
            </NavLink>
            <NavLink activeClassName={activeMenuTwo} className={"menu text-decoration-none text-white "+activeMenuTwo}
                     to={config.topMenu.phase.two.url}>
                {config.topMenu.phase.two.label}
            </NavLink>
        </nav>
    }
}
