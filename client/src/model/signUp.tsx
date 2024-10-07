export type CheckResultAtSignUp = {
  nickNameCheck: {
    value: string;
    status: boolean;
  };
  idCheck: {
    value: string;
    status: boolean;
  };
};
export type SignUpScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};
export type SignUpInsert = {
  data: UserInfoAtSignUp[];
};
export type UserInfoAtSignUp = {
  created_at: number;
  current_challenge_num: null;
  id: number;
  nickname: string;
  password: string;
  user_id: string;
};

export type UserStore = {
  userData: User[];
  userChallengeList: UserChallengeList[];
  addMakedChallenge: (challenge: any) => void;
  updateUserData: (user: User) => void;
  addUserChallengeListAllData: (data: any) => void;
  addUser: (data: any) => void;
  addUsedData: (data: any) => void;
};
export type User = {
  user_id: string;
  nickName: string;
};

export type UserChallengeList = {
  challenge_id: number;
  challenge_name: string;
  challenge_result: any;
  created_at: string;
  current_status: boolean;
  goal_period_end: string;
  goal_period_start: string;
  goal_price: string;
  user_id: string;
};
