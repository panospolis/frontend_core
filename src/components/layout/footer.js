import React, {Component} from "react";
import {StoreContext} from "../../context/Store";

class Footer extends Component {
    static contextType = StoreContext


    render() {
        return <footer className="container-fluid mt-5">
            <div className="container">
                <div className="row mb-3">
                    <div className="col text-center mt-5 p-2 font-weight-bold">
                        version: {this.context.rootStore.config.version}
                    </div>
                </div>
            </div>
        </footer>
    }
}

export default (Footer)