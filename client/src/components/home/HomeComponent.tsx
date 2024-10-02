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
import GoBackBtn from '../../shared/GoBackBtn';

function HomeComponent() {
  const [modalVisible, setModalVisible] = useState(false);
  const userChallengeList = useUserStore(state => state.userChallengeList);
  const userData = useUserStore(state => state.userData);

  return (
    <View style={styles.container}>
      <GoBackBtn />
      {userChallengeList?.length === 0 ? (
        <BeforeMakeChallenge userData={userData} />
      ) : (
        <AfterMakeChallenge
          userData={userData}
          userChallengeList={userChallengeList}
          setModalVisible={setModalVisible}
        />
      )}
      <AddUsedPriceModal
        userData={userData}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
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
});
