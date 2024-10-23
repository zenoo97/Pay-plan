import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useUserStore} from '../store/getUser';
import {supabase} from '../lib/supabase';
import {StyleSheet} from 'react-native';
import {colors} from '../color';

function DropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const setSelectedChallengeList = useUserStore(
    state => state.setSelectedChallengeList,
  );
  const userChallengeListAllData = useUserStore(
    state => state.userChallengeListAllData,
  );
  const getChallengeData = async () => {
    if (!value) return;

    let {data, error} = await supabase
      .from('usedMoneyInfo')
      .select('*')
      .eq('user_data_id', value);

    if (error) {
      console.error('Error fetching challenge data:', error);
      return;
    }

    setSelectedChallengeList(data); // 가져온 데이터를 저장
  };

  useEffect(() => {
    console.log(userChallengeListAllData[0], 'User Challenge List Data'); // 데이터 확인
    if (userChallengeListAllData.length > 0) {
      const formattedItems = userChallengeListAllData[0].map(challenge => ({
        label: challenge.challenge_name, // 챌린지 이름
        value: challenge.challenge_id, // 챌린지 ID
      }));
      setItems(formattedItems);
    }
  }, [userChallengeListAllData]);
  useEffect(() => {
    getChallengeData();
  }, [value]);
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items} // 변환된 items 배열 사용
      setOpen={setOpen}
      setValue={setValue}
      zIndex={9999}
      placeholder="챌린지 선택하기"
      style={{backgroundColor: colors.blueText}}
      textStyle={{fontSize: 15, color: 'white', fontWeight: 'bold'}}
      listItemLabelStyle={{color: colors.blueText}}
      listItemContainerStyle={styles.dropdown}
    />
  );
}
const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#F1FAFD',
  },
});
export default DropDown;
