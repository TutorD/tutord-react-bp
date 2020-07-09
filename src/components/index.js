import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';

import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';

class Index extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Layout>
    )
  }
}

export default Index;
