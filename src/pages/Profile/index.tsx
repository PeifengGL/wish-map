import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
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
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import DataShareService from 'service';
import Styles from './index.style';
import { Avatar } from 'react-native-paper';
import { UserProfileType } from 'types/profile';

import ImageProvider from 'assets';
import FocusAwareStatusBar from 'util/StatusBarAdapter';

import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';
import { getCustomerInfo, getCustomerOrders } from 'api/Login';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Profile'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
};

export default function ProfilePage({ navigation }: PageRouterProps) {
  const statusBarHeight = StatusBar.currentHeight;

  const [userProfile, setUserProfile] = useState<UserProfileType>({
    userName: '',
    userEmail: '',
    userPhone: '',
    userAddress: '',
    userUID: '',
    userType: 'guest',
    userPassword: '',
  });
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

  const [donateData, setDonateData] = useState<any[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const [userAvatar, setUserAvatar] = useState<any>({ uri: '' });

  useFocusEffect(
    React.useCallback(() => {
      LocalStorage.getData(LocalStorageKeys.CustomerAccessTokenKey)
        .then(token => {
          if (token && typeof token === 'string') {
            getCustomerInfo(token).then(info => {
              if (info === null) {
                return;
              }
              let address;
              let displayAddress;
              if (info.defaultAddress !== null) {
                address = info.defaultAddress;
                displayAddress = `${address.zip || ''}${address.city || ''}${
                  address.address1 || ''
                }`;
              }
              const newUserProfile: UserProfileType = {
                userName: info?.displayName,
                userEmail: info?.email,
                userPhone: formatTaiwanPhoneNumber(info?.phone) || '',
                userAddress: displayAddress || '',
                userUID: info?.id,
                userType: 'member',
                userPassword: '',
              };
              setUserProfile(newUserProfile);
              LocalStorage.getData(
                `${LocalStorageKeys.ProfilePictureKey}${info?.email}`,
              ).then(uri => {
                if (uri === null || uri === '') {
                  setUserAvatar({ uri: '' });
                  return;
                } else if (uri !== undefined && typeof uri === 'string') {
                  setUserAvatar({ uri: uri });
                  return;
                }
              });
            });
          }
          return token;
        })
        .then(token => {
          if (token && typeof token === 'string') {
            setIsFetching(true);
            getCustomerOrders(token, '').then(orders => {
              setDonateData(orders.nodes);
              if (orders.pageInfo.hasNextPage) {
                setIsDataEnd(false);
                setEndCursor(orders.pageInfo.endCursor);
              } else {
                setIsDataEnd(true);
                setEndCursor('');
              }
            });
          }
        })
        .then(() => {
          setIsFetching(false);
        });
    }, []),
  );

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isDataEnd, setIsDataEnd] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string>('');

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    if (isDataEnd) {
      setIsFetching(false);
      return;
    }
    LocalStorage.getData(LocalStorageKeys.CustomerAccessTokenKey)
      .then(token => {
        if (token && typeof token === 'string') {
          getCustomerOrders(token, endCursor).then(orders => {
            setDonateData([...donateData, ...orders.nodes]);
            if (orders.pageInfo.hasNextPage) {
              setEndCursor(orders.pageInfo.endCursor);
            } else {
              setEndCursor('');
              setIsDataEnd(true);
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        setEndCursor('');
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [isFetching]);

  const formatTaiwanPhoneNumber = (phoneNumber: string) => {
    const cleanedNumber = phoneNumber.replace(/[-\s]/g, '');
    if (cleanedNumber.startsWith('+886') && cleanedNumber.length === 13) {
      return `0${cleanedNumber.slice(4)}`;
    }
    return phoneNumber;
  };

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset < maxOffset) {
      setImageHeight(maxImageHeight - currentOffset * 0.8);
      setScrollingPosition(currentOffset);
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    scrollOffset.current = currentOffset;

    if (isFetching || isDataEnd) {
      return;
    }
    const { layoutMeasurement, contentSize, contentOffset } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
    if (isCloseToBottom) {
      setIsFetching(true);
    }
  };

  const startClick = () => {
    rootNavigation.navigate('WishMap', {});
  };

  const noDonateRecord = () => {
    return (
      <View style={Styles.noDonateRecordContainer}>
        <Text style={Styles.noDonateRecordText}>尚未有任何捐款紀錄</Text>
        <Text style={Styles.helpWishText}>一起幫助喜願兒願望成真!</Text>
        <Image
          source={ImageProvider.Profile.GuestHintImage}
          style={Styles.helpWishImage}
        />
        <TouchableOpacity onPress={startClick} style={Styles.helpWishButton}>
          <Text style={Styles.helpWishButtonText}>開始吧!</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const formatDateTime = (dateTimeString: string) => {
    const formattedDate = new Date(dateTimeString);
    formattedDate.setUTCHours(formattedDate.getUTCHours() + 8);
    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();
    const hour = formattedDate.getHours();
    const displayHour =
      formattedDate.getHours() > 12
        ? formattedDate.getHours() - 12
        : formattedDate.getHours();
    const amOrPm = hour >= 12 ? '下午' : '上午';
    const minute = formattedDate.getMinutes();
    const returnString = `${year} 年 ${month} 月 ${day} 日 ${amOrPm} ${displayHour}:${minute}`;
    return returnString;
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
        <View style={Styles.avatarContainer}>
          {userProfile?.userType === 'member' &&
          userAvatar.uri !== '' &&
          userAvatar.uri !== null ? (
            <Avatar.Image size={70} source={userAvatar} />
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
            style={Styles.guestLoginButton}
          >
            <View style={Styles.guestLoginButtonContainer}>
              <Image source={ImageProvider.Profile.ProfileLoginIcon} />
              <Text style={Styles.guestLoginButtonText}>登入/註冊</Text>
            </View>
          </TouchableOpacity>
        ) : null}

        <View style={Styles.profileNameBlock}>
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
          style={[
            Styles.profileInfoBlock,
            { marginTop: projectInfoHeight - 20 },
          ]}
          decelerationRate={0.2}
          ref={scrollRef}
        >
          <View style={Styles.infoBlock}>
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
          <Text style={Styles.donateRecordTitle}>捐款紀錄</Text>
          {donateData.map((data, index) => {
            return (
              <View key={index} style={Styles.donateRecordBlock}>
                <View style={Styles.donateRecordContainer}>
                  <View>
                    <Text style={Styles.donateRecordTimeText}>
                      {formatDateTime(data.processedAt)}
                    </Text>
                    <Text style={Styles.donateRecordTitleText}>
                      {data.lineItems.nodes[0].title}
                    </Text>
                  </View>
                  <View style={Styles.donateRecordTotalBlock}>
                    <Text style={Styles.donateRecordAmountText}>
                      {`NT$ ${parseInt(data.originalTotalPrice.amount)}`}
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
          {isFetching && (
            <View style={{ marginBottom: 10 }}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {donateData.length === 0 && (
            <View style={Styles.noDonateRecordComponent}>
              {noDonateRecord()}
            </View>
          )}
        </ScrollView>
      ) : (
        <ScrollView
          onScroll={handleScroll}
          style={[
            Styles.noDonateRecordBlock,
            { marginTop: projectInfoHeight - 20 },
          ]}
          decelerationRate={0.2}
        >
          <View style={[Styles.separator, { marginTop: 0 }]} />
          <Text style={Styles.donateRecordTitle}>捐款紀錄</Text>
          <View style={Styles.noDonateRecordComponent}>{noDonateRecord()}</View>
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
        style={[
          Styles.donateRecordExpandSeparator,
          { height: separatorHeight },
        ]}
      />
      <Animated.View style={{ height: textHeight }}>
        <Text
          style={Styles.donateDetailInfoBlockTitle}
        >{`捐款人姓名：${data?.billingAddress?.lastName}${data?.billingAddress?.firstName}`}</Text>
        <Text
          style={Styles.donateDetailInfoBlockTitle}
        >{`電子信箱：${data?.email}`}</Text>
        <Text
          style={Styles.donateDetailInfoBlockTitle}
        >{`手機號碼：${data?.billingAddress?.phone}`}</Text>
        <Text style={Styles.donateDetailInfoBlockTitle}>{`收據抬頭：${
          data?.billingAddress?.company || ''
        }`}</Text>
        <Text style={Styles.donateDetailInfoBlockTitle}>{`收據接收地址：${
          data?.billingAddress?.zip || ''
        }${data?.billingAddress?.city || ''}${
          data?.billingAddress?.address1 || ''
        }`}</Text>
      </Animated.View>
    </Animated.View>
  );
};
