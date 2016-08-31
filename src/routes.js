import React, { Component } from 'react';
import { StyleSheet, Navigator } from 'react-native';
import { connect } from 'react-redux';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import EditTone from './containers/EditTone';
import EditSongInfo from './containers/EditSongInfo';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import IndexDrawer from './containers/IndexDrawer';
import SongList from './containers/SongList';
import MySongList from './containers/MySongList';
import VertifySong from './containers/VertifySong';
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
    backgroundColor: '#fffbe2',
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
        <Scene key="root" >
          <Scene key="EditSongInfo" hideNavBar={true} component={EditSongInfo} title="EditSongInfo" />
          <Scene key="EditTone" duration={0} hideNavBar={true} component={EditTone} title="EditTone" />
          <Scene key="VertifySong" duration={0} hideNavBar={true} component={VertifySong} title="VertifySong" />
          <Scene key="Login" hideNavBar={true} component={Login} type={ActionConst.REPLACE} title="Login"/>
          <Scene key="SignUp" hideNavBar={true} component={SignUp} type={ActionConst.REPLACE} title="SignUp" />
          <Scene key="IndexDrawer" component={IndexDrawer} open={false} initial>
            <Scene
              key="main"
              tabs={false}
            >
              <Scene key="SongList" component={SongList} type={ActionConst.REPLACE} hideNavBar={true} />
              <Scene key="MySongList" component={MySongList} type={ActionConst.REPLACE} hideNavBar={true} />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default connect()(AppRoutes);
