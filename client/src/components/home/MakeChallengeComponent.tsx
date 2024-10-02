import {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../color';
import DatePicker from 'react-native-date-picker';
import {supabase} from '../../lib/supabase';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '../../store/getUser';
import React from 'react';
import GoBackBtn from '../../shared/GoBackBtn';
import ComponentTitle from '../../shared/ComponentTitle';
import {height, scale, width} from '../../shared/phoneSize';

function MakeChallengeComponent() {
  const userData = useUserStore(state => state.userData);
  const navigation = useNavigation();
  const [challengeName, setChallengeName] = useState('');
  const [goalPrice, setGoalPrice] = useState(0);
  const [goalStartDate, setGoalStartDate] = useState(new Date());
  const [goalEndDate, setGoalEndDate] = useState(new Date());
  const [goalStartOpen, setGoalStartOpen] = useState(false);
  const [goalEndOpen, setGoalEndOpen] = useState(false);
  const addMakedChallenge = useUserStore(state => state.addMakedChallenge);
  const updateUserData = useUserStore(state => state.updateUserData);
  const addUserChallengeListAllData = useUserStore(
    state => state.addUserChallengeListAllData,
  );
  let startDate, endDate;
  const getUserChallengeListAllData = async () => {
    let {data: user_maked_challenge_data, error} = await supabase
      .from('users_maked_challenge')
      .select('*')
      .eq('user_id', userData[0].user_id);
    console.log(userData[0], 'ddddd');

    addUserChallengeListAllData(user_maked_challenge_data);
    console.log(user_maked_challenge_data);
  };
  const addChallenge = async () => {
    try {
      const {data, error} = await supabase
        .from('users_maked_challenge')
        .insert([
          {
            challenge_name: challengeName,
            goal_price: Number(goalPrice),
            user_id: userData[0].user_id,
            goal_period_start: goalStartDate.toISOString().split('T')[0],
            goal_period_end: goalEndDate.toISOString().split('T')[0],
            current_status: true,
          },
        ])
        .select();
      await getUserChallengeListAllData();
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

      updateUserData(user_data);
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
      <ComponentTitle values="챌린지 추가" />
      <View style={styles.infoContainer}>
        <View style={styles.challengeNameiInfo}>
          <View>
            <Text style={styles.inputTitleText}>챌린지 이름</Text>
          </View>
          <View>
            <TextInput
              style={styles.goalPriceInput}
              value={challengeName}
              onChangeText={setChallengeName}
              placeholder="챌린지 이름을 입력해주세요."
              maxLength={15}
            />
          </View>
        </View>
        <View style={styles.inputInfo}>
          <View>
            <Text style={styles.inputTitleText}>목표 기간</Text>
          </View>
          <View style={styles.datePicker}>
            <View>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setGoalStartOpen(true)}>
                <Text>
                  {startDate !== ''
                    ? goalStartDate.toISOString().split('T')[0]
                    : '시작일'}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={goalStartOpen}
                date={goalStartDate}
                onConfirm={date => {
                  setGoalStartOpen(false);
                  setGoalStartDate(date);
                  startDate = goalStartDate.toISOString().split('T')[0];
                }}
                onCancel={() => {
                  setGoalStartOpen(false);
                }}
                mode="date"
                locale="ko-KR"
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setGoalEndOpen(true)}>
                <Text>
                  {endDate !== ''
                    ? goalEndDate.toISOString().split('T')[0]
                    : '종료일'}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={goalEndOpen}
                date={goalEndDate}
                onConfirm={date => {
                  setGoalEndOpen(false);
                  setGoalEndDate(date);
                  endDate = goalEndDate.toISOString().split('T')[0];
                }}
                onCancel={() => {
                  setGoalEndOpen(false);
                }}
                mode="date"
                locale="ko-KR"
              />
            </View>
          </View>
        </View>
        <View style={styles.goalPriceInfo}>
          <View>
            <Text style={styles.inputTitleText}>목표 금액</Text>
          </View>
          <View>
            <TextInput
              style={styles.goalPriceInput}
              value={goalPrice ? Number(goalPrice).toLocaleString() : ''}
              onChangeText={text => setGoalPrice(text.replace(/[^0-9]/g, ''))}
              placeholder="목표 금액을 입력해주세요."
              maxLength={15}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.endBtn}>
          <TouchableOpacity style={styles.addBtn} onPress={addChallenge}>
            <Text style={styles.addBtnText}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MakeChallengeComponent;
const styles = StyleSheet.create({
  container: {
    height: '110%',
  },
  challengeAddText: {
    fontSize: 20 * scale,
    color: colors.blueText,
    paddingHorizontal: 10,
  },
  inputTitleText: {
    color: colors.blackText,
    fontSize: 23 * scale,
    fontWeight: 'bold',
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  dateInput: {
    width: 250 * width,
    height: 50 * height,
    borderWidth: 1 * width,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  infoContainer: {
    gap: 50,
    alignItems: 'center',
    borderTopLeftRadius: 30 * width,
    borderTopRightRadius: 30 * height,
    position: 'relative',
    backgroundColor: 'white',
    marginTop: -20,
    zIndex: 2,
  },
  challengeNameiInfo: {
    gap: 30,
    paddingVertical: 30,
  },
  goalPeriodStartInput: {},
  goalPeriodEndInput: {},
  goalPriceInput: {
    width: 520 * width,
    height: 50 * height,
    borderRadius: 10,
    backgroundColor: colors.inputGreyColor,
  },
  inputInfo: {
    gap: 20 * height,
  },
  goalPriceInfo: {
    gap: 10 * height,
  },
  endBtn: {
    alignItems: 'center',
    marginTop: 50,
  },
  addBtn: {
    width: 133 * width,
    height: 46 * height,
    backgroundColor: colors.blueText,
    borderRadius: 10 * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: 20,
    color: colors.input,
    fontWeight: 'bold',
  },
});
