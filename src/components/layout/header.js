import React, {Component} from "react";
import LanguageSelector from "../ui/languageSelector";
import {
    NavLink
} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

class Header extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return <header className="container-fluid">
            <section>
                <div className="container">
                    <div className="row mb-3">
                        <div className="col ml-3 font-weight-bold">
                            <NavLink className={"text-primary"} to={'/sage'}>
                                <FontAwesomeIcon
                                    icon={faHome}></FontAwesomeIcon> SAGE: Site-level Assessment of Governance and
                                Equity
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