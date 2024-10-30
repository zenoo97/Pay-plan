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
import {height, scale, width} from './phoneSize';
function AddUsedPriceModal({setModalVisible, modalVisible}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [usedPrice, setUsedPrice] = useState('');

  const addUsedData = useUserStore(state => state.addUsedData);

  const userData = useUserStore(state => state.userData);
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
            <View style={styles.title}>
              <Text style={styles.titleText}>지출 기록하기</Text>
            </View>
            <View>
              <View style={styles.challenge}>
                <View>
                  <Text>날짜</Text>
                </View>
                <View>
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
            </View>
            <View style={styles.selectModalBtn}>
              <View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={async () => {
                    await addUsedMoneyInfo();
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>확인</Text>
                </TouchableOpacity>
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
  },

  titleText: {
    fontSize: 24 * scale,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#9fdcef',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 30 * height,
  },
  button: {
    borderRadius: 20,
    padding: 15,
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
    justifyContent: 'center',
    gap: 20 * width,
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
    // flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30 * height,
    gap: 10 * height,
  },
  input: {
    backgroundColor: colors.inputGreyColor,
    width: 460 * width,
    borderRadius: 10 * width,
    backgroundColor: 'white',
  },
});
export default AddUsedPriceModal;
