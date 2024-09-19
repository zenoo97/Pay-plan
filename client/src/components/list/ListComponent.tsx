import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {supabase} from '../../lib/supabase';

function ListComponent({userData}) {
  const getUserUsedList = async () => {
    let {data: users_data, error} = await supabase
      .from('users_data')
      .select('*')

      // Filters
      .eq('user_id', userData[0].user_id);
    console.log(users_data[0].challenge_id);
    let {data: usedMoneyInfo, errors} = await supabase
      .from('usedMoneyInfo')
      .select('*')
      .eq('user_data_id', users_data[0].challenge_id);
    console.log(usedMoneyInfo);
  };
  useEffect(() => {
    getUserUsedList();
  }, []);
  return (
    <View>
      <Text>List component</Text>
    </View>
  );
}
export default ListComponent;
