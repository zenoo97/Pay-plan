import {View} from 'react-native';
import React from 'react';
import MakeChallengeComponent from '../../components/home/MakeChallengeComponent';
import {useUserStore} from '../../store/getUser';
function MakeChallenge({route}) {
  // const {userData} = useUserStore(state => state.userData);
  return (
    <View>
      <MakeChallengeComponent />
    </View>
  );
}

export default MakeChallenge;
