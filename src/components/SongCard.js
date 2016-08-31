import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
  Icon,
} from 'native-base';
const StyleSheet = require('../utils/F8StyleSheet');
const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 12,
    borderRadius: 2,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    // paddingBottom: 0,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 100,
    backgroundColor: 'rgb(232, 174, 75)',
    justifyContent: 'center',
    // borderWidth: 2,
    // borderColor: 'rgb(255, 253, 250)',
  },
  avatarText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'rgb(255, 242, 221)',
  },
  name: {
    fontSize: 23,
  },
  singer: {
    fontSize: 12,
    marginTop: 6,
  },
});

export default function DefaultComponent(props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Default {props.name}</Text>
          <Text style={styles.singer}>Default {props.name}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>淵</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Icon name='md-heart' />
        </View>
      </View>
    </View>
  );
}

DefaultComponent.propTypes = {
  title: React.PropTypes.string,
};

DefaultComponent.defaultProps = {
  title: '',
};
