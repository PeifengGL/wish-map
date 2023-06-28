import { ProjectsDataType } from 'shared/project.data';
import { ArticlesDataType } from 'shared/articles.data';
import {
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { VolunteerInfoDataType } from 'shared/volunteer.data';

export type ProgressBarPropsType = {
  progress: number;
  progressColor?: string;
  progressHeight?: number;
};

export type FilterToolButtonPropsType = {
  isSelected?: boolean;
  handleFilterToolClick: () => void;
};

export type ProjectCardPropsType = {
  projectData: ProjectsDataType;
  descriptionLineLimit: number;
};

export type ArticleCardPropsType = {
  articleData: ArticlesDataType;
};

export type VolunteerCardPropsType = {
  volunteerInfoData: VolunteerInfoDataType;
};

export type DonateButtonPropsType = {
  donate_url: string;
  buttonText: string;
  buttonBackgroundColor: string;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonIcon?: ImageSourcePropType;
};

export type ShareButtonPropsType = {
  share_url: string;
  type: 'project' | 'article';
  shareIcon?: ImageSourcePropType;
};

export type CapsuleButtonPropsType = {
  showText: string | number;
  returnText: string | number;
  isSelected?: boolean;
  capsuleWidth?: number | string;
  showCancelIcon?: boolean;
  capsuleEnabled?: boolean;
  capsuleContainerStyle?: StyleProp<ViewStyle>;
  capsuleTextStyle?: StyleProp<TextStyle>;
  handleCancelIconPress?: () => void;
  handleCapsuleButtonPress?: (text: string | number) => void;
};

export type WishRadioButtonPropsType = {
  isSelected: boolean;
  radioClickFunction: (text: string) => void;
  itemText?: string;
};
