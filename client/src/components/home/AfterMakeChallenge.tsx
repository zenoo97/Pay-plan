import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

function AfterMakeChallenge({userData}) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../../public/images/circle.png')}
          style={styles.circleImg}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  circleImg: {
    width: 350,
    height: 350,
  },
});
export default AfterMakeChallenge;
