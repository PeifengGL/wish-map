import { ProjectsDataType, WishDataType } from 'shared/project.data';
import { ArticlesDataType } from 'shared/articles.data';
import { WishApplyStepOneDataType } from 'types/wishMap';

export type RootStackParamList = {
  Loading: {};
  Home: { id?: string };
  TestPage: { text?: string };
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
    articleData?: ArticlesDataType;
  };
  VolunteerApply: {};
  WishApply: {};
  WishApplyNextStep: { stepOneData: WishApplyStepOneDataType };
};

export type ProfileStackParamList = {
  EditProfile: {};
  EditUsername: {};
  EditEmail: {};
  EditPhone: {};
  EditAddress: {};
};

export type SettingStackParamList = {
  Setting: { cancelDeleteAccountStatus?: boolean };
  ChangePassword: { resetPasswordStatus?: boolean };
  ResetPassword: {};
  DeleteAccount: {};
  DeleteAccountReason: {};
  DeleteAccountSafeCheck: {};
  ReportIssue: {};
  Fqa: {};
  AboutWish: {};
  PrivacyPolicy: {};
  TermOfUse: {};
};

export type IdentityType = 'guest' | 'member' | '';
