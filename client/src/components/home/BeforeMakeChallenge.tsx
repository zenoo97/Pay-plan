import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React, {Children} from 'react';
import {useNavigation} from '@react-navigation/native';

function BeforeMakeChallenge({userData}) {
  const navigation = useNavigation();
  const navigateHandler = () => {
    navigation.navigate('MakeChallenge', {userData});
  };
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../../public/images/circle.png')} />
      </View>
      <View style={styles.challengeAdd}>
        <View>
          <Button title="+" onPress={navigateHandler} />
        </View>
        <View>
          <Text>챌린지 추가하기</Text>
        </View>
      </View>
      <View>
        <View>
          <Text>돈이 한정되어 있거나 소비를 줄여야 하나요?</Text>
        </View>
        <View>
          <Text>목표 기간과 금액을 설정해 보세요.</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
export default BeforeMakeChallenge;
