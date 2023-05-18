import welcome_bg1 from 'assets/images/welcome_bg1.png';
import welcome_bg2 from 'assets/images/welcome_bg2.png';
import welcome_bg3 from 'assets/images/welcome_bg3.png';
import { ImageSourcePropType } from 'react-native';

export interface WelcomeDataType {
  key: string;
  text: string;
  image: ImageSourcePropType;
  fontColor: string;
}

export const welcome_data: WelcomeDataType[] = [
  {
    key: 'welcome_intro_1',
    text: '協助台灣地區 3 歲以上未滿 18 歲的重症病童實現心中最大的願望。\n我們深信願望成真將為喜願兒及其家人帶來翻轉生命的力量。',
    image: welcome_bg1,
    fontColor: '#0057B8',
  },
  {
    key: 'welcome_intro_2',
    text: '喜願的願景是協助每一位罹患威脅生命疾病的重症病童圓夢。',
    image: welcome_bg2,
    fontColor: 'white',
  },
  {
    key: 'welcome_intro_3',
    text: '圓夢的正面影響力持續散佈；\n給參與願望旅程各個階段的每個人。',
    image: welcome_bg3,
    fontColor: 'white',
  },
];
