import React, {useState} from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {colors} from '../../color';
import {createClient} from '@supabase/supabase-js';

function SignUpScreen({navigation}) {
  const [nickName, setNickName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const userInfoHandler = () => {
    // 기존 아이디가 있는지 확인
    //
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
              {/* <View>
              <Pressable>
                <Text>중복여부</Text>
              </Pressable>
            </View> */}
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
              {passwordConfirm ? (
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
            <Button title="완료" onPress={userInfoHandler} />
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
