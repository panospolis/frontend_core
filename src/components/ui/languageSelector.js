import React, {Component} from "react";
import {StoreContext} from "../../context/Store";
import {observer} from "mobx-react";
import {SelectField} from "../forms/components/selectField";

@observer
export default class LanguageSelector extends Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    async changeLanguage(e) {
        const {CsStore} = this.context.rootStore;
        await CsStore.changeLanguage(e.target.value)
    }

    render() {
        const options = [];
        this.context.rootStore.config.languages.forEach(lang => {
            options.push({value: lang[0], label: lang[1]});
        })
        return <div className="form-group col">
            <SelectField id={'language'} bodyClass={"col-12"} value={this.context.rootStore.UIStore.getLanguage()} options={options}
                         onChange={this.changeLanguage}/>
        </div>
    }
}
