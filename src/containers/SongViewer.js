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
  Image,
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
    elevation: 1.5,
    backgroundColor: 'rgba(250, 247, 232, 0.65)',
    // borderColor: '#e0ddc8',
    // borderWidth: 1,
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
    width: 80,
  },
  bgImg: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

class SongViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
      singer: '',
      key: '',
      tone: [],
      lyrics: '',
    };
    this.getSong(this.props.id);
    this.modulateTones = this.modulateTones.bind(this);
    console.disableYellowBox = true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.setState({
        loading: true,
        name: '',
        singer: '',
        key: '',
        tone: [],
        lyrics: '',
      });
      this.getSong(this.props.id);
    }
  }

  getSong = async (id) => {
    let token = await AsyncStorage.getItem('token');

    const url = `https://guitarpu-backend-sakuxz.c9users.io/api/song/${id}`;
    let res = await fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': token
      },
    }).then((data) => data.json())
      .catch((e) => console.log(e));
    this.setState({
      name: res.data.name,
      singer: res.data.singer,
      key: res.data.key,
      oriKey: res.data.key,
      tone: JSON.parse(res.data.tone),
      lyrics: res.data.lyrics,
      loading: false,
    });
  }

  modulate(key, to, ori) {
    const table = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    let gap = table.indexOf(key) + table.indexOf(to) - table.indexOf(ori);
    if(gap < 0){
      gap = table.length - ( 0 - gap );
    }
    gap = gap % table.length;
    return table[gap];
  }

  modulateTones(key) {
    let newTone = this.state.tone.map((e) => {
      if(e === null) return null;
      e.key = this.modulate(e.key, key, this.state.oriKey);
      return e;
    });
    console.log(newTone);
    this.setState({ tone: newTone, oriKey: key });
  }

  render() {
    const tones = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    const tonesc = ['_', 'C', 'D', 'E', 'F', 'G', 'A', 'B'];
    let colors = ['white', 'rgb(255, 48, 48)', 'rgb(235, 46, 46)', 'rgb(212, 36, 36)', 'rgb(193, 35, 35)', 'rgb(162, 29, 29)', 'rgb(144, 23, 23)', 'rgb(107, 15, 15)'];
    return (
      <View style={styles.container}>
        <Image source={require('../assets/songview_bg.jpg')} style={styles.bgImg} />

        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent onPress={Actions.pop} >
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>查看吉他譜</Title>
        </Header>
        <ScrollView>
          <View style={styles.songInfo}>
            <Text style={styles.name} >{this.state.name}</Text>
            <Text style={styles.singer} >{this.state.singer}</Text>
            {
              (this.state.key === '') ? null :
                <Picker
                  style={styles.key}
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={this.state.key}
                  onValueChange={(key) => {this.modulateTones(key); this.setState({key});} }
                >
                  {
                    tones.map((e, i) => {
                      return <Item label={e} key={i} value={e} />
                    })
                  }
                </Picker>
            }
          </View>
          <View style={styles.list}>
            {
              this.state.lyrics.split('').map((e, i) => {
                if (e === '\n') {
                  return (
                    <View key={i} style={[ styles.letter, styles.letterBr ]}>
                    </View>
                  );
                }
                let tone = <View />;
                const t = this.state.tone[i];
                if (t) {
                  let color = colors[tonesc.indexOf(t.key[0])];
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

export default connect(injectPropsFromStore, injectPropsFormActions)(SongViewer);
