import {create} from 'zustand';

export const useUserStore = create(set => ({
  userData: [], // 초기 상태
  userChallengeList: [],
  userUsedData: [],
  addUser: val => {
    set(prev => ({
      userData: [
        ...prev.userData,
        {content: val, id: new Date().getTime() + val},
      ],
    }));
  },
  addMakedChallenge: val => {
    set(prev => ({
      userChallengeList: [
        ...prev.userChallengeList,
        {content: val, id: new Date().getTime() + val},
      ],
    }));
  },
  addUsedData: val => {
    set(prev => ({
      userUsedData: [
        ...prev.userUsedData,
        {content: val, id: new Date().getTime() + val},
      ],
    }));
  },
}));
