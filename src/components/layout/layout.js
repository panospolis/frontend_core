import React, {Component} from "react";


export default class Layout extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return <main className="container">
            <section>
                {this.props.children}
            </section>
        </main>
    }
}