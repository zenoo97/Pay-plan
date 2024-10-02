import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Children} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../color';
import {height, scale, width} from '../../shared/phoneSize';

function BeforeMakeChallenge({userData}) {
  const navigation = useNavigation();
  const navigateHandler = () => {
    navigation.navigate('MakeChallenge', {userData});
  };
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Image source={require('../../../public/images/circle.png')} />
        <View style={styles.challengeAdd}>
          <View>
            <TouchableOpacity style={styles.addBtn} onPress={navigateHandler}>
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.addChallengeText}>챌린지 추가하기</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeAdd: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    width: 60 * width,
    height: 50 * height,
    borderColor: colors.inputGreyColor,
    borderWidth: 1 * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: 18 * scale,
    fontWeight: 'bold',
  },
  addChallengeText: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
    color: colors.blackText,
  },
});
export default BeforeMakeChallenge;
