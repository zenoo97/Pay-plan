import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useUserStore} from '../../store/getUser';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import {colors} from '../../color';

function AfterMakeChallenge() {
  // userChallengeList가 비어 있지 않은지 확인
  const userChallengeList = useUserStore(state => state.userChallengeList);

  // 초기 변수 정의
  let challenge_name, goal_period_end, goal_period_start, goal_price;

  if (userChallengeList.length > 0) {
    // userChallengeList[0]에서 데이터를 가져옴
    ({challenge_name, goal_period_end, goal_period_start, goal_price} =
      userChallengeList[0]);
    console.log(
      userChallengeList[0],
      '유저 챌린지 리스트 in AfterMakeChallenge',
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <AnimatedProgressWheel
          size={300}
          width={20}
          color={colors.blueText}
          progress={45}
          backgroundColor={colors.input}
        />
        <View style={styles.challengeInfo}>
          <View>
            <Text style={styles.challengeNameText}>
              {challenge_name} {/* challenge_name 출력 */}
            </Text>
          </View>
          <View>
            <Text style={styles.challengeDateText}>
              {goal_period_start} - {goal_period_end} {/* 기간 출력 */}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.usedInfo}>
        <View>
          <Text style={styles.goalPriceText}>
            목표 금액의 45%를 사용했어요.
          </Text>
        </View>
        <View style={styles.dateInfoText}>
          <View>
            <Text style={styles.latesDateText}>
              남은 일수: <Text style={styles.latesDayText}>4일</Text> / 7일
            </Text>
          </View>
          <View>
            <Text style={styles.latesPriceText}>
              잔액: <Text style={styles.latePriceText}>135,000원</Text> /{' '}
              {goal_price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    gap: 20,
  },
  circleImg: {
    width: 350,
    height: 350,
  },
  challengeInfo: {
    alignItems: 'center',
    position: 'absolute',
    left: 65,
    top: 140,
    gap: 10,
  },
  challengeNameText: {
    color: colors.blackText,
    fontSize: 20,
    fontWeight: '700',
  },
  challengeDateText: {
    color: colors.blackText,
    fontWeight: '700',
  },
  usedInfo: {
    alignItems: 'center',
    gap: 20,
  },
  goalPriceText: {
    color: colors.blackText,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateInfoText: {
    alignItems: 'center',
  },
  latesDayText: {
    color: colors.blueText,
    fontSize: 19,
  },
  latesDateText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.blackText,
  },
  latesPriceText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.blackText,
  },
  latePriceText: {
    color: colors.blueText,
    fontSize: 19,
  },
});
export default AfterMakeChallenge;
