import React, {useEffect} from 'react';
import {useUserStore} from '../store/getUser';
import {supabase} from '../lib/supabase';

const ChallengeManager = () => {
  const userChallengeList = useUserStore(state => state.userChallengeList);

  useEffect(() => {
    const checkChallenges = async () => {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0]; // 현재 날짜
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // 내일 날짜
      const tomorrowString = tomorrow.toISOString().split('T')[0];

      for (const challenge of userChallengeList) {
        // 챌린지의 종료 날짜와 비교
        if (challenge.goal_period_end === todayString) {
          // 챌린지가 오늘 종료된 경우
          await updateChallengeStatus(challenge.challenge_id, false); // 종료 처리
        } else if (challenge.goal_period_end === tomorrowString) {
          // 챌린지가 내일 종료될 경우
          await updateChallengeStatus(challenge.challenge_id, false); // 종료 처리
        }
      }
    };

    checkChallenges();
  }, [userChallengeList]);

  const updateChallengeStatus = async (challengeId, isSuccess) => {
    const status = isSuccess ? 'success' : 'failure';
    const {error} = await supabase
      .from('users_maked_challenge')
      .update({current_status: false, result: status}) // 상태 업데이트
      .eq('challenge_id', challengeId);

    if (error) {
      console.error('챌린지 상태 업데이트 오류:', error);
    } else {
      console.log(`챌린지 ${challengeId} 상태 업데이트 완료: ${status}`);
    }
  };

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default ChallengeManager;
