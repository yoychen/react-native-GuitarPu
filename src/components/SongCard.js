import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const StyleSheet = require('../utils/F8StyleSheet');
const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 252, 245, 0.66)',
    margin: 12,
    marginTop: 0,
    borderRadius: 2,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    paddingLeft: 20,
    paddingBottom: 0,
  },
  secRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 13,
    paddingLeft: 22,
    paddingBottom: 18,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 100,
    // backgroundColor: 'rgb(232, 174, 75)',
    justifyContent: 'center',
    marginTop: 8,
    marginLeft: 2,
    borderWidth: 0.6,
    borderColor: 'rgb(255, 150, 150)',
  },
  avatarText: {
    textAlign: 'center',
    fontSize: 17,
    // color: 'rgb(255, 242, 221)',
    color: 'rgb(230, 83, 83)',
  },
  name: {
    fontSize: 23,
  },
  singer: {
    fontSize: 12,
    marginTop: 3,
  },
  btnIcon: {
    fontSize: 18,
    // color: 'rgb(205, 171, 81)',
    // color: 'rgb(111, 88, 52)',
    color: 'rgb(156, 84, 44)',
  },
});

export default function SongCard(props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.singer}>{props.singer}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{props.songKey}</Text>
        </View>
      </View>
      {
        (props.hideLike) ?
          <View style={{ margin: 11 }} /> :
          <View style={styles.secRow}>
            <TouchableOpacity onPress={() => {handleLike(props.isLike, props.id, props.resetSongList)}} style={{ width: 100, flexDirection: 'row' }}>
              {
                (props.isLike) ?
                <Icon name="heart" style={styles.btnIcon} /> :
                  <Icon name="heart-o" style={styles.btnIcon} />
                }
                <Text style={{ marginLeft: 8 }}>{props.likes.length}</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
            </View>
      }
    </View>
  );
}

SongCard.propTypes = {
  title: React.PropTypes.string,
};

SongCard.defaultProps = {
  title: '',
};

async function likeSong(songId, reset) {
  let token = await AsyncStorage.getItem('token');

  const url = 'https://guitarpu-backend-sakuxz.c9users.io/api/like';
  let res = await fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': token,
    },
    body: `SongId=${songId}`,
  }).then((data) => data.json())
    .catch((e) => console.log(e));

  reset();
}

async function unlikeSong(songId, reset) {
  let token = await AsyncStorage.getItem('token');

  const url = 'https://guitarpu-backend-sakuxz.c9users.io/api/like';
  let res = await fetch(url,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': token,
    },
    body: `SongId=${songId}`,
  }).then((data) => data.json())
    .catch((e) => console.log(e));

  reset();
}

function handleLike(isLike, sid, reset) {
  if (isLike) {
    unlikeSong(sid, reset);
  } else {
    likeSong(sid, reset);
  }
}
