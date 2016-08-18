import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import Hellojs from './containers/Hellojs';
import Hellojs2 from './containers/Hellojs2';
// const Router = connect()(RNRF.Router);

export default class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Hellojs" component={Hellojs} title="Hellojs" initial />
          <Scene key="Hellojs2" component={Hellojs2} title="Hellojs2" />
        </Scene>
      </Router>
    );
  }
}

export default connect()(AppRoutes);
