import { ImageSourcePropType } from 'react-native';
import ImageProvider from 'assets';

export type VolunteerInfoDataType = {
  volunteerInfo_id: number;
  title: string;
  date_time: string;
  cover_image: ImageSourcePropType;
  type: string;
  location: string;
  shortage: number;
  registration_time: string;
};

type MessageObject = {
  [key: string]: string;
};

export const VolunteerClass = {
  '0': '全部',
  '1': '院訪',
  '2': '家訪',
  '3': '一般活動',
  '4': '專案信活動',
} as MessageObject;

export const VolunteerInfoData: VolunteerInfoDataType[] = [
  {
    volunteerInfo_id: 1,
    title: '活動標題1',
    date_time: '2023/09/24 12:59-23:59',
    cover_image: ImageProvider.Volunteer.VolunteerCoverImage1,
    type: '3',
    location: '台北市',
    shortage: 20,
    registration_time: '2023/04/24 - 2023/09/17',
  },
  {
    volunteerInfo_id: 2,
    title: '活動標題2',
    date_time: '2023/09/24 12:59-23:59',
    cover_image: ImageProvider.Volunteer.VolunteerCoverImage1,
    type: '1',
    location: '新北市',
    shortage: 15,
    registration_time: '2023/04/24 - 2023/09/17',
  },
  {
    volunteerInfo_id: 3,
    title: '活動標題3',
    date_time: '2023/09/24 12:59-23:59',
    cover_image: ImageProvider.Volunteer.VolunteerCoverImage1,
    type: '4',
    location: '台北市',
    shortage: 10,
    registration_time: '2023/04/24 - 2023/09/17',
  },
  {
    volunteerInfo_id: 4,
    title: '活動標題4',
    date_time: '2023/09/24 12:59-23:59',
    cover_image: ImageProvider.Volunteer.VolunteerCoverImage1,
    type: '3',
    location: '台北市',
    shortage: 5,
    registration_time: '2023/04/24 - 2023/09/17',
  },
  {
    volunteerInfo_id: 5,
    title: '活動標題5',
    date_time: '2023/09/24 12:59-23:59',
    cover_image: ImageProvider.Volunteer.VolunteerCoverImage1,
    type: '2',
    location: '新北市',
    shortage: 35,
    registration_time: '2023/04/24 - 2023/09/17',
  },
];
