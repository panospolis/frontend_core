import React from "react";
import {makeObservable, observable, runInAction} from "mobx"
import {observer} from 'mobx-react';
import ListElements from "./components/listDnDComponents/listElements";
import ListColumns from "./components/listDnDComponents/listColumns";
import DataTable from './dataTable'
import {ReactSortable} from "react-sortablejs";
import {StoreContext} from "frontend-core/src/context/Store";
import SmallInformationBox from "frontend-core/src/components/ui/smallInformationBox";

@observer
export default class ListDnDTable extends DataTable {
    static contextType = StoreContext

    newList = [];

    constructor() {
        super();

        this.setNewOrdering = this.setNewOrdering.bind(this);
        makeObservable(this, {
            newList: observable
        })
    }

    async componentDidMount() {
        await super.componentDidMount();
        runInAction(() => {
            this.newList = this.props.list.results
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.newList.length !== this.props.list.results.length) {
            runInAction(() => {
                this.newList = this.props.list.results
            })
        }
    }

    async setNewOrdering(list) {
        const llist = [...list];
        const nlist = llist.map((i, idx) => {
            i.order = idx + 1;
            return i;
        }).sort((a, b) => {
            return a.order > b.order;
        });

        runInAction(() => {
            this.newList = nlist;
        });
    }

    render() {
        if (!this.props.list?.results || !this.newList.length) {
            return null;
        }

        return <div className="mt-3 col ">
            <SmallInformationBox
                message={gettext('Please drag and drop the principles inside the box if you want to re-order them')}/>
            <div className="card mt-2 ">
                <div className="card-body">
                    <div className="row mb-4">
                        <ListColumns config={this.props.config} parameters={this.parameters}
                                     setOrderBy={this.setOrderBy}></ListColumns>
                        <div style={{width: '10%'}}><strong>{gettext('Actions')}</strong></div>
                    </div>
                    <div className={"drop-zone"}>
                        <ReactSortable
                            list={this.newList}
                            setList={(newState) => {
                                this.setNewOrdering(newState)
                            }}
                            onEnd={async () => {
                                await this.context.rootStore.CsStore.updateSection(this.newList);
                                await this.sendRequest();
                            }
                            }
                        >

                            <ListElements
                                records={this.newList} config={this.props.config}
                                extraActions={this.extraActions} on_drop={this.on_drop}
                                actionDelete={this.delete}></ListElements>

                        </ReactSortable>
                    </div>
                </div>
            </div>
        </div>
    }
}