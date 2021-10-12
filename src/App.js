import React, {Component} from "react";
import {BrowserRouter} from 'react-router-dom';

import {StoreContext} from "./context/Store";
import Layout from "./components/layout/layout";
import Routes from "./routes/route"
import {bootStrap} from './bootStrap';
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import ModalContainer from "./components/ui/modalContainer";
import ErrorBoundary from "./components/errors/errorBoundary";


class App extends Component {
  storesLoaded = false;
  stores = null;

  constructor(props) {
    super(props);
    this.state = {loading: false}
  }

  async componentDidMount() {
    this.storesLoaded = false
    await bootStrap.init();
    this.stores = {
      rootStore: bootStrap
    };
    this.setState({loading: true});
  }

  render() {
    return <div>
      {this.state.loading && <StoreContext.Provider value={this.stores}>
        <BrowserRouter>
          <ErrorBoundary>
            <Header></Header>
          </ErrorBoundary>
          <Layout>
            <Routes></Routes>
          </Layout>
          <ErrorBoundary>
            <Footer></Footer>
          </ErrorBoundary>
          <ModalContainer></ModalContainer>
        </BrowserRouter>
      </StoreContext.Provider>}
    </div>

  }
}


export default App;
