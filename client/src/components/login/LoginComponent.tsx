import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../color';
import {supabase} from '../../lib/supabase';

function LoginComponent({navigation}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const loginHandler = async () => {
    let {data: users, error} = await supabase.from('users').select('*');
    const result = users.filter(
      item => item.user_id === id && item.password === password,
    );
    if (result.length === 0) {
      Alert.alert('아이디 혹은 비밀번호를 확인하세요.');
    } else {
      navigation.navigate('Home');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../../public/images/logo.png')} />
      </View>
      <View style={styles.loginInfo}>
        <View style={styles.id}>
          <TextInput
            style={styles.idInput}
            placeholder="아이디"
            onChangeText={setId}
          />
        </View>
        <View style={styles.pw}>
          <TextInput
            style={styles.pwInput}
            placeholder="비밀번호"
            onChangeText={setPassword}
          />
        </View>
      </View>
      <View style={styles.selectMenu}>
        <View>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
        <View>
          <Button title="Login" onPress={loginHandler} />
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
    backgroundColor: colors.input,
  },
  pwInput: {
    width: 245,
    height: 40,
    backgroundColor: colors.input,
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
