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

        return <nav className="menu">
            {this.context.rootStore.config.phases.filter(h => (h.language === UIStore.getLanguage() && h.show_on_menu)).map(p => {
                activeMenu = "";
                const sections = p.section_id.split(',');
                const first = sections.shift();
                if (parseInt(first) > progress) {
                    activeMenu = "bg-dark";
                } else if (p.section_id.split(',').some(i => parseInt(i) === parseInt(progress))) {
                    activeMenu = "bg-secondary";
                } else {
                    activeMenu = "bg-success";
                }

                if (p.section_id.split(',').some(i => parseInt(i) === parseInt(this.props.step))) {
                    activeMenu = " active bg-primary";
                }

                return <NavLink key={p.id}
                                className={`menu text-decoration-none text-white ${activeMenu}`}
                                to={p.url.replace('id', app)}>
                    {p.label}
                </NavLink>
            })}
        </nav>
    }

}
