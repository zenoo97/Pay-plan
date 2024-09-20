import {View} from 'react-native';
import React from 'react';
import MakeChallengeComponent from '../../components/home/MakeChallengeComponent';
function MakeChallenge({route}) {
  const {userData} = route.params;
  return (
    <View>
      <MakeChallengeComponent userData={userData} />
    </View>
  );
}

export default MakeChallenge;
