import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {height, scale, width} from '../../shared/phoneSize';
import {colors} from '../../color';
import React, {useEffect, useState} from 'react';
import {supabase} from '../../lib/supabase';

const SuccessPostComponent = () => {
  let [successData, setSuccessData] = useState([]);
  let [likedPosts, setLikedPosts] = useState(new Set()); // 클릭된 포스트를 관리하는 상태
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
  const favoriteBtnHandler = async item => {
    const {error} = await supabase
      .from('users_post') // 업데이트할 테이블 이름
      .update({favorite: item.favorite + 1}) // 좋아요 수 증가
      .eq('id', item.id); // 특정 포스트를 식별하기 위한 조건

    if (error) {
      console.log('칭찬하기 오류:', error.message);
    } else {
      console.log('칭찬하기 성공:', item);

      // 순서를 유지하며 상태 업데이트
      setSuccessData(prevData =>
        prevData.map(data =>
          data.id === item.id ? {...data, favorite: data.favorite + 1} : data,
        ),
      );

      // 클릭된 포스트를 상태에 추가
      setLikedPosts(prevLiked => new Set(prevLiked).add(item.id));
    }
  };
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
              <View style={styles.favorite}>
                <View>
                  <Image
                    source={require('../../../public/images/thumb_up.png')}
                  />
                </View>
                <View>
                  <Text style={styles.favoriteNum}>{item.favorite}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.cheerUp}
              onPress={() => favoriteBtnHandler(item)}>
              <Image
                source={require('../../../public/images/thumb_up.png')}
                style={{
                  tintColor: likedPosts.has(item.id) ? 'black' : 'gray', // 클릭 여부에 따라 색상 변경
                }}
              />
            </TouchableOpacity>
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
    gap: 10 * width,
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
  favorite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10 * width,
    marginTop: 10,
  },
  favoriteNum: {
    fontSize: 18 * scale,
    fontWeight: 'bold',
    color: 'black',
  },
  cheerUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4F1FF',
    borderRadius: 10 * width,
    padding: 10 * width,
  },
  cheerUpText: {
    fontSize: 18 * scale,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SuccessPostComponent;
