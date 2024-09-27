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

function HomeComponent({userData}) {
  const [modalVisible, setModalVisible] = useState(false);

  const userChallengeList = useUserStore(state => state.userChallengeList);

  // console.log(userChallengeList, '유저 챌린지 리스트 in HomeComponent');

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
