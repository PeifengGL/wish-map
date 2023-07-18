import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  RootStackParamList,
  ProfileStackParamList,
  SettingStackParamList,
} from 'types/router';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import DataShareService from 'service';
import Styles from './index.style';
import { Avatar } from 'react-native-paper';
import { UserProfileType } from 'types/profile';

import ImageProvider from 'assets';
import { Subscription } from 'rxjs';
import FocusAwareStatusBar from 'util/StatusBarAdapter';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Profile'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
};

export default function ProfilePage({ navigation }: PageRouterProps) {
  const statusBarHeight = StatusBar.currentHeight;

  const [userProfile, setUserProfile] = useState<UserProfileType>();
  const [scrollingPosition, setScrollingPosition] = useState(0);
  const [projectInfoHeight, setProjectInfoHeight] = useState(0);
  const [imageHeight, setImageHeight] = useState(
    (Dimensions.get('window').height + statusBarHeight!) * 0.35,
  );

  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const settingNavigation =
    useNavigation<NativeStackNavigationProp<SettingStackParamList>>();
  const dimensionsWidth = 360 * (Dimensions.get('window').width / 360);
  const maxImageHeight =
    (Dimensions.get('window').height + statusBarHeight!) * 0.35;
  const maxOffset =
    (Dimensions.get('window').height + statusBarHeight!) * 0.35 * 0.3;

  const scrollOffset = useRef(0);

  const [donateData, setDonateData] = useState<any[]>([
    {
      id: 1,
      title: '標題1',
      dateTime: '2023 年 4 月 26 日 上午 9:00',
      donateAmount: 3000,
      donorName: '吳康仁',
      donorEmail: 'XXXX@gmail.com',
      donorPhone: '0935-XXX-XXX',
      donorCompany: '資旅軟體開發有限公司',
      receiptAddress: '臺北市信義區基隆路1段206號18樓',
      isExpanded: false,
    },
    {
      id: 2,
      title: '標題2',
      dateTime: '2023 年 4 月 29 日 下午 4:50',
      donateAmount: 4500,
      donorName: '吳康仁',
      donorEmail: 'XXXX@gmail.com',
      donorPhone: '0935-XXX-XXX',
      donorCompany: '資旅軟體開發有限公司',
      receiptAddress: '臺北市信義區基隆路1段206號18樓',
      isExpanded: false,
    },
    {
      id: 3,
      title: '標題3',
      dateTime: '2023 年 4 月 12 日 下午 4:50',
      donateAmount: 9999,
      donorName: '吳康仁',
      donorEmail: 'XXXX@gmail.com',
      donorPhone: '0935-XXX-XXX',
      donorCompany: '資旅軟體開發有限公司',
      receiptAddress: '臺北市信義區基隆路1段206號18樓',
      isExpanded: false,
    },
  ]);

  useEffect(() => {
    const userProfileSubscription: Subscription =
      DataShareService.getUserProfile$().subscribe(
        (newUserProfile: UserProfileType) => {
          setUserProfile(newUserProfile);
        },
      );
    return () => {
      userProfileSubscription.unsubscribe();
    };
  }, []);

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset < maxOffset) {
      setImageHeight(maxImageHeight - currentOffset * 0.8);
      setScrollingPosition(currentOffset);
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    scrollOffset.current = currentOffset;
  };

  const startClick = () => {
    rootNavigation.navigate('WishMap', {});
  };

  const noDonateRecord = () => {
    return (
      <View
        style={{
          backgroundColor: '#EBF1F9',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontFamily: 'Lato',
            fontSize: 16,
            color: '#75787B',
            marginBottom: 12,
          }}
        >
          尚未有任何捐款紀錄
        </Text>
        <Text
          style={{
            fontFamily: 'Lato',
            fontSize: 24,
            color: '#FF585D',
            marginBottom: 12,
            fontWeight: '700',
          }}
        >
          一起幫助喜願兒願望成真!
        </Text>
        <Image
          source={ImageProvider.Profile.GuestHintImage}
          style={{ marginBottom: 12 }}
        />
        <TouchableOpacity
          onPress={startClick}
          style={{
            backgroundColor: '#0057B8',
            width: '100%',
            borderRadius: 30,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              marginVertical: 12,
              fontFamily: 'Lato',
              color: '#FFFFFF',
            }}
          >
            開始吧!
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const toggleExpanded = (index: number) => {
    const updatedDonateData = [...donateData];
    updatedDonateData[index].isExpanded = !updatedDonateData[index].isExpanded;
    setDonateData(updatedDonateData);
  };

  const handleEditProfileClick = () => {
    navigation.push('EditProfile', {});
  };

  const handleSettingClick = () => {
    settingNavigation.navigate('Setting', {});
  };

  const handleLoginClick = () => {
    if (userProfile?.userType === 'guest') {
      DataShareService.setUserProfile({
        userName: '',
        userEmail: '',
        userPhone: '',
        userAddress: '',
        userUID: '',
        userType: '',
        userPassword: '',
      });
      return;
    }
    rootNavigation.navigate('WishMap', {});
  };

  return (
    <View style={Styles.container}>
      <FocusAwareStatusBar
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle="light-content"
        translucent={true}
      />
      <TouchableOpacity
        onPress={handleSettingClick}
        style={[
          Styles.donateDetailImageContainer,
          { top: statusBarHeight! + 16 },
        ]}
      >
        <Image source={ImageProvider.Profile.OpenSettingIcon} />
      </TouchableOpacity>
      <Image
        style={[
          Styles.donateDetailImage,
          { width: dimensionsWidth, height: imageHeight, resizeMode: 'cover' },
        ]}
        source={ImageProvider.Profile.ProfileBG}
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
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#ffffff',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: -40,
            left: 16,
          }}
        >
          {userProfile?.userType === 'member' ? (
            <Avatar.Image size={70} source={ImageProvider.Profile.UserAvatar} />
          ) : (
            <Avatar.Image
              size={70}
              source={ImageProvider.Profile.DefaultAvatar}
            />
          )}
        </View>
        {userProfile?.userType === 'guest' ? (
          <TouchableOpacity
            onPress={handleLoginClick}
            style={{
              backgroundColor: '#0057B8',
              position: 'absolute',
              top: -20,
              right: 16,
              padding: 8,
              borderRadius: 30,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                marginHorizontal: 12,
                marginVertical: 4,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <Image source={ImageProvider.Profile.ProfileLoginIcon} />
              <Text
                style={{
                  color: '#ffffff',
                  fontFamily: 'Lato',
                  fontSize: 11,
                  marginLeft: 4,
                }}
              >
                登入/註冊
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        <View
          style={{
            marginTop: 40,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 8,
          }}
        >
          {userProfile?.userType === 'member' ? (
            <Text style={Styles.userNameText}>{userProfile.userName}</Text>
          ) : (
            <Text style={Styles.userNameText}>訪客</Text>
          )}
          {userProfile?.userType === 'member' && (
            <TouchableOpacity
              onPress={handleEditProfileClick}
              style={Styles.editButtonContainer}
            >
              <Image source={ImageProvider.Profile.EditProfileIcon} />
              <Text style={Styles.editButtonText}>編輯</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {userProfile?.userType === 'member' ? (
        <ScrollView
          onScroll={handleScroll}
          style={{
            marginTop: projectInfoHeight - 20,
            paddingHorizontal: 16,
            backgroundColor: '#ffffff',
          }}
          decelerationRate={0.2}
        >
          <View style={{ flex: 1, paddingTop: 16 }}>
            <View style={Styles.infoArea}>
              <Text
                style={Styles.infoText}
              >{`電子信箱：${userProfile.userEmail}`}</Text>
              <Text
                style={Styles.infoText}
              >{`手機號碼：${userProfile.userPhone}`}</Text>
              <Text
                style={Styles.infoText}
              >{`聯絡地址：${userProfile.userAddress}`}</Text>
            </View>
            <View style={Styles.separator} />
          </View>
          <Text
            style={{
              fontFamily: 'Lato',
              fontSize: 16,
              color: '#1A1A1A',
              marginBottom: 16,
            }}
          >
            捐款紀錄
          </Text>
          {donateData.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#0057B880',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View>
                    <Text style={{ marginBottom: 6 }}>{data.dateTime}</Text>
                    <Text
                      style={{
                        color: '#0057B8',
                        fontSize: 16,
                        fontFamily: 'Lato',
                      }}
                    >
                      {data.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: '#FF585D',
                        fontSize: 12,
                        marginRight: 24,
                      }}
                    >
                      {`NT$ ${data.donateAmount}`}
                    </Text>

                    <TouchableOpacity onPress={() => toggleExpanded(index)}>
                      {data.isExpanded ? (
                        <Image source={ImageProvider.Profile.CollapsingIcon} />
                      ) : (
                        <Image source={ImageProvider.Profile.ExpandIcon} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <DonateView expanded={data.isExpanded} data={data} />
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <ScrollView
          onScroll={handleScroll}
          style={{
            marginTop: projectInfoHeight - 20,
            paddingHorizontal: 16,
            backgroundColor: '#ffffff',
          }}
          decelerationRate={0.2}
        >
          <View style={[Styles.separator, { marginTop: 0 }]} />
          <Text
            style={{
              fontFamily: 'Lato',
              fontSize: 16,
              color: '#1A1A1A',
              marginBottom: 16,
            }}
          >
            捐款紀錄
          </Text>
          <View style={{ marginBottom: 24 }}>{noDonateRecord()}</View>
        </ScrollView>
      )}
    </View>
  );
}

const DonateView = ({ expanded, data }: { expanded: boolean; data: any }) => {
  const [height] = useState(new Animated.Value(0));
  const [separatorHeight] = useState(new Animated.Value(0));
  const [textHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: expanded ? 104 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(separatorHeight, {
      toValue: expanded ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(textHeight, {
      toValue: expanded ? 104 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [expanded, height, separatorHeight, textHeight]);

  return (
    <Animated.View style={{ height }}>
      <Animated.View
        style={{
          height: separatorHeight,
          backgroundColor: '#CCCCCC',
          marginVertical: 12,
        }}
      />
      <Animated.View style={{ height: textHeight }}>
        <Text
          style={Styles.donateDetailInfoBlockTitle}
        >{`捐款人姓名：${data.donorName}`}</Text>
        <Text
          style={Styles.donateDetailInfoBlockTitle}
        >{`電子信箱：${data.donorEmail}`}</Text>
        <Text
          style={Styles.donateDetailInfoBlockTitle}
        >{`手機號碼：${data.donorPhone}`}</Text>
        <Text
          style={Styles.donateDetailInfoBlockTitle}
        >{`收據抬頭：${data.donorCompany}`}</Text>
        <Text
          style={Styles.donateDetailInfoBlockTitle}
        >{`收據接收地址：${data.receiptAddress}`}</Text>
      </Animated.View>
    </Animated.View>
  );
};
