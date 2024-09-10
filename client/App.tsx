import {Image, StyleSheet, View} from 'react-native';
// import LoginComponent from './components/login/loginComponent';
import React from 'react';
import LoginComponent from './src/components/login/LoginComponent';
function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <LoginComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default App;
