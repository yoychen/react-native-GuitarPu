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
} from 'react-native';
import { setLyrics, addTone, removeTone } from '../actions/SongActions';
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
    padding: 20,
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
    backgroundColor: 'rgb(235, 235, 235)',
    backgroundColor: '#fffbe2',
    borderTopWidth: 0.3,
    borderColor: 'rgb(210, 210, 210)',
  },
  footerItem: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  disabledBtn: {
    backgroundColor: 'rgb(235, 235, 235)',
    backgroundColor: '#fffbe2',
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
  }
});

class EditTone extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.addNewTone = this.addNewTone.bind(this);
    this.state = {
      openModel: true,
      selectChar: -1,
      key: '_',
      subkey: '_',
      subtext: '_',
      loading: false,
    };
    console.disableYellowBox = true;
    // const defaultLyrics = '然後呢\n他們說你的心似乎痊癒了\n也開始有個人\n為你守護著\n待著 淚水中能看到 你真的 自由了';
    // this.props.setLyrics(defaultLyrics);
  }

  componentDidMount() {
  }

  addNewTone() {
    this.setState({
      selectChar: -1,
      key: '_',
      subkey: '_',
      subtext: '_',
    });
    if (this.state.key === '_') {
      this.props.removeTone(this.state.selectChar);
      return;
    }
    this.state.subkey = (this.state.subkey === '_') ? '' : this.state.subkey;
    this.state.subtext = (this.state.subtext === '_') ? '' : this.state.subtext;
    this.props.addTone({
      charAt: this.state.selectChar,
      key: this.state.key + this.state.subkey,
      sub: this.state.subtext,
    }, this.state.selectChar);
  }

  selectTargetLetter(i) {
    this.setState({
      selectChar: i,
    });
    // this.toggleModal();
  }

  toggleModal() {
    this.setState({
      openModel: !this.state.openModel,
    });
  }

  render() {
    const tones = ['_', 'C', 'D', 'E', 'F', 'G', 'A', 'B'];
    let colors = ['white', 'rgb(255, 48, 48)', 'rgb(235, 46, 46)', 'rgb(212, 36, 36)', 'rgb(193, 35, 35)', 'rgb(162, 29, 29)', 'rgb(144, 23, 23)', 'rgb(107, 15, 15)'];
    // colors = ['white', "#6d59e0", "#52adbf", "#c5edf9", "#244da5", "#39a9ce", "#3e5fd6", "#239ddb"]
    let disabledBtn = (this.state.selectChar === -1)?styles.disabledBtn:{};
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor: "rgb(122, 68, 37)"}}>
          <Button transparent onPress={Actions.pop} >
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>編輯吉他譜</Title>
          <Button transparent>
            <Icon name='md-checkmark' onPress={Actions.VertifySong} />
          </Button>
        </Header>
        <ScrollView>
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
                // this.props.song.tone.forEach((e) => {
                //   if (e.charAt === i) {
                //     tone = <Text style={styles.tone}>{e.key+e.sub}</Text>
                //   }
                // });
                const t = this.props.song.tone[i];
                if (t) {
                  let color = colors[tones.indexOf(t.key[0])];
                  tone = <Text style={[styles.tone,{color}]}>{t.key+t.sub}</Text>
                }
                const letterSelect = (i === this.state.selectChar) ? styles.letterSelect : {};
                return (
                  <View key={i} style={styles.letter}>
                    <Text onPress={ () => this.selectTargetLetter(i)} style={styles.letterText}>{e}</Text>
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
          <View style={styles.footerItem} >
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.key}
              onValueChange={(key)=>this.setState({key})}>
              {
                tones.map((e, i) => <Item label={e} value={e} key={i} />)
              }
            </Picker>
          </View>
          <View style={styles.footerItem} >
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.subkey}
              onValueChange={(subkey)=>this.setState({subkey})}>
              <Item label="_" value="_" />
              <Item label="#" value="#" />
              <Item label="b" value="b" />
            </Picker>
          </View>
          <View style={styles.footerItem} >
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.subtext}
              onValueChange={(subtext)=>this.setState({subtext})}>
              <Item label="_" value="_" />
              <Item label="m" value="m" />
              <Item label="sus4" value="sus4" />
              <Item label="7" value="7" />
            </Picker>
          </View>
          <Button onPress={this.addNewTone} disabled={(this.state.selectChar === -1)} warning style={[styles.footerItem, { marginTop: 6 }, disabledBtn]} > Apply </Button>
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
  setLyrics,
  addTone,
  removeTone,
};

export default connect(injectPropsFromStore, injectPropsFormActions)(EditTone);
