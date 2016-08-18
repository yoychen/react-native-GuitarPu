import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Actions } from "react-native-router-flux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class hellojs2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={Actions.Hellojs}>
          <Text style={styles.welcome}>
            Welcome to React Native2!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
