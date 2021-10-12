import React, {Component} from "react";
import {
    NavLink
} from "react-router-dom";
import {withRouter} from "react-router";
import {StoreContext} from "../../context/Store";
import {observer} from "mobx-react";

@withRouter
@observer
export default class WizardMenu extends Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);
        this.chekProgress = this.chekProgress.bind(this)
    }

    chekProgress() {
        const {UIStore} = this.context.rootStore;
        const id = UIStore.getSageId();
        return this.context.rootStore.ProgressStore.getProgressPerSection(id)
    }

    populateMenu() {
        const menu = [];
        const {ProgressStore, UIStore} = this.context.rootStore;
        const id = UIStore.getSageId();

        const steps = ProgressStore.getProgressPerSection(id)
        if(!steps?.length){
            return null;
        }
        const lastItem = steps[steps.length-1];

        let phase = 'PhaseOne';
        if(this.props.phaseTwo){
            phase='PhaseTwo';
        }

        if (steps) {
            this.context.rootStore.config.Sections[phase].forEach((item, idx) => {

                let className = "btn btn-circle-color btn-circle text-white";
                if(parseInt(lastItem.section) === item.id && item.id < 9){
                    className = "btn btn-secondary btn-circle text-white";
                }
                if (this.props.location.pathname.includes(item.url.replace('id', id))) {
                    className = "btn btn-primary btn-circle text-white";
                }
                const access = ProgressStore.permissionForCurrentSection(id, item.id);
                const padding = idx === 0 ? "pl-3" : "pl-0";
                if (!access) {
                    className = "btn btn-dark btn-circle text-white";
                    menu.push(<div className={`col ${padding} text-center`} key={item.id}>
                        <button className={className}>
                            {item.label}
                        </button>
                    </div>)
                } else {
                    menu.push(<div className={`col ${padding} text-center`} key={item.id}>
                        <NavLink activeClassName="selected" to={item.url.replace('id', id)}>
                            <button className={className}>
                                {item.label}
                            </button>
                        </NavLink>
                    </div>)
                }
            });
        }
        return menu;
    }

    render() {
        return <div className="row">
            {this.populateMenu()}
        </div>
    }
}

