import { ProjectsDataType } from 'shared/project.data';
import { ImageSourcePropType, StyleProp, TextStyle } from 'react-native';

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

export type DonateButtonPropsType = {
  donate_url: string;
  buttonText: string;
  buttonBackgroundColor: string;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonIcon?: ImageSourcePropType;
};

export type ShareButtonPropsType = {
  share_url: string;
};

export type CapsuleButtonPropsType = {
  showText: string | number;
  isSelected?: boolean;
  capsuleWidth?: number | string;
  returnText: string | number;
  showCancelIcon?: boolean;
  capsuleEnabled?: boolean;
  handleCancelIconPress?: () => void;
  handleCapsuleButtonPress?: (text: string | number) => void;
};
