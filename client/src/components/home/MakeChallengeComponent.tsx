import {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../color';
import DatePicker from 'react-native-date-picker';
import {supabase} from '../../lib/supabase';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '../../store/getUser';

function MakeChallengeComponent({userData}) {
  const navigation = useNavigation();
  const [challengeName, setChallengeName] = useState('');
  const [goalPeriodStart, setGoalPeriodStart] = useState('');
  const [goalPrice, setGoalPrice] = useState('');
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassWord] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const addMakedChallenge = useUserStore(state => state.addMakedChallenge);
  const addChallenge = async () => {
    try {
      const {data, error} = await supabase
        .from('users_maked_challenge')
        .insert([
          {
            challenge_name: challengeName,
            goal_price: goalPrice,
            user_id: userData[0].user_id,
            goal_period_start: date.toLocaleDateString('ko-KR'),
            goal_period_end: date.toLocaleDateString('ko-KR'),
          },
        ])
        .select();

      if (error) {
        console.log('챌린지 추가 오류:', error);
        Alert.alert('챌린지 추가 오류', '챌린지를 추가하는 데 실패했습니다.');
        return; // 오류가 발생하면 함수 종료
      }

      // 데이터가 성공적으로 추가된 경우
      await addMakedChallenge(data[0]); // data가 비어있지 않은지 확인 필요

      const {data: user_data, error: updateError} = await supabase
        .from('users')
        .update({current_challenge_num: data[0].challenge_id})
        .eq('user_id', userData[0].user_id)
        .select();

      if (updateError) {
        console.log('유저 업데이트 오류:', updateError);
        Alert.alert(
          '유저 업데이트 오류',
          '유저 정보를 업데이트하는 데 실패했습니다.',
        );
      } else {
        navigation.navigate('Home', {userData, user_data});
      }
    } catch (err) {
      console.error('addChallenge 오류:', err);
      Alert.alert('오류', '챌린지를 추가하는 중 오류가 발생했습니다.');
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.challengeAddText}>챌린지 추가</Text>
      </View>
      <View style={styles.infoContainer}>
        <View>
          <View>
            <Text style={styles.inputTitleText}>챌린지 이름</Text>
          </View>
          <View>
            <TextInput
              style={styles.goalPriceInput}
              value={challengeName}
              onChangeText={setChallengeName}
            />
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.inputTitleText}>목표 기간</Text>
          </View>
          <View>
            <View>
              <Button title="Open" onPress={() => setOpen(true)} />
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
                mode="date"
                locale="ko-KR"
              />
            </View>
            <View>
              <TextInput style={styles.goalPeriodEndInput} value={date} />
            </View>
          </View>
          <View>
            <TextInput />
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.inputTitleText}>목표 금액</Text>
          </View>
          <View>
            <TextInput
              style={styles.goalPriceInput}
              value={goalPrice}
              onChangeText={setGoalPrice}
            />
          </View>
        </View>
        <View style={styles.endBtn}>
          <Button title="추가하기" onPress={addChallenge} />
        </View>
      </View>
    </View>
  );
}

export default MakeChallengeComponent;
const styles = StyleSheet.create({
  container: {},
  challengeAddText: {
    fontSize: 20,
    color: colors.blueText,
  },
  inputTitleText: {
    color: colors.blackText,
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    alignItems: 'center',
  },
  goalPeriodStartInput: {},
  goalPeriodEndInput: {},
  goalPriceInput: {
    width: 356,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.inputGreyColor,
  },
  endBtn: {
    width: 100,
  },
});
