import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
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
import { UserProfileType } from 'types/profile';
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';
import { getCustomerInfo } from 'api/Login';
import RNFS from 'react-native-fs';

type PageRouterProps = {
  route: RouteProp<ProfileStackParamList, 'EditProfile'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'EditProfile'>;
};

export default function EditProfilePage({ navigation }: PageRouterProps) {
  const modalizeRef = useRef<Modalize>(null);
  const [userSelectAvatar, setUserSelectAvatar] = useState<Asset>();
  const [userRemoveAvatar, setUserRemoveAvatar] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfileType>({
    userName: '',
    userEmail: '',
    userPhone: '',
    userAddress: '',
    userUID: '',
    userType: 'member',
    userPassword: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      LocalStorage.getData(LocalStorageKeys.CustomerAccessTokenKey).then(
        token => {
          if (token && typeof token === 'string') {
            getCustomerInfo(token).then(info => {
              if (info === null) {
                return;
              }
              let address;
              let displayAddress;
              if (info.defaultAddress !== null) {
                address = info.defaultAddress;
                displayAddress = `${address.zip || ''} ${address.city || ''}${
                  address.address1 || ''
                }`;
              }
              const newUserProfile: UserProfileType = {
                userName: info?.displayName,
                userEmail: info?.email,
                userPhone: info?.phone || '',
                userAddress: displayAddress || '',
                userUID: info?.id,
                userType: 'member',
                userPassword: '',
              };
              setUserProfile(newUserProfile);
              // 取得使用者資料了
              LocalStorage.getData(
                `${LocalStorageKeys.ProfilePictureKey}${info?.email}`,
              ).then(uri => {
                if (uri === null || uri === '') {
                  setUserRemoveAvatar(true);
                  setUserSelectAvatar(undefined);
                  return;
                } else if (uri !== undefined && typeof uri === 'string') {
                  setUserRemoveAvatar(false);
                  setUserSelectAvatar({ uri: uri });
                  return;
                }
              });
            });
          }
        },
      );
    }, []),
  );

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
      if (response.assets && response.assets.length > 0) {
        const fileName = response.assets[0].fileName!;
        const oldPath = response.assets[0].uri!;
        const newPath = `file://${RNFS.DocumentDirectoryPath}/${fileName}`;
        RNFS.copyFile(oldPath, newPath)
          .then(() => {
            LocalStorage.setData(
              `${LocalStorageKeys.ProfilePictureKey}${userProfile?.userEmail}`,
              newPath,
            );
          })
          .catch(err => {
            console.log(err.message);
          });
      }

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
      if (response.assets && response.assets.length > 0) {
        const fileName = response.assets[0].fileName!;
        const oldPath = response.assets[0].uri!;
        const newPath = `file://${RNFS.DocumentDirectoryPath}/${fileName}`;
        RNFS.copyFile(oldPath, newPath)
          .then(() => {
            LocalStorage.setData(
              `${LocalStorageKeys.ProfilePictureKey}${userProfile?.userEmail}`,
              newPath,
            );
          })
          .catch(err => {
            console.log(err.message);
          });
      }
      const newSelectedImages: Asset[] = response.assets!;

      setUserSelectAvatar(newSelectedImages[0]);
      setUserRemoveAvatar(false);
      modalizeRef.current?.close();
    });
  };

  const handleEditUsernameClick = (username: string) => {
    navigation.push('EditUsername', { username: username });
  };

  const handleEditEmailClick = (email: string) => {
    navigation.push('EditEmail', { email: email });
  };

  const handleEditPhoneClick = (phone: string) => {
    navigation.push('EditPhone', { phone: phone });
  };

  const handleEditAddressClick = (address: string) => {
    navigation.push('EditAddress', { address: address });
  };

  const handleCloseModal = () => modalizeRef.current?.close();

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
          <View style={Styles.headerFlex}>
            <View style={Styles.goBackButton}>{renderEditProfileGoBack()}</View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={Styles.editDoneButton}>完成</Text>
            </TouchableOpacity>
          </View>
          <Text style={Styles.headerTitle}>編輯個人資料</Text>
        </View>
        <View style={Styles.editProfileContainer}>
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
              style={Styles.changeProfileAvatarButton}
            >
              <Image source={ImageProvider.Profile.ChangeAvatarIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.editProfileBlock}>
          <View style={Styles.editProfileField}>
            <Text style={Styles.editProfileFieldLabel}>使用者名稱</Text>
            <TouchableOpacity
              onPress={() => handleEditUsernameClick(userProfile.userName)}
              style={Styles.editProfileFieldButton}
            >
              <Text style={Styles.editProfileFieldButtonText}>
                {userProfile.userName}
              </Text>
              <Image source={ImageProvider.Profile.EditRightArrowIcon} />
            </TouchableOpacity>
          </View>
          <View style={Styles.editProfileField}>
            <Text style={Styles.editProfileFieldLabel}>
              電子信箱<Text style={Styles.readOnly}>（不可修改）</Text>
            </Text>
            <TouchableOpacity
              disabled={true}
              onPress={() => handleEditEmailClick(userProfile.userEmail)}
              style={Styles.editProfileFieldButton}
            >
              <Text style={Styles.editProfileFieldButtonText}>
                {userProfile?.userEmail}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.editProfileField}>
            <Text style={Styles.editProfileFieldLabel}>手機號碼</Text>
            <TouchableOpacity
              onPress={() => handleEditPhoneClick(userProfile.userPhone)}
              style={Styles.editProfileFieldButton}
            >
              <Text style={Styles.editProfileFieldButtonText}>
                {userProfile?.userPhone === '' ? (
                  <Text style={Styles.noProfileFieldText}>請輸入手機號碼</Text>
                ) : (
                  <Text style={Styles.editProfileFieldButtonText}>
                    {userProfile?.userPhone}
                  </Text>
                )}
              </Text>
              <Image source={ImageProvider.Profile.EditRightArrowIcon} />
            </TouchableOpacity>
          </View>
          <View style={Styles.editProfileField}>
            <Text style={Styles.editProfileFieldLabel}>聯絡地址</Text>
            <TouchableOpacity
              onPress={() => handleEditAddressClick(userProfile.userAddress)}
              style={Styles.editProfileFieldButton}
            >
              {userProfile?.userAddress === '' ? (
                <Text style={Styles.noProfileFieldText}>請輸入聯絡地址</Text>
              ) : (
                <Text style={Styles.editProfileFieldButtonText}>
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
            <View style={Styles.modalHeaderContainer}>
              <Text style={Styles.modalHeaderText}>請選擇上傳途徑</Text>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={Styles.modalHeaderCloseButton}
              >
                <Image source={ImageProvider.Profile.CloseUploadIcon} />
              </TouchableOpacity>
            </View>
            <View style={Styles.chooseAvatarOptionsContainer}>
              <TouchableOpacity
                onPress={handleChooseImageFromCamera}
                style={Styles.chooseAvatarOptionButton}
              >
                <Text style={Styles.chooseAvatarOptionButtonText}>相機</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleChooseImageFromGallery}
                style={Styles.chooseAvatarOptionButton}
              >
                <Text style={Styles.chooseAvatarOptionButtonText}>相簿</Text>
              </TouchableOpacity>
              {userRemoveAvatar ? null : (
                <TouchableOpacity
                  onPress={() => {
                    setUserRemoveAvatar(true);
                    setUserSelectAvatar(undefined);
                    modalizeRef.current?.close();
                    LocalStorage.setData(
                      `${LocalStorageKeys.ProfilePictureKey}${userProfile?.userEmail}`,
                      '',
                    );
                  }}
                  style={[
                    Styles.chooseAvatarOptionButton,
                    Styles.removeAvatarButton,
                  ]}
                >
                  <View style={Styles.removeAvatarButtonFlex}>
                    <Image source={ImageProvider.Profile.RemoveAvatarIcon} />
                    <Text style={Styles.removeAvatarButtonText}>
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
