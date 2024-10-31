import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {height, scale, width} from '../../shared/phoneSize';
import {colors} from '../../color';
import React, {useEffect, useState} from 'react';
import {supabase} from '../../lib/supabase';
import {useUserStore} from '../../store/getUser';

const SuccessPostComponent = () => {
  let [successData, setSuccessData] = useState([]);
  let [likedPosts, setLikedPosts] = useState(new Set()); // 클릭된 포스트를 관리하는 상태
  let userData = useUserStore(state => state.userData);
  const userId = userData[0].user_id; // 현재 사용자 ID를 가져오는 방법 필요

  const getUserPostData = async () => {
    let {data: users_post, error} = await supabase
      .from('users_post')
      .select('*')
      .eq('status', true);

    if (error) {
      console.log('데이터 가져오기 오류:', error.message);
      return;
    }

    setSuccessData(users_post);
  };

  const getUserLikes = async () => {
    let {data: userLikes, error} = await supabase
      .from('likes')
      .select('post_id')
      .eq('user_id', userId);

    if (error) {
      console.log('좋아요 데이터 가져오기 오류:', error.message);
      return;
    }

    const likedPostIds = new Set(userLikes.map(like => like.post_id));
    setLikedPosts(likedPostIds);
  };

  useEffect(() => {
    getUserPostData();
    getUserLikes(); // 사용자의 좋아요 데이터 가져오기
  }, []);

  const favoriteBtnHandler = async item => {
    const isLiked = likedPosts.has(item.id);

    if (isLiked) {
      let newLikedPosts = new Set(likedPosts);
      newLikedPosts.delete(item.id);

      const {error} = await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', item.id);

      if (error) {
        console.log('좋아요 삭제 오류: ', error.message);
      } else {
        console.log('좋아요 삭제 성공: ', item);
      }

      setSuccessData(prevData =>
        prevData.map(data =>
          data.id === item.id ? {...data, favorite: data.favorite - 1} : data,
        ),
      );

      setLikedPosts(newLikedPosts);
    } else {
      const {error} = await supabase
        .from('likes')
        .insert([{user_id: userId, post_id: item.id}]); // 좋아요 추가

      if (error) {
        console.log('좋아요 추가 오류:', error.message);
      } else {
        console.log('좋아요 추가 성공:', item);

        setSuccessData(prevData =>
          prevData.map(data =>
            data.id === item.id ? {...data, favorite: data.favorite + 1} : data,
          ),
        );

        let newLikedPosts = new Set(likedPosts);
        newLikedPosts.add(item.id);
        setLikedPosts(newLikedPosts);
      }
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
