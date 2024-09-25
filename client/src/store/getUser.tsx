import {create} from 'zustand';

export const useUserStore = create(set => ({
  userData: [], // 초기 상태
  userChallengeList: [],
  userUsedData: [],
  addUser: val => {
    set(prev => ({
      userData: [...prev.userData, ...val],
    }));
  },
  addMakedChallenge: val => {
    set(prev => ({
      userChallengeList: [...prev.userChallengeList, val],
    }));
  },
  addUsedData: val => {
    set(prev => ({
      userUsedData: [...prev.userUsedData, ...val],
    }));
  },
}));

// 챌린지를 눌렀을 때 데이터를 가져와야 한다
// 1. 유저가 만든 챌린지를 가져와야 한다. -> id로 조회
// 2. 클릭하면 챌린지id를 가져와서
// 3. 사용한 금액 리스트를 조회
// 4. 가져와서 뿌려준다.
