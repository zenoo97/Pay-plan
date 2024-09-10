import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../color';

function LoginComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../../public/images/logo.png')} />
      </View>
      <View style={styles.loginInfo}>
        <View style={styles.id}>
          <TextInput style={styles.idInput} placeholder="아이디" />
        </View>
        <View style={styles.pw}>
          <TextInput style={styles.pwInput} placeholder="비밀번호" />
        </View>
      </View>
      <View style={styles.selectMenu}>
        <View>
          <Pressable style={styles.signUpBtn}>
            <Text>sign up</Text>
          </Pressable>
        </View>
        <View>
          <Pressable style={styles.loginBtn}>
            <Text>login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  loginText: {
    fontSize: 20,
  },
  loginInfo: {
    gap: 10,
  },
  idInput: {
    width: 245,
    height: 40,
    backgroundColor: 'grey',
  },
  pwInput: {
    width: 245,
    height: 40,
    backgroundColor: '#ECECEC',
  },
  selectMenu: {
    flexDirection: 'row',
    gap: 20,
  },
  signUpBtn: {
    backgroundColor: colors.btn,
  },
  loginBtn: {
    backgroundColor: colors.btn,
  },
});
export default LoginComponent;
