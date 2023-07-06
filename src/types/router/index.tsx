import { ProjectsDataType, WishDataType } from 'shared/project.data';
import { ArticlesDataType } from 'shared/articles.data';
import { WishApplyStepOneDataType } from 'types/wishMap';

export type RootStackParamList = {
  Loading: {};
  Home: { id?: string };
  TestPage: { text?: string };
  HomeTabs: {};
  Welcome: {};
  Registration: {};
  Login: {};
  WishMap: { childPage?: string; enterOrigin?: string };
  Volunteer: { enterOrigin: string; data?: any };
  ArticleList: {};
  Profile: {};
  FilterResult: {};
  ProjectDetail: {
    projectData?: ProjectsDataType;
    wishData?: WishDataType;
    enterOrigin: string;
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
  Setting: {};
  ChangePassword: {};
  ResetPassword: {};
  DeleteAccount: {};
};

export type IdentityType = 'guest' | 'member' | '';
