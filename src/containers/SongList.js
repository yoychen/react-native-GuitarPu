import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Picker,
  Item,
  Header,
  Button,
  Icon,
  Title,
  List,
  ListItem,
  InputGroup,
  Input,
} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { setLyrics, setSinger, setKey, setName } from '../actions/SongActions';
import { Actions } from 'react-native-router-flux';
import SongCard from '../components/SongCard';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffbe2',
    flex: 1,
  },
  disabledBtn: {
    backgroundColor: 'rgb(255, 201, 150)',
    elevation: 0,
  },
  spinner: {
    height: 38,
    width: 38,
    borderRadius: 100,
    backgroundColor: 'white',
    elevation: 2,
    position: 'absolute',
    top: 85,
    left: width / 2 - 19,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 23,
    right: 18,
    borderRadius: 100,
    width: 58,
    height: 58,
  },

});

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: 'rgb(122, 68, 37)' }}>
          <Button transparent onPress={()=>Actions.refresh({key: 'IndexDrawer', open: value => !value })} >
            <Icon name="md-menu" />
          </Button>
          <Title>編輯精選</Title>
        </Header>
        <ScrollView>
          <SongCard name="123"/>
        </ScrollView>
        {
          this.state.loading ?
            <ActivityIndicator
              animating={this.state.loading}
              style={styles.spinner}
              color="rgb(213, 179, 36)"
            /> : null
        }
        <Button onPress={Actions.EditSongInfo} warning style={styles.floatingBtn} >
          <Icon style={{ fontSize: 30 }} name="md-brush" />
        </Button>
      </View>
    );
  }
}

function injectPropsFromStore(state) {
  console.log(state);
  return {
    song: state.song,
  };
}

const injectPropsFormActions = {
  setLyrics,
  setKey,
  setName,
  setSinger,
};

export default connect(injectPropsFromStore, injectPropsFormActions)(SongList);
