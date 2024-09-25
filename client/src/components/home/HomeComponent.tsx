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

function HomeComponent({userData}) {
  const userChallengeList = useUserStore(state => state.userChallengeList);
  console.log(userChallengeList, '유저 챌린지 리스트 in HomeComponent');
  const addUsedData = useUserStore(state => state.addUsedData);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [usedType, setUsedType] = useState('');
  const [title, setTitle] = useState('');
  const [usedPrice, setUsedPrice] = useState('');

  const handlePaymentTypeSelect = type => {
    setUsedType(type);
  };

  const addUsedMoneyInfo = async () => {
    let {data: users_data, error} = await supabase
      .from('users_maked_challenge')
      .select('*')
      .eq('user_id', userData[0]?.user_id);

    if (error) {
      console.error('Error fetching users data:', error);
      return;
    }

    const {data, errors} = await supabase
      .from('usedMoneyInfo')
      .insert([
        {
          user_id: userData[0]?.user_id,
          user_password: userData[0]?.user_password,
          title: title,
          date: date.toLocaleDateString('ko-KR'),
          used_price: usedPrice,
          type: usedType,
          user_data_id: users_data[0].challenge_id,
        },
      ])
      .select();
    addUsedData(data);
    if (errors) {
      console.error('Error inserting used money info:', errors);
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
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <View style={styles.challenge}>
                  <View>
                    <Text>세부 내용</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.input}
                      value={title}
                      onChangeText={setTitle}
                    />
                  </View>
                </View>
                <View style={styles.challenge}>
                  <View>
                    <Text>날짜</Text>
                  </View>
                  <View style={{flex: 0.87}}>
                    <Button
                      title={`${date.toLocaleDateString('ko-KR')}`}
                      onPress={() => setOpen(true)}
                    />
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
                </View>
                <View style={styles.challenge}>
                  <View>
                    <Text>금액</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.input}
                      value={usedPrice}
                      onChangeText={setUsedPrice}
                    />
                  </View>
                </View>
                <View style={styles.challenge}>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.paymentButton,
                        usedType === 'cash' && styles.selectedButton,
                      ]}
                      onPress={() => handlePaymentTypeSelect('cash')}>
                      <Text>현금</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.paymentButton,
                        usedType === 'card' && styles.selectedButton,
                      ]}
                      onPress={() => handlePaymentTypeSelect('card')}>
                      <Text>카드</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.selectModalBtn}>
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      addUsedMoneyInfo();
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>확인</Text>
                  </Pressable>
                </View>
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>닫기</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
  // 모달
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  selectModalBtn: {
    flexDirection: 'row',
  },
  // 모달 끝
  challenge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    columnGap: 10,
  },
  input: {
    backgroundColor: colors.inputGreyColor,
    width: 200,
  },
  paymentButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#2196F3', // 선택된 버튼을 강조하는 색상
    color: 'white',
  },
});
