import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ProjectCardPropsType } from 'types/components';
import { RootStackParamList } from 'types/router';

import ImageProvider from 'assets';
import ProgressBar from 'components/ProgressBar';
import DonateButton from 'components/DonateButton';
import ShareButton from 'components/ShareButton';
import Styles from './index.style';

const ProjectCard = (props: ProjectCardPropsType) => {
  const { projectData, descriptionLineLimit } = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleProgressCalc = (
    received: number | undefined,
    total: number | undefined,
  ) => {
    if (!received || !total) {
      return 0;
    }
    return (received / total) * 100;
  };

  const handleCardClick = () => {
    navigation.navigate('ProjectDetail', { projectData, originEntry: 'other' });
  };

  return (
    <View style={Styles.projectCardContainer}>
      <TouchableOpacity onPress={handleCardClick} activeOpacity={1}>
        <View style={Styles.coverImageContainer}>
          <Image source={projectData.cover_image} style={Styles.coverImage} />
          <View style={Styles.shareButtonContainer}>
            <ShareButton share_url={projectData.donate_url} type="project" />
          </View>
        </View>

        <View style={Styles.donateInfoContainer}>
          <Text style={Styles.donateInfoText}>
            目前 ${projectData?.donation_received} / 目標 $
            {projectData?.total_donation}
          </Text>
          <Text style={Styles.donateInfoText}>
            {projectData?.donation_received && projectData?.total_donation
              ? `${handleProgressCalc(
                  projectData.donation_received,
                  projectData.total_donation,
                )}%`
              : '0%'}
          </Text>
        </View>

        <View style={Styles.progressBarContainer}>
          <ProgressBar
            progress={handleProgressCalc(
              projectData?.donation_received,
              projectData?.total_donation,
            )}
            progressColor="#0057B8"
          />
        </View>

        <View style={Styles.projectInfoContainer}>
          <Text style={Styles.projectTitleText}>{projectData?.title}</Text>
          <View style={Styles.projectLocationContainer}>
            <Image source={ImageProvider.WishMap.PopupLocationIcon} />
            <Text
              style={Styles.projectLocationText}
            >{`${projectData?.city_country}${projectData?.district}`}</Text>
          </View>
        </View>

        <Text
          numberOfLines={descriptionLineLimit}
          ellipsizeMode="tail"
          style={Styles.projectDescriptionText}
        >
          {/* {projectData?.description} */}
        </Text>
        <View style={Styles.donateButtonContainer}>
          <DonateButton
            buttonText={'立即捐款'}
            donate_url={projectData.donate_url}
            buttonBackgroundColor={'#FF585D'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProjectCard;
