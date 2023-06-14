import { ProjectsDataType, WishDataType } from 'shared/project.data';
import { ArticlesDataType } from 'shared/articles.data';

export type RootStackParamList = {
  Home: { id?: string };
  TestPage: { text?: string };
  HomeTabs: {};
  Welcome: {};
  Registration: {};
  Login: {};
  WishMap: { childPage?: string };
  Volunteer: {};
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
};

export type IdentityType = 'guest' | 'member' | '';
