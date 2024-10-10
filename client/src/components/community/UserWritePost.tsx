import {StyleSheet, View, Text} from 'react-native';
import {height, scale, width} from '../../shared/phoneSize';
import {colors} from '../../color';
import React from 'react';

const UserWritePost = () => {
  return (
    <View style={styles.infoContainer}>
      <View>
        <View style={styles.userInfo}>
          <View>
            <View style={styles.profile}></View>
          </View>
          <View>
            <View>
              <Text style={styles.idText}>subin2569</Text>
            </View>
            <View>
              <Text>@subin</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottom}></View>
        <View style={styles.challengeInfo}>
          <View>
            <Text>
              <Text style={styles.challengeName}>챌린지명</Text>: 일주일
              만원으로 살기
            </Text>
          </View>
          <View>
            <Text>목표 금액의 45%를 사용했어요!</Text>
          </View>
          <View>
            <Text>
              <Text style={styles.challengeName}>잔액</Text>: 135,000원 /
              300,000
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.favorityBtn}>
        <Text style={styles.favorityBtnText}>칭찬하기</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10 * width,
    padding: 40 * width,
    gap: 10,
    marginBottom: 10 * height,
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150 * width,
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
  bottom: {
    borderBottomWidth: 0.5,
    paddingVertical: 5,
  },
  challengeInfo: {
    alignItems: 'center',
  },
  challengeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  favorityBtn: {
    alignItems: 'center',
    backgroundColor: colors.blueText,
    height: 30 * height,
    justifyContent: 'center',
    borderRadius: 10,
  },
  favorityBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default UserWritePost;
