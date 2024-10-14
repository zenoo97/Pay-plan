import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from '../../color';
import {height, width} from '../../shared/phoneSize';
import SuccessPostComponent from './SuccessPostComponent';
import FailPostComponent from './failPostComponent';

function Community() {
  let [btnStatus, setBtnStaus] = useState(false);
  let [failData, setFailData] = useState([]);
  const successBtnHandler = () => {
    setBtnStaus(false);
  };
  const failBtnHandler = () => {
    setBtnStaus(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectBtn}>
        <View style={styles.successBtnContainer}>
          <TouchableOpacity
            style={[btnStatus ? styles.defaultBtn : styles.successBtn]}
            onPress={successBtnHandler}>
            <Text
              style={[
                btnStatus ? styles.defaultBtnText : styles.successBtnText,
              ]}>
              성공
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.failBtnContainer}>
          <TouchableOpacity
            style={[!btnStatus ? styles.defaultBtn : styles.successBtn]}
            onPress={failBtnHandler}>
            <Text
              style={[
                !btnStatus ? styles.defaultBtnText : styles.successBtnText,
              ]}>
              실패
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {btnStatus === false ? (
        <>
          <View style={styles.userInfo}>
            <SuccessPostComponent />
          </View>
        </>
      ) : (
        <>
          <View style={styles.userInfo}>
            <FailPostComponent />
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
  },
  selectBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successBtnContainer: {
    flex: 1,
  },
  failBtnContainer: {
    flex: 1,
  },
  defaultBtn: {
    backgroundColor: colors.inputGreyColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35 * height,
  },
  successBtn: {
    backgroundColor: colors.blueText,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35 * height,
  },
  defaultBtnText: {
    color: colors.blackText,
  },
  successBtnText: {
    color: 'white',
  },
  userInfo: {},
});
export default Community;
