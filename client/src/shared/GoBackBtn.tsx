import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../color';
function GoBackBtn() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 50,
  },
  backBtn: {
    width: 100,
    height: 50,
  },
  backBtnText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.blackText,
  },
});
export default GoBackBtn;
