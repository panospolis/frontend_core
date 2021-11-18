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

        return <nav className="menu">
            {this.context.rootStore.config.phases.map(p => {
                activeMenu = "";
                const sections = p.section_id.split(',');
                const first = sections.shift();
                const last = sections.pop();

                if (first > progress) {
                    activeMenu = "bg-dark";
                } else if (p.section_id.includes(progress)) {
                    activeMenu = "bg-secondary";
                } else {
                    activeMenu = "bg-success";
                }

                if (p.section_id.includes(this.props.step)) {
                    activeMenu = " active bg-primary";
                }

                return <NavLink key={p.id} activeClassName={activeMenu}
                                className={"menu text-decoration-none text-white "}
                                to={p.url}>
                    {p.label}
                </NavLink>
            })}
        </nav>
    }

}
