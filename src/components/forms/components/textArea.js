import React from "react";
import {Field} from "formik";
import {CKEditor} from 'ckeditor4-react';
import {StoreContext} from "../../../context/store";
import {makeObservable, observable, runInAction} from "mobx";
import {observer} from "mobx-react";

@observer
export default class TextArea extends React.Component {
    static contextType = StoreContext
    online = null;

    constructor(props) {
        super(props);
        makeObservable(this, {
            online: observable
        })
    }

    componentDidMount() {
        const {ConnectivityStore} = this.context.rootStore;
        runInAction(() => {
            this.online = ConnectivityStore.isConnected();
        })
    }

    renderAsCkEditor() {
        const {id} = this.props;
        return <Field
            id={`${id}`}
            name={`${id}`}
            data-testid={`${id}`}>
            {({field, form}) => {
                form.initialValues[field.name] = field.value || "";
                return (
                    <>
                        <CKEditor
                            key={`ck_${id}`}
                            config={{
                                toolbar: [
                                    ['Bold', 'Italic'],
                                    ['Undo', 'Redo'],
                                ],
                            }}
                            type="classic"
                            initData={field.value}
                            onChange={(event, editor) => {
                                form.setFieldValue(field.name, event.editor.getData());
                            }}
                        />
                    </>
                )
            }}</Field>
    }

    renderAsTextArea() {
        const {id} = this.props;
        return <Field
            id={`${id}`}
            name={`${id}`}
            data-testid={`${id}`}
            as="textarea">
            {({field, form}) => {
                form.initialValues[field.name] = field.value || "";
                return (
                    <>
                        <textarea className="text-area w-100" rows={"10"} {...field} {...this.props} />
                    </>
                )
            }}</Field>
    }

    whatToRender() {
        if (this.online) {
            return this.renderAsCkEditor();
        }

        return this.renderAsTextArea();
    }

    render() {
        if(this.online === null){
            return null;
        }
        return this.whatToRender();
    }
}
