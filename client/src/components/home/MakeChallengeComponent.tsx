import {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../color';
import DatePicker from 'react-native-date-picker';
import {supabase} from '../../lib/supabase';
import {useNavigation} from '@react-navigation/native';
function MakeChallengeComponent({userData}) {
  const navigation = useNavigation();
  const [challengeName, setChallengeName] = useState('');
  const [goalPeriodStart, setGoalPeriodStart] = useState('');
  const [goalPrice, setGoalPrice] = useState('');
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassWord] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const addChallenge = async () => {
    const {data, error} = await supabase
      .from('users_data')
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
    if (!error) {
      navigation.navigate('Home');
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
            <TextInput style={styles.goalPriceInput} />
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
              <TextInput style={styles.goalPeriodEndInput} />
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
            <TextInput style={styles.goalPriceInput} />
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
