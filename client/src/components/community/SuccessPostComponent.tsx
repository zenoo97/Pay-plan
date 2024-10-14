import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {height, scale, width} from '../../shared/phoneSize';
import {colors} from '../../color';
import React, {useEffect, useState} from 'react';
import {supabase} from '../../lib/supabase';

const SuccessPostComponent = () => {
  let [successData, setSuccessData] = useState([]);
  const getUserPostData = async () => {
    let {data: users_post, error} = await supabase
      .from('users_post')
      .select('*')
      .eq('status', true);

    if (error) {
      console.log('데이터 가져오기 오류:', error.message);
      return;
    }

    console.log('성공 결과', users_post);

    // 상태에 모든 데이터를 저장
    setSuccessData(users_post);
  };
  useEffect(() => {
    getUserPostData();
  }, []);
  let {
    id,
    challenge_name,
    challenge_review,
    favorite,
    user_name,
    user_nickname,
  } = successData;
  console.log(successData);
  return (
    <View>
      {successData.map(item => (
        <View key={item.id} style={styles.infoContainer}>
          <View>
            <View style={styles.userInfo}>
              <View>
                <View style={styles.profile}></View>
              </View>
              <View>
                <View>
                  <Text style={styles.idText}>{item.user_name}</Text>
                </View>
                <View>
                  <Text>@{item.user_nickname}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.postInfo}>
            <View>
              <View>
                <Text style={styles.challengeName}>
                  챌린지명: {item.challenge_name}
                </Text>
              </View>
              <View>
                <Text style={styles.reviewText}>
                  성공 소감: {item.challenge_review}
                </Text>
              </View>
            </View>
            <View style={styles.cheerUp}>
              <View>
                <Image
                  source={require('../../../public/images/thumb_up.png')}
                />
              </View>
              <View>
                <TouchableOpacity>
                  <Text>칭찬하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    borderRadius: 10 * width,
    padding: 40 * width,
    gap: 10,
    marginBottom: 10 * height,
    borderBottomWidth: 1,
  },
  userInfo: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 10 * width,
  },
  profile: {
    backgroundColor: 'grey',
    width: 50 * width,
    height: 35 * height,
    borderRadius: 100 * width,
  },
  idText: {
    fontSize: 20 * scale,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeName: {
    fontSize: 20 * scale,
    color: colors.blackText,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 15 * scale,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  cheerUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4F1FF',
    borderRadius: 10 * width,
    padding: 10,
  },
});

export default SuccessPostComponent;
