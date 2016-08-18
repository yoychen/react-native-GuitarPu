import React from 'react';
import {
  Text,
  View,
} from 'react-native';
const StyleSheet = require('../utils/F8StyleSheet');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default function DefaultComponent(props) {
  return (
    <View style={styles.container}>
      <Text>Default {props.title}</Text>
    </View>
  );
}

DefaultComponent.propTypes = {
  title: React.PropTypes.string,
};

DefaultComponent.defaultProps = {
  title: '',
};
