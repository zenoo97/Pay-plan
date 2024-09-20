import {Alert, Button, Image, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../color';
import {supabase} from '../../lib/supabase';
import {useNavigation} from '@react-navigation/native';
function LoginComponent() {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const fetchUserData = async userId => {
    let {data: users_data, error} = await supabase
      .from('users_data')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('데이터 조회 실패:', error.message);
      Alert.alert(
        '데이터 조회 실패',
        '유저 데이터를 가져오는 데 실패했습니다.',
      );
      return null;
    }
    return users_data; // 여러 데이터를 반환
  };

  const loginHandler = async () => {
    const {data: user, error} = await supabase
      .from('users')
      .select('*')
      .eq('user_id', id)
      .eq('password', password)
      .single(); // 한 개의 유저 데이터만 가져옴

    if (error || !user) {
      Alert.alert('아이디 혹은 비밀번호를 확인하세요.');
      return;
    }

    const userData = await fetchUserData(user.user_id);

    if (userData) {
      navigation.navigate('Home', {userData}); // 유저 데이터를 전달
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../../public/images/logo.png')} />
      </View>
      <View style={styles.loginInfo}>
        <TextInput
          style={styles.idInput}
          placeholder="아이디"
          onChangeText={setId}
        />
        <TextInput
          style={styles.pwInput}
          placeholder="비밀번호"
          secureTextEntry // 비밀번호 입력 시 보안을 위해 마스킹
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.selectMenu}>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        <Button title="Login" onPress={loginHandler} />
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
});

export default LoginComponent;
