import { ProjectsDataType, WishDataType } from 'shared/project.data';
import { WishApplyStepOneDataType } from 'types/wishMap';

export type RootStackParamList = {
  Loading: {};
  HomeTabs: {};
  Welcome: {};
  Registration: { isDeleteAccount?: boolean; isLogout?: boolean };
  Login: {};
  WishMap: { childPage?: string; originEntry?: string };
  Volunteer: { originEntry: string; data?: any };
  ArticleList: {};
  Profile: {};
  FilterResult: {};
  ProjectDetail: {
    projectData?: ProjectsDataType;
    wishData?: WishDataType;
    originEntry: string;
  };
  ArticleDetail: {
    articleId: string;
  };
  VolunteerApply: {};
  WishApply: {};
  WishApplyNextStep: { stepOneData: WishApplyStepOneDataType };
};

export type ProfileStackParamList = {
  EditProfile: {};
  EditUsername: { username: string };
  EditEmail: { email: string };
  EditPhone: { phone: string };
  EditAddress: { address: string };
};

export type SettingStackParamList = {
  Setting: { cancelDeleteAccountStatus?: boolean };
  ChangePassword: { resetPasswordStatus?: boolean };
  ResetPassword: {};
  DeleteAccount: {};
  DeleteAccountReason: {};
  DeleteAccountSafeCheck: {};
  Fqa: {};
  AboutWish: {};
  PrivacyPolicy: {};
  TermOfUse: {};
};

export type IdentityType = 'guest' | 'member' | '';
