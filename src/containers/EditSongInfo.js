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
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffbe2',
    flex: 1,
  },
  footerItem: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
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
  form: {
    padding: 13,
    paddingRight: 26,
    marginTop: 8,
    overflow: 'hidden',
  },
  label: {
    fontSize: 16,
    marginLeft: 18,
  },
});

class EditSongInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }


  render() {
    console.log(this.state);
    const tones = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const { name, singer, key, lyrics } = this.props.song;
    let disabled = true;
    let disabledBtn = styles.disabledBtn;
    console.log(name !== '' && singer !== '' && key !== '' && lyrics !== '');
    if (name !== '' && singer !== '' && key !== '' && lyrics !== '') {
      disabled = false;
      disabledBtn = {};
    }
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: 'rgb(122, 68, 37)' }}>
          <Button transparent onPress={Actions.pop} >
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>新增吉他譜</Title>
        </Header>
        <ScrollView>
          <List style={styles.form} >
            <ListItem>
              <InputGroup>
                <Icon name="md-musical-notes" />
                <Input placeholder="歌名" value={name} onChangeText={(name) => this.props.setName(name)} />
              </InputGroup>
            </ListItem>
            <ListItem style={{ marginTop: 13 }} >
              <InputGroup>
                <Icon name="ios-person" />
                <Input placeholder="演唱者" value={singer} onChangeText={(singer) => this.props.setSinger(singer)} />
              </InputGroup>
            </ListItem>
            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
              <View style={{ marginRight: 26 }} >
                <Text style={styles.label}>Key :</Text>
              </View>
              <Picker
                style={{ width: 80 }}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.props.song.key}
                onValueChange={(key) => this.props.setKey(key)}
              >
                {
                  tones.map((e, i) => {
                    return <Item label={e} key={i} value={e} />
                  })
                }
              </Picker>
            </View>
            <Text style={[styles.label, { marginTop: 10, marginBottom: 13 }]}>歌詞 :</Text>
            <ListItem>
              <InputGroup borderType="regular" style={{ borderRadius: 3 }} >
                <Input multiline={true} style={{ height: 260 }} value={lyrics} onChangeText={(lyrics)=>this.props.setLyrics(lyrics)} />
              </InputGroup>
            </ListItem>
          </List>

        </ScrollView>
        {
          this.state.loading ?
            <ActivityIndicator
              animating={this.state.loading}
              style={styles.spinner}
              color="rgb(213, 179, 36)"
            /> : null
        }
        <Button onPress={Actions.EditTone} disabled={disabled} warning style={[styles.floatingBtn, disabledBtn]} >
          <Icon style={{ fontSize: 30 }} name="md-arrow-forward" />
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

export default connect(injectPropsFromStore, injectPropsFormActions)(EditSongInfo);
