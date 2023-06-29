import React from 'react';
import { Text, View, Image } from 'react-native';
import { VolunteerCardPropsType } from 'types/components';
import ImageProvider from 'assets';
import Styles from './index.style';

const VolunteerCard = (props: VolunteerCardPropsType) => {
  const { volunteerInfoData } = props;

  return (
    <View style={Styles.cardContainer}>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View style={Styles.cardImageContainer}>
          <Image
            source={volunteerInfoData.cover_image}
            style={Styles.cardImage}
          />
        </View>
        <View style={Styles.childrenBox}>
          <Text style={Styles.titleText} numberOfLines={1}>
            {volunteerInfoData.title}
          </Text>

          <View style={Styles.rowContainer}>
            <Image source={ImageProvider.Volunteer.TimeIcon} />
            <Text style={Styles.rowText} numberOfLines={1}>
              {volunteerInfoData.date_time}
            </Text>
          </View>

          <View style={Styles.rowContainer}>
            <Image source={ImageProvider.Volunteer.TimeIcon} />
            <Text style={Styles.rowText} numberOfLines={1}>
              {volunteerInfoData.location}
            </Text>
          </View>

          <View style={Styles.rowContainer}>
            <Image source={ImageProvider.Volunteer.TimeIcon} />
            <Text style={Styles.rowText} numberOfLines={1}>
              {`尚缺 ${volunteerInfoData.shortage} 名志工`}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: 8, marginBottom: 8 }}>
        <Text style={{ color: '#FF585D', fontSize: 11 }}>
          {`報名時間：${volunteerInfoData.registration_time}\n需有志工訓練經驗及提供良民證`}
        </Text>
      </View>
    </View>
  );
};

export default VolunteerCard;
