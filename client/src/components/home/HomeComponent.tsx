import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BeforeMakeChallenge from './BeforeMakeChallenge';
import AfterMakeChallenge from './AfterMakeChallenge';
import {colors} from '../../color';
import DatePicker from 'react-native-date-picker';
import {supabase} from '../../lib/supabase';
import {useUserStore} from '../../store/getUser';
import AddUsedPriceModal from '../../shared/AddUsedPriceModal';

function HomeComponent() {
  const [modalVisible, setModalVisible] = useState(false);
  const userChallengeList = useUserStore(state => state.userChallengeList);
  const userData = useUserStore(state => state.userData);
  const resetChallenge = useUserStore(state => state.resetChallenge);

  console.log(userChallengeList, 'sssssss');
  useEffect(() => {
    const checkChallenges = async () => {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0]; // 현재 날짜
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // 내일 날짜
      const tomorrowString = tomorrow.toISOString().split('T')[0];

      // 챌린지의 종료 날짜와 비교
      if (userChallengeList[0].goal_period_end === todayString) {
        await updateChallengeStatus(userChallengeList[0].challenge_id, false); // 종료 처리
        await resetChallenge(); // 챌린지 리스트에서 제거
      } else if (userChallengeList[0].goal_period_end === tomorrowString) {
        await updateChallengeStatus(userChallengeList[0].challenge_id, false); // 종료 처리
        await resetChallenge(); // 챌린지 리스트에서 제거
      }
    };

    if (userChallengeList.length > 0) {
      checkChallenges();
    }
  }, []);

  const updateChallengeStatus = async (challengeId, isSuccess) => {
    const {error} = await supabase
      .from('users')
      .update({current_challenge_num: null}) // 상태 업데이트
      .eq('challenge_id', challengeId);

    if (error) {
      console.error('챌린지 상태 업데이트 오류:', error);
    }
    const status = isSuccess ? 'success' : 'failure';
    const {error: errors} = await supabase
      .from('users_maked_challenge')
      .update({current_status: false, result: status}) // 상태 업데이트
      .eq('challenge_id', challengeId);

    if (errors) {
      console.error('챌린지 상태 업데이트 오류:', error);
    } else {
      console.log(`챌린지 ${challengeId} 상태 업데이트 완료: ${status}`);
    }
  };
  return (
    <View style={styles.container}>
      {userChallengeList?.length === 0 ? (
        <BeforeMakeChallenge userData={userData} />
      ) : (
        <AfterMakeChallenge
          userData={userData}
          userChallengeList={userChallengeList}
        />
      )}
      <AddUsedPriceModal
        userData={userData}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <View style={styles.bottomBtnContainer}>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1, // 부모 컨테이너가 전체 화면을 차지하도록 함
    alignItems: 'center',
    paddingVertical: 20,
  },
  bottomBtnContainer: {
    position: 'absolute',
    bottom: 20, // 원하는 위치로 조정
    right: 20,
  },
  bottomBtn: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.blueText,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: 30,
    color: 'white',
  },
});
