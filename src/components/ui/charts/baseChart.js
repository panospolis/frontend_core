import React from "react";
import {makeObservable, observable} from "mobx";
import ReactECharts from 'echarts-for-react';
import {StoreContext} from "../../../context/store";
import PropTypes from "prop-types";


export default class BaseChart extends React.Component {
    static contextType = StoreContext
    options = null;
    height = '600px';
    width = '100%';
    toolBox = {
        right:40,
        show: true,
        feature: {
            dataZoom: {
                show: false,
            },
            dataView: {show: false},
            magicType: {show: false},
            restore: {show: false},
            saveAsImage: {
                type:'png',
                title:gettext('Save as image')
            }
        }
    }

    constructor(props) {
        super(props);
        makeObservable(this, {
            options: observable
        });
    }


    componentDidMount() {
        this.setOptions();
    }

    setOptions() {
        throw new Error('Please implement setOptions')
    }

    render() {
        if (!this.options) {
            return null;
        }

        return <ReactECharts style={{height: this.height, width: this.width}}
                             className='echarts-for-echarts'
                             theme='my_theme' option={this.options}/>
    }
}

BaseChart.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

