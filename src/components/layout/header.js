import React, {Component} from "react";
import LanguageSelector from "../ui/languageSelector";
import {
    NavLink
} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {StoreContext} from "../../context/Store";

class Header extends Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);

    }

    title(app_name){
        return `${app_name}: ${this.context.rootStore.config.header.title}`
    }

    render() {
        const {app_name} = this.context.rootStore.config;
        return <header className="container-fluid">
            <section>
                <div className="container">
                    <div className="row mb-3">
                        <div className="col ml-3 font-weight-bold">
                            <NavLink className={"text-primary"} to={`/${app_name}`}>
                                <FontAwesomeIcon
                                    icon={faHome}></FontAwesomeIcon> {this.title(app_name)}
                            </NavLink>
                        </div>
                        <div className="col-2 text-light  pt-1 font-weight-bold">
                            <LanguageSelector></LanguageSelector>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    }
}

export default (Header)