import React from 'react';
import {StyleSheet, View} from 'react-native';
import UserWritePost from './UserWritePost';

function Community() {
  return (
    <View style={styles.container}>
      <UserWritePost />
      <UserWritePost />
      <UserWritePost />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
export default Community;
