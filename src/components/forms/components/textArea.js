import React from "react";
import {Field} from "formik";
import {CKEditor} from 'ckeditor4-react';

export const TextArea = function (props) {
    return <Field
        id={`${props.id}`}
        name={`${props.id}`}
        data-testid={`${props.id}`}>
        {({field, form}) => {

            form.initialValues[field.name] = field.value || "";
            return (
                <>
                    <CKEditor
                        key={`ck_${props.id}`}
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
