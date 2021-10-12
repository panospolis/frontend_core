import React from "react";
import {Spinner} from "./spinner";

export const EmptySections = function (props) {

    return <div className="container empty-sections"><div className={"loader-sections"}> <Spinner/></div></div>;
}