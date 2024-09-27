import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useUserStore} from '../store/getUser';

function DropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const userChallengeListAllData = useUserStore(
    state => state.userChallengeListAllData,
  );

  const getChallengeData = async () => {};
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

  useEffect(() => {}, [value]);
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items} // 변환된 items 배열 사용
      setOpen={setOpen}
      setValue={setValue}
      zIndex={9999}
      placeholder="챌린지 선택하기"
    />
  );
}

export default DropDown;
