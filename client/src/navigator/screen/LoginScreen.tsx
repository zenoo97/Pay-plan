import * as React from 'react';
import {View} from 'react-native';
import LoginComponent from '../../components/login/LoginComponent';

function LoginScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <Text>Home Screen</Text> */}
      <LoginComponent navigation={navigation} />
    </View>
  );
}

export default LoginScreen;
