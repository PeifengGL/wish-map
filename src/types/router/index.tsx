import { ProjectsDataType, WishDataType } from 'shared/project.data';

export type RootStackParamList = {
  Home: { id?: string };
  TestPage: { text?: string };
  HomeTabs: {};
  Welcome: {};
  Registration: {};
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
};
