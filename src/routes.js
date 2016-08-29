import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import EditTone from './containers/EditTone';
import Hellojs2 from './containers/Hellojs2';
// const Router = connect()(RNRF.Router);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    // style.marginTop = computedProps.hideNavBar ? 0 : 64;
    // style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="root">
          <Scene key="Hellojs" hideNavBar={true} component={EditTone} title="EditTone" initial />
          <Scene key="Hellojs2" hideNavBar={true} component={Hellojs2}  title="Hellojs2" />
        </Scene>
      </Router>
    );
  }
}

export default connect()(AppRoutes);
