import React, {useState} from 'react';
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
import DatePicker from 'react-native-date-picker';
import {colors} from '../color';
import {useUserStore} from '../store/getUser';
import {supabase} from '../lib/supabase';
function AddUsedPriceModal({setModalVisible, modalVisible}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [usedType, setUsedType] = useState('');
  const [title, setTitle] = useState('');
  const [usedPrice, setUsedPrice] = useState('');

  const addUsedData = useUserStore(state => state.addUsedData);
  const handlePaymentTypeSelect = type => {
    setUsedType(type);
  };

  const userData = useUserStore(state => state.userData);
  console.log(userData[0], '체크체크');
  const addUsedMoneyInfo = async () => {
    try {
      let {data: users_data, error} = await supabase
        .from('users_maked_challenge')
        .select('*')
        .eq('user_id', userData[0]?.user_id);

      if (error) {
        console.error('Error fetching users data:', error);
        Alert.alert(
          '데이터 조회 오류',
          '챌린지 데이터를 가져오는 데 실패했습니다.',
        );
        return;
      }

      const {data, error: insertError} = await supabase
        .from('usedMoneyInfo')
        .insert([
          {
            user_id: userData[0]?.user_id,
            title: title,
            date: date.toLocaleDateString('ko-KR'),
            used_price: usedPrice,
            type: usedType,
            user_data_id: userData[0].current_challenge_num,
          },
        ])
        .select();

      if (insertError) {
        console.error('Error inserting used money info:', insertError);
        Alert.alert(
          '데이터 추가 오류',
          '사용 금액 정보를 추가하는 데 실패했습니다.',
        );
        return;
      }

      addUsedData(data);
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('서버 오류', '예기치 않은 오류가 발생했습니다.');
    }
  };

  return (
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
                    onChangeText={text =>
                      setUsedPrice(text.replace(/[^0-9]/g, ''))
                    }
                    value={usedPrice ? Number(usedPrice).toLocaleString() : ''}
                    placeholder="사용 금액"
                    maxLength={15}
                    keyboardType="numeric"
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
                  onPress={async () => {
                    await addUsedMoneyInfo();
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
  );
}

const styles = StyleSheet.create({
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
});
export default AddUsedPriceModal;
