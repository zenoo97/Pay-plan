import {Button, Image, Text, View} from 'react-native';

function BeforeMakeChallenge({navigation}) {
  const navigateHandler = () => {
    navigation.navigate('MakeChallenge');
  };
  return (
    <View>
      <View>
        <Image source={require('../../../public/images/circle.png')} />
      </View>
      <View style={{position: 'absolute', top: 140}}>
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
export default BeforeMakeChallenge;
