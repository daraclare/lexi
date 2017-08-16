import React from 'react';
import Header from './global/Header';
import { Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import ReduxPage from './ReduxPage/ReduxPage';
import FrontendPage from './FrontendPage/FrontendPage';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={FrontendPage}/>
      </div>
    );
  }

}
