import React, {Component} from "react";
import PropTypes from 'prop-types';
import Columns from "./Columns";


export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.paging = this.paging.bind(this);
        this.goToPage = this.goToPage.bind(this);
    }

    goToPage(e){
        this.props.setPage(e.target.getAttribute('data-id'))
    }

    getTotalPages(){
        return this.props.totalPages;
    }

    getNextPage(){
        let status = 'page-item';
        let nextPage = this.props.currentPage() + 1;
        if(nextPage > this.getTotalPages()){
            status += ' disabled'
        }


        return <li className={status}><a className="page-link" onClick={this.goToPage} data-id={nextPage} href="#">{gettext('Next')}</a></li>;
    }

    getPreviousPage(){
        let status = 'page-item';
        let previousPage = this.props.currentPage()-1;
        if(previousPage < 1){
            status += ' disabled'
        }

        return <li className={status}><a className="page-link" data-id={previousPage} onClick={this.goToPage} href="#">{gettext('Previous')}</a></li>;
    }

    getListOfPages(){
        const totalPages = [];
        for (let i = 1; i <= this.getTotalPages(); i++) {
            let className = 'page-item';

            if(this.props.currentPage() == i){
                className += ' active';
            }
            totalPages.push(<li key={'pagination_' + i} className={className}><a className="page-link" data-id={i}
                                                                                 onClick={this.goToPage}
                                                                                 href="#">{i}</a></li>)
        }

        return totalPages;
    }

    paging() {

        return <nav aria-label="Page navigation" className={"no-print"}>
            <ul className="pagination  justify-content-end">
                {this.getPreviousPage()}
                {this.getListOfPages()}
                {this.getNextPage()}
            </ul>
        </nav>
    }

    render() {
        return this.paging()
    }
}

Columns.propTypes = {
    currentPage: PropTypes.func,
    config: PropTypes.object,
    totalPages: PropTypes.number,
    setPage: PropTypes.func
}