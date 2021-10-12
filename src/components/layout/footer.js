import React, {Component} from "react";

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <footer className="container-fluid mt-5">
            <div className="container">
                <div className="row mb-3">
                    <div className="col align-self-center  p-2 font-weight-bold">
                        {/*<NavLink className={"text-light"} to={'/sage/settings'}>*/}
                        {/*    {gettext('About/Contact')}*/}
                        {/*</NavLink>*/}
                    </div>
                </div>
            </div>
        </footer>
    }
}

export default (Footer)