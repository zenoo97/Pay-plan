import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {supabase} from '../../lib/supabase';

function ListComponent({userData}) {
  const [usedData, setUsedData] = useState([]);
  const [userChallengeList, setUserChallengeList] = useState([]);
  const getUserChallengeList = async () => {
    let {data: users_data, error} = await supabase
      .from('users_data')
      .select('*')
      .eq('user_id', userData[0].user_id);
    setUserChallengeList(users_data);
  };
  const getUserUsedList = async () => {
    let {data: users_data, error} = await supabase
      .from('users_data')
      .select('*')
      // Filters
      .eq('user_id', userData[0].user_id);
    // console.log(users_data);
    let {data: usedMoneyInfo, errors} = await supabase
      .from('usedMoneyInfo')
      .select('*')
      .eq('user_data_id', users_data[0].challenge_id);
    setUsedData(usedMoneyInfo);
  };
  useEffect(() => {
    getUserUsedList();
    getUserChallengeList();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'red', height: 100}}>
        {userChallengeList.map(item => (
          <>
            <View>
              <Text>{item.challenge_name}</Text>
            </View>
          </>
        ))}
      </View>
      {usedData.map(item => (
        <>
          <View style={styles.usedInfo}>
            <View style={styles.dateInfo}>
              <View>
                <Text>{item.date}</Text>
              </View>
              <View>
                <Text>금요일</Text>
              </View>
            </View>
            <View style={styles.title}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View>
              <Text>{item.used_price}원</Text>
            </View>
          </View>
        </>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  usedInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    padding: 10,
    alignItems: 'center',
  },
  dateInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {},
});
export default ListComponent;
