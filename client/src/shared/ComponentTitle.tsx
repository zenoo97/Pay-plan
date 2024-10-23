import {StyleSheet, View, Text} from 'react-native';
import {height, scale, width} from './phoneSize';
import {colors} from '../color';
import React from 'react';
import GoBackBtn from './GoBackBtn';

function ComponentTitle({values}) {
  return (
    <View style={styles.menuTitle}>
      <GoBackBtn />
      <View style={styles.title}>
        <Text style={styles.titleText}>{values}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  menuTitle: {
    backgroundColor: colors.blueText,
    flex: 0.3 * height,
    zIndex: 1,
    paddingHorizontal: 20 * width,
  },
  titleText: {
    fontSize: scale * 31,
    color: colors.inputGreyColor,
    fontWeight: 'bold',
  },
});
export default ComponentTitle;
