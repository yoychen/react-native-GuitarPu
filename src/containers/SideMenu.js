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
  Image,
} from 'react-native';
import { setLyrics, setSinger, setKey, setName } from '../actions/SongActions';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffef6',
    flex: 1,
  },
  disabledBtn: {
    backgroundColor: 'rgb(255, 201, 150)',
    elevation: 0,
  },
  drawerHeader: {
    height: 170,
    backgroundColor: '#fffbe2',
    paddingTop: 45,
    paddingLeft: 35,
  },
  drawerContent: {
    paddingTop: 16,
  },
  avatar: {
    width: 63,
    height: 63,
    borderRadius: 100,
    backgroundColor: 'rgb(232, 174, 75)',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgb(247, 232, 200)',
  },
  avatarText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'rgb(255, 242, 221)',
  },
  name: {
    fontSize: 18,
    marginTop: 12,
    marginLeft: 5,
    color: 'rgb(193, 42, 65)',
  },
  listBtn: {
    paddingLeft: 28,
    height: 52,
    justifyContent: 'flex-start',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: 180,
  },
});

const TabView = (props, context) => {
  const drawer = context.drawer;
  let wordSpace = '    ';
  return (
    <View style={styles.container}>
      <View style={styles.drawerHeader}>
        <Image source={require('../assets/dr_bg2.jpg')} style={styles.bgImg} />
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>淵</Text>
        </View>
        <Text style={styles.name}>陳湧淵</Text>
      </View>
      <View style={styles.drawerContent}>
        <Button transparent block style={styles.listBtn} onPress={() => { changePage(Actions.SongList) } }>
          <Icon name='md-musical-notes'/>
          <Text>{wordSpace+' 創作大廳'}</Text>
        </Button>
        <Button transparent block style={styles.listBtn} onPress={() => { changePage(Actions.MySongList) } }>
          <Icon name='md-brush' />
          <Text>{wordSpace+'我的創作'}</Text>
        </Button>
        <Button transparent block style={styles.listBtn} onPress={Actions.EditSongInfo}>
          <Icon name='md-heart' />
          <Text>{wordSpace+'收藏'}</Text>
        </Button>
        <Button transparent block style={styles.listBtn} onPress={Actions.EditTone}>
          <Icon name='md-settings' />
          <Text>{wordSpace+'設定'}</Text>
        </Button>
        <Button transparent block style={styles.listBtn} onPress={Actions.Login}>
          <Icon name='md-log-out' />
          <Text>{wordSpace+'登出'}</Text>
        </Button>
      </View>
    </View>
  );
}

function changePage(page) {
  page();
  setTimeout(() => {
    Actions.refresh({ key: 'IndexDrawer', open: value => !value });
  }, 300);
}

export default TabView;
