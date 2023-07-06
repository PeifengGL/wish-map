import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ProfileStackParamList } from 'types/router';
import Styles from './index.style';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { Avatar } from 'react-native-paper';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Subscription } from 'rxjs';
import DataShareService from 'service';
import { UserProfileType } from 'types/profile';

type PageRouterProps = {
  route: RouteProp<ProfileStackParamList, 'EditProfile'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'EditProfile'>;
};

export default function EditProfilePage({ navigation }: PageRouterProps) {
  const modalizeRef = useRef<Modalize>(null);
  const [userSelectAvatar, setUserSelectAvatar] = useState<Asset>();
  const [userRemoveAvatar, setUserRemoveAvatar] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfileType>();

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

  const renderEditProfileGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const handleChooseImageFromCamera = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      } else if (response.errorMessage) {
        return;
      }
      console.log(response.assets);

      const newSelectedImages: Asset[] = response.assets!;

      setUserSelectAvatar(newSelectedImages[0]);
      setUserRemoveAvatar(false);
      modalizeRef.current?.close();
    });
  };

  const handleChooseImageFromGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      } else if (response.errorMessage) {
        return;
      }
      console.log(response.assets);

      const newSelectedImages: Asset[] = response.assets!;

      setUserSelectAvatar(newSelectedImages[0]);
      setUserRemoveAvatar(false);
      modalizeRef.current?.close();
    });
  };

  const handleEditUsernameClick = () => {
    navigation.push('EditUsername', {});
  };

  const handleEditEmailClick = () => {
    navigation.push('EditEmail', {});
  };

  const handleEditPhoneClick = () => {
    navigation.push('EditPhone', {});
  };

  const handleEditAddressClick = () => {
    navigation.push('EditAddress', {});
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="#EBF1F9"
        barStyle="dark-content"
        translucent={false}
      />
      <ImageBackground
        source={ImageProvider.Setting.SettingBackgroundImage}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      >
        <View style={Styles.headerContainer}>
          <View>{renderEditProfileGoBack()}</View>
          <Text style={Styles.headerTitle}>編輯個人資料</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{ fontSize: 14, fontFamily: 'Lato', color: '#0057B8' }}
            >
              完成
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            marginTop: 40,
            marginBottom: 24,
          }}
        >
          <View>
            {userRemoveAvatar ? (
              <Avatar.Image
                size={120}
                source={ImageProvider.Profile.DefaultAvatar}
              />
            ) : userSelectAvatar?.uri ? (
              <Avatar.Image
                size={120}
                source={{ uri: userSelectAvatar?.uri }}
              />
            ) : (
              <Avatar.Image
                size={120}
                source={ImageProvider.Profile.UserAvatar}
              />
            )}

            <TouchableOpacity
              onPress={() => modalizeRef.current?.open()}
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            >
              <Image source={ImageProvider.Profile.ChangeAvatarIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Lato',
                fontWeight: '500',
                color: '#1A1A1A',
              }}
            >
              使用者名稱
            </Text>
            <TouchableOpacity
              onPress={handleEditUsernameClick}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                borderColor: '#0057B8',
                borderWidth: 1,
                borderRadius: 50,
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Lato',
                  color: '#0057B8',
                  marginVertical: 12,
                }}
              >
                {userProfile?.userName}
              </Text>
              <Image source={ImageProvider.Profile.EditRightArrowIcon} />
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Lato',
                fontWeight: '500',
                color: '#1A1A1A',
              }}
            >
              電子信箱
            </Text>
            <TouchableOpacity
              onPress={handleEditEmailClick}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                borderColor: '#0057B8',
                borderWidth: 1,
                borderRadius: 50,
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Lato',
                  color: '#0057B8',
                  marginVertical: 12,
                }}
              >
                {userProfile?.userEmail}
              </Text>
              <Image source={ImageProvider.Profile.EditRightArrowIcon} />
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Lato',
                fontWeight: '500',
                color: '#1A1A1A',
              }}
            >
              手機號碼
            </Text>
            <TouchableOpacity
              onPress={handleEditPhoneClick}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                borderColor: '#0057B8',
                borderWidth: 1,
                borderRadius: 50,
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Lato',
                  color: '#0057B8',
                  marginVertical: 12,
                }}
              >
                {userProfile?.userPhone === '' ? (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Lato',
                      color: '#CCCCCC',
                      marginVertical: 12,
                      fontWeight: '500',
                    }}
                  >
                    請輸入手機號碼
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Lato',
                      color: '#0057B8',
                      marginVertical: 12,
                      fontWeight: '500',
                    }}
                  >
                    {userProfile?.userPhone}
                  </Text>
                )}
              </Text>
              <Image source={ImageProvider.Profile.EditRightArrowIcon} />
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Lato',
                fontWeight: '500',
                color: '#1A1A1A',
              }}
            >
              聯絡地址
            </Text>
            <TouchableOpacity
              onPress={handleEditAddressClick}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                borderColor: '#0057B8',
                borderWidth: 1,
                borderRadius: 50,
                marginTop: 8,
              }}
            >
              {userProfile?.userAddress === '' ? (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Lato',
                    color: '#CCCCCC',
                    marginVertical: 12,
                    fontWeight: '500',
                  }}
                >
                  請輸入聯絡地址
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Lato',
                    color: '#0057B8',
                    marginVertical: 12,
                    fontWeight: '500',
                  }}
                >
                  {userProfile?.userAddress}
                </Text>
              )}

              <Image source={ImageProvider.Profile.EditRightArrowIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <Portal>
        <Modalize ref={modalizeRef} adjustToContentHeight>
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ marginVertical: 36 }}>請選擇上傳途徑</Text>
              <TouchableOpacity onPress={() => modalizeRef.current?.close}>
                <Image
                  source={ImageProvider.WishMap.ClosePrivacyIcon}
                  style={{ position: 'absolute', right: 16 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 28, marginHorizontal: 16 }}>
              <TouchableOpacity
                onPress={handleChooseImageFromCamera}
                style={{
                  backgroundColor: '#0057B8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  borderRadius: 50,
                }}
              >
                <Text style={{ color: 'white', marginVertical: 12 }}>相機</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleChooseImageFromGallery}
                style={{
                  backgroundColor: '#0057B8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}
              >
                <Text style={{ color: 'white', marginVertical: 12 }}>相簿</Text>
              </TouchableOpacity>
              {userRemoveAvatar ? null : (
                <TouchableOpacity
                  onPress={() => {
                    setUserRemoveAvatar(true);
                    setUserSelectAvatar(undefined);
                    modalizeRef.current?.close();
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: '#FF585D',
                    marginTop: 24,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={ImageProvider.Profile.RemoveAvatarIcon} />
                    <Text
                      style={{
                        color: '#FF585D',
                        marginVertical: 12,
                        marginLeft: 6,
                      }}
                    >
                      移除目前頭像
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modalize>
      </Portal>
    </SafeAreaView>
  );
}
