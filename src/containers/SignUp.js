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
  Alert,
} from 'react-native';
import { setUserInfo } from '../actions/UserActions';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffbe2',
    flex: 1,
    justifyContent: 'center',
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
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    paddingTop: 30,
    paddingRight: 33,
    paddingBottom: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 5,
    elevation: 2,
  },
  title: {
    height: 40,
  },
  titleText: {
    position: 'absolute',
    top: -6,
    top: -18,
    left: 50,
    fontSize: 54,
    fontSize: 65,
    zIndex: 1000,
    elevation: 2,
    color: 'rgb(55, 27, 8)',
  },
  submitBtn: {
    elevation: 1,
    marginLeft: 18,
    marginRight: 0,
    marginTop: 20,
  },
  hr: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginTop: 15,
    marginBottom: 15,
    width: 230,
    marginRight: -18,
  },
  orText: {
    textAlign: 'center',
    fontSize: 18,
  },
  orWrapper: {
    // backgroundColor: 'rgba(255, 255, 255, 0.54)',
    transform: [
      {translateY: 23},
    ],
    width: 25,
    height: 25,
    zIndex: 10000,
    padding: 2,
    paddingLeft: 4,
  },
  bgImg: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.register = this.register.bind(this);
    this.isSended = false;
  }

  register = async () => {
    const { username, password } = this.state;
    console.log('============================'+(username === '' || password === '') );
    if (username === '' || password === '') {
      Alert.alert('Info', 'empty field');
      return;
    }
    if (this.isSended) return;
    this.isSended = true;

    const url = 'https://guitarpu-backend-sakuxz.c9users.io/api/user';
    let res = await fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}`,
    }).then((data) => data.json()).catch((e) => {
      console.log('eeeeeeeeeerrrrrrrrr');
      return resolve(false);
    });
    console.log('res>>>>>>>>>.'+res);
    if (res) {
      this.isSended = false;
      Alert.alert('Info', 'register success');
      Actions.Login();
    } else {
      Alert.alert('Info', 'username was duplicate');
      this.isSended = false;
    }
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
         <Image source={require('../assets/signup_bg.jpg')} style={styles.bgImg} />
         <View style={styles.title}>
           <Text style={styles.titleText}>SignUp</Text>
         </View>
         <List style={styles.form}>
           <ListItem style={{ marginTop: 15 }}>
             <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
               <Icon name="ios-person" />
               <Input onChangeText={(username) => {this.setState({username})}} placeholder="NAME" />
             </InputGroup>
           </ListItem>
           <ListItem style={{ marginTop: 10 }}>
             <InputGroup borderType="regular" style={{ borderRadius: 5 }} >
               <Icon name="ios-unlock" />
               <Input onChangeText={(password) => {this.setState({password})}} placeholder="PASSWORD" secureTextEntry={true}/>
             </InputGroup>
           </ListItem>
           <Button onPress={this.register} style={styles.submitBtn} block warning> 註冊 </Button>
           <View style={{ alignItems: 'center' }}>
             <View style={styles.orWrapper}>
               <Text style={styles.orText}>or</Text>
             </View>
             <View style={styles.hr} />
           </View>

           <Button onPress={Actions.Login} style={styles.submitBtn} block info> 登入 </Button>
         </List>

      </View>
    );
  }
}

function injectPropsFromStore(state) {
  console.log(state);
  return {
    user: state.user,
  };
}

const injectPropsFormActions = {
  setUserInfo,
};

export default connect(injectPropsFromStore, injectPropsFormActions)(SignUp);
