import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../color';
import {supabase} from '../../lib/supabase';

function SignUpScreen({navigation}) {
  const [nickName, setNickName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [checkResults, setCheckResults] = useState({
    nickNameCheck: {value: '', status: null},
    idCheck: {value: '', status: null},
  });

  const idCheck = async id => {
    const {data: users, error} = await supabase.from('users').select('id');
    if (error) {
      console.error('Error fetching users:', error);
      return;
    }

    const result = users.filter(user => user.id === id);

    if (result.length > 0) {
      setCheckResults(prev => ({
        ...prev,
        idCheck: {value: `"${id}"은(는) 사용 중입니다.`, status: false},
      }));
    } else {
      setCheckResults(prev => ({
        ...prev,
        idCheck: {value: `"${id}"은(는) 사용 가능합니다.`, status: true},
      }));
    }
  };

  const nickNameCheck = async nickName => {
    const {data: users, error} = await supabase
      .from('users')
      .select('nickname');

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }

    const result = users.filter(user => user.nickname === nickName);

    if (result.length > 0) {
      setCheckResults(prev => ({
        ...prev,
        nickNameCheck: {
          value: `"${nickName}"은(는) 사용 중입니다.`,
          status: false,
        },
      }));
    } else {
      setCheckResults(prev => ({
        ...prev,
        nickNameCheck: {
          value: `"${nickName}"은(는) 사용 가능합니다.`,
          status: true,
        },
      }));
    }
  };
  const insertUserData = async () => {
    if (checkResults.idCheck.status && checkResults.nickNameCheck.status) {
      const {data, error} = await supabase
        .from('users')
        .insert([{nickname: nickName, user_id: id, password: password}])
        .select();
      if (error) {
        console.error('Error fetching users:', error);
        return;
      } else {
        Alert.alert('회원가입이 완료되었습니다.');
        // console.log(data);
        navigation.navigate('Login');
      }
    } else {
      Alert.alert('닉네임 혹은 아이디를 확인하세요.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={{width: 100, height: 50}}>
        <Button
          title="←"
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.signUpContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>회원가입</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <View>
              <Text style={styles.texts}>닉네임</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View>
                <TextInput style={styles.input} onChangeText={setNickName} />
              </View>
              <View>
                <Button
                  title="중복여부"
                  onPress={() => nickNameCheck(nickName)}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: checkResults.nickNameCheck.status ? 'green' : 'red',
                }}>
                {checkResults.nickNameCheck.value}
              </Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View>
              <Text style={styles.texts}>아이디</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View>
                <TextInput style={styles.input} onChangeText={setId} />
              </View>
              <View>
                <Button title="중복여부" onPress={() => idCheck(id)} />
              </View>
            </View>
            <View>
              <Text
                style={{color: checkResults.idCheck.status ? 'green' : 'red'}}>
                {checkResults.idCheck.value}
              </Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View>
              <Text style={styles.texts}>비밀번호</Text>
            </View>
            <View>
              <TextInput style={styles.input} onChangeText={setPassword} />
            </View>
          </View>
          <View style={styles.infoBox}>
            <View>
              <Text style={styles.texts}>비밀번호 확인</Text>
              {password === passwordConfirm ? (
                <Text>비밀번호가 같습니다.</Text>
              ) : (
                <Text>비밀번호가 다릅니다.</Text>
              )}
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={setPasswordConfirm}
              />
            </View>
          </View>
          <View style={styles.btn}>
            <Button title="완료" onPress={insertUserData} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {},
  backBtn: {
    width: 100,
    height: 50,
  },
  signUpContainer: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 20,
    color: colors.blueText,
    fontWeight: 'bold',
  },
  texts: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  input: {
    width: 328,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.inputGreyColor,
  },
  infoContainer: {
    alignItems: 'center',
    gap: 30,
  },
  infoBox: {
    gap: 10,
  },
  btn: {
    width: 100,
  },
});
