import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Picker,
  Item,
  Header,
  Button,
  Icon,
  Title,
} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
  AsyncStorage,
} from 'react-native';
import { resetSong } from '../actions/SongActions';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffbe2',
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 13,
    margin: 10,
    borderRadius: 3,
    borderColor: '#e0ddc8',
    borderWidth: 1,
  },
  letter: {
    width: 25,
    height: 40,
    marginTop: 30,
  },
  letterSelect: {
    width: 25,
    height: 2,
    backgroundColor: 'red',
  },
  letterBr: {
    width,
    height: 0,
    marginTop: 0,
  },
  letterText: {
    fontSize: 23,
  },
  tone: {
    position: 'absolute',
    top: -35,
    fontSize: 25,
    width: 100,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 0.3,
    borderColor: 'rgb(210, 210, 210)',
  },
  footerBtn: {
    flex: 1,
    margin: 6,
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
  songInfo: {
    padding: 20,
    paddingBottom: 10,
  },
  name: {
    fontSize: 28,
  },
  singer: {
    fontSize: 16,
    marginTop: 5,
  },
  key: {
    color: 'rgb(33, 180, 145)',
    marginTop: 5,
    fontSize: 20,
  }
});

class VertifySong extends Component {
  constructor(props) {
    super(props);
    this.addNewSong = this.addNewSong.bind(this);
    this.state = {
      loading: false,
    };
    console.disableYellowBox = true;
    this.isSended = false;
  }

  componentDidMount() {
  }

  addNewSong = async () => {
    if(this.isSended) return;
    this.isSended = true;
    let { name, singer, key, tone, lyrics } = this.props.song;
    tone = JSON.stringify(tone);

    let token = await AsyncStorage.getItem('token');

    const url = 'https://guitarpu-backend-sakuxz.c9users.io/api/song';
    let res = await fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': token,
      },
      body: `name=${name}&singer=${singer}&key=${key}&tone=${tone}&lyrics=${lyrics}`,
    }).then((data) => data.json())
      .catch((e) => console.log(e));
    this.props.resetSong();
    Actions.IndexDrawer({ type: 'reset', reload: true });
  }

  render() {
    const tones = ['_', 'C', 'D', 'E', 'F', 'G', 'A', 'B'];
    let colors = ['white', 'rgb(255, 48, 48)', 'rgb(235, 46, 46)', 'rgb(212, 36, 36)', 'rgb(193, 35, 35)', 'rgb(162, 29, 29)', 'rgb(144, 23, 23)', 'rgb(107, 15, 15)'];
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent onPress={Actions.pop} >
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>確認吉他譜</Title>
        </Header>
        <ScrollView>
          <View style={styles.songInfo}>
            <Text style={styles.name} >{this.props.song.name}</Text>
            <Text style={styles.singer} >{this.props.song.singer}</Text>
            <Text style={styles.key} >{this.props.song.key}</Text>
          </View>
          <View style={styles.list}>
            {
              this.props.song.lyrics.split('').map((e, i) => {
                if (e === '\n') {
                  return (
                    <View key={i} style={[ styles.letter, styles.letterBr ]}>
                    </View>
                  );
                }
                let tone = <View />;
                const t = this.props.song.tone[i];
                if (t) {
                  let color = colors[tones.indexOf(t.key[0])];
                  tone = <Text style={[styles.tone,{color}]}>{t.key+t.sub}</Text>
                }
                const letterSelect = (i === this.state.selectChar) ? styles.letterSelect : {};
                return (
                  <View key={i} style={styles.letter}>
                    <Text style={styles.letterText}>{e}</Text>
                    <View style={letterSelect} />
                    { tone }
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
        {
          this.state.loading ?
            <ActivityIndicator
              animating={this.state.loading}
              style={styles.spinner}
              color='rgb(213, 179, 36)'
            /> : null
        }
        <View style={styles.footer} >
          <Button onPress={this.addNewSong} warning style={styles.footerBtn} > 分享您的創作 </Button>
        </View>
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
  resetSong,
};

export default connect(injectPropsFromStore, injectPropsFormActions)(VertifySong);
