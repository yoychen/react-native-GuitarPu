import React, { Component } from 'react';
import {
  Picker,
  Item,
} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Modal,
} from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Modal: {
    backgroundColor: 'white',
    marginTop: 0.3 * height,
    height: height * 0.7,
    padding: 18,
    elevation: 8,
    margin: 15,
    borderRadius: 5,
  },
  ModalMask: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    top: 0,
    left: 0,
  },
});


class SetToneModal extends Component {
  onValueChange() {

  }
  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.props.open}
        onRequestClose={() => {this.props.toggleModal()}}
        >
        <View style={styles.ModalMask} />
        <View style={styles.Modal}>
          <Picker
             iosHeader="Select one"
             mode="dropdown"
             selectedValue={'key2'}
             onValueChange={this.onValueChange.bind(this)}>
             <Item label="Cats" value="key0" />
             <Item label="Dogs" value="key1" />
             <Item label="Birds" value="key2" />
             <Item label="Elephants" value="key3" />
          </Picker>
        </View>
      </Modal>
    );
  }

}

export default SetToneModal;
