import {Alert, Button, Image, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../color';
import {supabase} from '../../lib/supabase';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '../../store/getUser';

function LoginComponent() {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const addUser = useUserStore(state => state.addUser);
  const addMakedChallenge = useUserStore(state => state.addMakedChallenge);
  const addUsedData = useUserStore(state => state.addUsedData);
  const addUserChallengeListAllData = useUserStore(
    state => state.addUserChallengeListAllData,
  );
  const fetchUserData = async userId => {
    try {
      let {data: users_data, error} = await supabase
        .from('users')
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
    } catch (err) {
      console.error('fetchUserData 에러:', err);
      Alert.alert(
        '서버 오류',
        '유저 데이터를 가져오는 중 오류가 발생했습니다.',
      );
      return null;
    }
  };
  const getUserChallengeList = async user_data => {
    let {data: user_maked_challenge_data, error} = await supabase
      .from('users_maked_challenge')
      .select('*')
      .eq('user_id', user_data[0].user_id);

    if (user_maked_challenge_data.length === 0) return [];
    else return user_maked_challenge_data;
  };
  const getUserChallengeListAllData = async user_data => {
    let {data: user_maked_challenge_data, error} = await supabase
      .from('users_maked_challenge')
      .select('*')
      .eq('user_id', user_data[0].user_id);

    if (user_maked_challenge_data.length === 0) return [];
    else return user_maked_challenge_data;
  };
  const getUserUsedList = async userData => {
    let {data: users_data, error} = await supabase
      .from('users_maked_challenge')
      .select('*')
      // Filters
      .eq('user_id', userData[0].user_id);

    let {data: usedMoneyInfo, errors} = await supabase
      .from('usedMoneyInfo')
      .select('*')
      .eq('user_data_id', users_data[0]?.challenge_id);

    if (usedMoneyInfo === null) return [];
    else return usedMoneyInfo;
  };
  const loginHandler = async () => {
    try {
      const {data: user, error} = await supabase
        .from('users')
        .select('*')
        .eq('user_id', id)
        .eq('password', password)
        .single();

      if (error || !user) {
        Alert.alert('아이디 혹은 비밀번호를 확인하세요.');
        return;
      }

      const user_data = await fetchUserData(user.user_id);

      // user_data가 null인지 확인
      if (!user_data || user_data.length === 0) {
        Alert.alert('유저 데이터가 없습니다.');
        return;
      }

      const challengeData = await getUserChallengeList(user_data);
      const usedData = await getUserUsedList(user_data);
      const userChallengeListAllData = await getUserChallengeListAllData(
        user_data,
      );
      // console.log(challengeData, '챌린지 데이터 in loginComponent');
      // console.log(usedData, 'usedData in loginComponent');
      if (challengeData.length !== 0) {
        const user_challenge_data = challengeData.filter(
          item => item.current_status === true,
        );
        user_challenge_data.forEach(item => addMakedChallenge(item)); // 각 항목을 개별적으로 추가
      }
      if (usedData.length !== 0) {
        addUsedData(usedData);
      }
      if (userChallengeListAllData.length !== 0) {
        addUserChallengeListAllData(userChallengeListAllData);
      }
      addUser(user_data);

      // 로그인 후 Home으로 이동
      navigation.navigate('Home', {userData: user_data});
    } catch (err) {
      console.error('loginHandler 에러:', err);
      Alert.alert('로그인 오류', '로그인 중 오류가 발생했습니다.');
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
          secureTextEntry
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
