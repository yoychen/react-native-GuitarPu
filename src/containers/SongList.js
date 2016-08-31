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
  Image,
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
  bgImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  },
  titleWrapper: {
    paddingTop: 8,
    paddingLeft: 23,
    paddingBottom: 13,
  },
  titleText: {
    color: 'rgb(74, 52, 8)',
    fontSize: 16,
  },
  titleBaseline: {
    width: 35,
    height: 2.3,
    backgroundColor: 'rgb(70, 50, 9)',
    borderRadius: 3,
    marginTop: 8,
  },
});

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
    this.getSongList = this.getSongList.bind(this);
    this.getSongList();
  }

  getSongList = async () => {
    let { name, singer, key, tone, lyrics } = this.props.song;
    tone = JSON.stringify(tone);

    const url = 'https://guitarpu-backend-sakuxz.c9users.io/api/song';
    let res = await fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((data) => data.json())
      .catch((e) => console.log(e));

    this.setState({
      data: res.data,
      loading: false,
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <View style={styles.container}>
        <Image source={require('../assets/list_bg.jpg')} style={styles.bgImg} />
        <Header style={{ backgroundColor: 'rgb(122, 68, 37)' }}>
          <Button transparent onPress={()=>Actions.refresh({key: 'IndexDrawer', open: value => !value })} >
            <Icon name="md-menu" />
          </Button>
          <Title>創作大廳</Title>
          <Button transparent>
            <Icon name="md-search" />
          </Button>
        </Header>
        <ScrollView style={{ paddingTop: 12, paddingBottom: 12 }} >
          <View style={styles.titleWrapper}>
            <Text style={styles.titleText} >
              熱門吉他譜
            </Text>
            <View style={styles.titleBaseline} />
          </View>
          {
            this.state.data.map((e, i) => {
              return <SongCard name={e.name} singer={e.singer} author={e.User.username} key={i} />
            })
          }

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
