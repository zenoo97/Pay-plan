import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Animated} from 'react-native';
import Lottie from 'lottie-react-native'; // Lottie import
import {useRoute} from '@react-navigation/native';
import {width} from '../../shared/phoneSize';

function ChallengeResultComponent() {
  // const route = useRoute();
  // const {updatedData} = route.params;
  const [showDetails, setShowDetails] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  // console.log(userChallengeList);
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setShowDetails(true);
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {!showDetails && (
        <Animated.View style={{opacity: fadeAnim}}>
          <Text style={styles.title}>챌린지가 종료되었습니다!</Text>
          <Lottie
            source={require('../../../public/animation/finishAnimation')} // 애니메이션 파일 경로 수정
            autoPlay
            loop={false}
            style={styles.animation}
          />
        </Animated.View>
      )}

      {showDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.challengeName}>
            {/* {userChallengeList.challenge_name} */}
          </Text>
          <Text style={styles.status}>성공적으로 완료!</Text>
          <Text style={styles.details}>
            사용한 금액: 20,000원 / 목표 금액: 150,000원
          </Text>
          <Text style={styles.details}>종료 날짜: 2024-10-01</Text>
          <Button
            title="다시 도전하기"
            onPress={() => {
              /* 다시 도전하기 로직 */
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20 * width,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  animation: {
    width: 150, // 애니메이션 크기 조정
    height: 150,
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  challengeName: {
    fontSize: 20,
    marginBottom: 5,
  },
  status: {
    fontSize: 18,
    color: '#4caf50',
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ChallengeResultComponent;
