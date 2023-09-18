import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
  LayoutAnimation,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { RootStackParamList } from 'types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import Styles from './index.style';
import ProgressBar from 'components/ProgressBar';
import DonateButton from 'components/DonateButton';
import ShareButton from 'components/ShareButton';
import WishConceptContent from 'components/WishConceptContent';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'ProjectDetail'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProjectDetail'>;
};

export default function ProjectDetailPage({
  route,
  navigation,
}: PageRouterProps) {
  const statusBarHeight = StatusBar.currentHeight;
  const [scrollingPosition, setScrollingPosition] = useState(0);
  const [projectInfoHeight, setProjectInfoHeight] = useState(0);
  const [shouldShowDonateButton, setShouldShowDonateButton] = useState(true);
  const { projectData, wishData, originEntry } = route.params;
  const dimensionsWidth = 360 * (Dimensions.get('window').width / 360);
  const limitHeight = (Dimensions.get('window').height / 800) * 110;
  const [imageHeight, setImageHeight] = useState(
    360 * (Dimensions.get('window').width / 360),
  );

  const handleProgressCalc = (
    received: number | undefined,
    total: number | undefined,
  ) => {
    if (!received || !total) {
      return 0;
    }
    return (received / total) * 100;
  };

  const scrollOffset = useRef(0);
  const animation = useRef(new Animated.Value(1)).current;

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    let newShouldShow = shouldShowDonateButton;
    if (isReachedEnd(event.nativeEvent)) {
      setShouldShowDonateButton(true);
    }
    if (currentOffset < limitHeight) {
      setImageHeight(dimensionsWidth - currentOffset);
      setScrollingPosition(currentOffset);
    }

    if (currentOffset > 30) {
      if (currentOffset > scrollOffset.current || currentOffset === 0) {
        newShouldShow = false;
      } else {
        newShouldShow = true;
      }

      if (
        newShouldShow !== shouldShowDonateButton &&
        (!newShouldShow || currentOffset > 30)
      ) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        scrollOffset.current = currentOffset;
        setShouldShowDonateButton(newShouldShow);
      }
    }

    scrollOffset.current = currentOffset;
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: shouldShowDonateButton ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [shouldShowDonateButton, animation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const isReachedEnd = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 30;
    const isEnd =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    return isEnd;
  };

  const handleReachEnd = (event: any) => {
    if (isReachedEnd(event.nativeEvent)) {
      setShouldShowDonateButton(true);
    }
  };

  const renderProjectDetail = () => {
    if (projectData) {
      return (
        <>
          <View
            style={[
              Styles.donateDetailImageContainer,
              { top: statusBarHeight! + 26 },
            ]}
          >
            <TouchableOpacity onPress={handleGoBack}>
              <Image source={ImageProvider.FilterResult.GoBackIcon} />
            </TouchableOpacity>
            <ShareButton share_url={projectData.donate_url} type="project" />
          </View>
          <Image
            style={[
              Styles.donateDetailImage,
              { width: dimensionsWidth, height: imageHeight },
            ]}
            source={ImageProvider.WishMap.ProjectFullImage}
          />
          <View
            onLayout={event => {
              const { height } = event.nativeEvent.layout;
              setProjectInfoHeight(height);
            }}
            style={[
              [
                Styles.donateDetailInfoBlock,
                { width: dimensionsWidth, top: imageHeight - 20 },
              ],
              scrollingPosition > 0
                ? Styles.donateDetailInfoBlockUnScrolling
                : Styles.donateDetailInfoBlockIsScrolling,
            ]}
          >
            <Text style={Styles.donateDetailInfoBlockTitle}>
              {projectData.title}
            </Text>
            <View style={Styles.donateDetailLocationContainer}>
              <Image source={ImageProvider.WishMap.LocationYellowIcon} />
              <Text>{`${projectData?.city_country}${projectData?.district}`}</Text>
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
                progressColor="#FFB549"
                progressHeight={10}
              />
            </View>
          </View>

          <ScrollView
            onScroll={handleScroll}
            style={{
              marginTop: projectInfoHeight - 20,
              paddingHorizontal: 16,
            }}
            decelerationRate={0.2}
            onScrollEndDrag={handleReachEnd}
          >
            <View style={Styles.separator} />
            <Text style={Styles.donateInfoDescriptionHint}>贊助小文</Text>
            <View style={Styles.donateDetailDescriptionContainer}>
              <Text style={Styles.donateInfoDescription}>
                {projectData.description}
              </Text>
            </View>
          </ScrollView>

          <Animated.View
            style={[Styles.donateButtonContainer, { opacity: animation }]}
          >
            <DonateButton
              donate_url={projectData.donate_url}
              buttonText={'立即捐款'}
              buttonBackgroundColor="#FF585D"
              buttonTextStyle={Styles.donateButtonText}
            />
          </Animated.View>
        </>
      );
    }
  };

  const renderWishDetail = () => {
    if (wishData) {
      return (
        <>
          <View
            style={[
              Styles.wishDetailImageContainer,
              {
                top: statusBarHeight! + 26,
              },
            ]}
          >
            <TouchableOpacity onPress={handleGoBack}>
              <Image source={ImageProvider.FilterResult.GoBackIcon} />
            </TouchableOpacity>
            <ShareButton share_url={wishData.donate_url} type="project" />
          </View>
          <Image
            style={[
              Styles.wishDetailImage,
              {
                width: dimensionsWidth,
                height: imageHeight,
              },
            ]}
            source={wishData.cover_image}
          />
          <View
            style={[Styles.wishDetailEmptyBlock, { top: imageHeight - 15 }]}
          ></View>
          <ScrollView
            onScroll={handleScroll}
            decelerationRate={0.2}
            onScrollEndDrag={handleReachEnd}
          >
            <View
              onLayout={event => {
                const { height } = event.nativeEvent.layout;
                setProjectInfoHeight(height);
              }}
              style={[
                Styles.wishDetailContainer,
                {
                  width: dimensionsWidth,
                },
              ]}
            >
              <WishConceptContent wishData={wishData} />
            </View>
          </ScrollView>

          <Animated.View
            style={[Styles.donateButtonContainer, { opacity: animation }]}
          >
            <DonateButton
              donate_url={wishData.donate_url}
              buttonText={'立即捐款'}
              buttonBackgroundColor="#FF585D"
              buttonTextStyle={Styles.donateButtonText}
            />
          </Animated.View>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <FocusAwareStatusBar
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />
      {projectData && originEntry !== 'wishMap'
        ? renderProjectDetail()
        : renderWishDetail()}
    </SafeAreaView>
  );
}
