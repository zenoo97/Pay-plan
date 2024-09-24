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
