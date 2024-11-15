import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from '../../color';
import {height, width} from '../../shared/phoneSize';
import SuccessPostComponent from './SuccessPostComponent';
import FailPostComponent from './FailPostComponent';

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
      <View style={styles.title}>
        <Text style={styles.titleText}>커뮤니티</Text>
      </View>
      <View style={styles.userInfo}>
        <SuccessPostComponent />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5 * height,
  },
  title: {
    paddingHorizontal: 20 * width,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blueText,
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
