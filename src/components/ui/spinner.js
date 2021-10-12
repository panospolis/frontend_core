import React from "react";

export const Spinner = function (props) {

    return <div className="spinner-border text-success" role="status">
        <span className="sr-only">{gettext('Loading...')}</span>
    </div>
}
