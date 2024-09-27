import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../color';
import {useUserStore} from '../../store/getUser';

function MoreComponent() {
  const userData = useUserStore(state => state.userData);
  let nickName;

  console.log(userData[0].nickname);
  if (userData.length > 0) {
    // userChallengeList[0]에서 데이터를 가져옴
    nickName = userData[0].nickname;
  }
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.tabTitleText}>더보기</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <View>
              <Text style={styles.userInfoText}>{nickName}님의 보유 캐시</Text>
            </View>
            <View>
              <Text style={styles.userPointText}>5,525 P</Text>
            </View>
          </View>
          <View style={styles.depositContianer}>
            <View>
              <TouchableOpacity
                style={[
                  styles.depositListBtn,
                  {backgroundColor: colors.inputGreyColor},
                ]}>
                <Text style={styles.depositListBtnText}>출금 내역</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={[
                  styles.depositListBtn,
                  {backgroundColor: colors.blueText},
                ]}>
                <Text style={styles.depositBtnText}>출금하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20,
  },
  tabTitleText: {
    fontSize: 20,
    color: colors.blueText,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    gap: 50,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    borderColor: colors.blueText,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: 20,
    color: colors.blackText,
    fontWeight: 'bold',
  },
  userPointText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  depositContianer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  depositListBtn: {
    backgroundColor: 'red',
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  depositListBtnText: {
    color: colors.blackText,
    fontWeight: 'bold',
    fontSize: 16,
  },
  depositBtnText: {
    color: colors.input,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default MoreComponent;
