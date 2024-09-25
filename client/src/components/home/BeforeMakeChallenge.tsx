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

function BeforeMakeChallenge({userData}) {
  const navigation = useNavigation();
  const navigateHandler = () => {
    navigation.navigate('MakeChallenge', {userData});
  };
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
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

      <View style={styles.addInfo}>
        <View>
          <Text style={styles.infoOne}>
            돈이 한정되어 있거나 소비를 줄여야 하나요?
          </Text>
        </View>
        <View>
          <Text style={styles.infoTwo}>목표 기간과 금액을 설정해 보세요.</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    gap: 30,
  },
  challengeAdd: {
    position: 'absolute',
    top: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    width: 40,
    height: 40,
    borderColor: colors.inputGreyColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addChallengeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  addInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  infoOne: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  infoTwo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blackText,
  },
});
export default BeforeMakeChallenge;
