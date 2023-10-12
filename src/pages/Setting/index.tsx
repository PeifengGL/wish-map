import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList, SettingStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Styles from './index.style';
import ImageProvider from 'assets';
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';
import DataShareService from 'service';
import { UserProfileType } from 'types/profile';
import { Subscription } from 'rxjs';

type PageRouterProps = {
  route: RouteProp<SettingStackParamList, 'Setting'>;
  navigation: NativeStackNavigationProp<SettingStackParamList, 'Setting'>;
};

export default function SettingPage({ route, navigation }: PageRouterProps) {
  const modalizeRef = useRef<Modalize>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const renderSettingGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Setting.SettingGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);

  useEffect(() => {
    const userProfileSubscription: Subscription =
      DataShareService.getUserProfile$().subscribe(
        (newUserProfile: UserProfileType) => {
          if (newUserProfile !== null && userProfile !== newUserProfile) {
            setUserProfile(newUserProfile);
          }
        },
      );

    return () => {
      userProfileSubscription.unsubscribe();
    };
  }, [userProfile]);

  const handleChangePasswordClick = () => {
    navigation.navigate('ResetPassword', {});
  };

  const handleDeleteAccountClick = () => {
    navigation.navigate('DeleteAccountReason', {});
  };

  const handleRateAppClick = () => {
    console.log('handleRateAppClick');
  };

  console.log(Platform.OS);
  const handleReportIssueClick = () => {
    const androidVersion = Platform.constants['Release'];
    const body = `OS Platform: ${Platform.OS}\nOS Version: ${androidVersion}`;
    Linking.openURL(
      `mailto:mawtpe@ms24.hinet.net?subject=Report Issue&body=${body}`,
    );
  };

  const handleFqaClick = () => {
    navigation.navigate('Fqa', {});
  };

  const handleAboutWishClick = () => {
    navigation.navigate('AboutWish', {});
  };

  const handlePrivacyPolicyClick = () => {
    navigation.navigate('PrivacyPolicy', {});
  };

  const handleTermOfUseClick = () => {
    navigation.navigate('TermOfUse', {});
  };

  useEffect(() => {
    if (route.params?.cancelDeleteAccountStatus === true) {
      modalizeRef.current?.open();
      navigation.setParams({ cancelDeleteAccountStatus: false });
    }
  }, [route.params]);

  const handleCloseModal = () => {
    modalizeRef.current?.close();
  };

  const handleClosePopupModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenPopupModal = () => {
    setIsOpenModal(true);
  };

  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogoutClick = () => {
    const userProfile: UserProfileType = {
      userName: '',
      userEmail: '',
      userPhone: '',
      userAddress: '',
      userUID: '',
      userType: '',
      userPassword: '',
    };

    LocalStorage.setData(LocalStorageKeys.CustomerAccessTokenKey, '');
    LocalStorage.setData(LocalStorageKeys.UserProfileKey, userProfile).finally(
      () => {
        DataShareService.setUserProfile(userProfile);
        rootNavigation.navigate('Registration', {
          isDeleteAccount: false,
          isLogout: true,
        });
      },
    );
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
          <View style={Styles.headerFlex}>
            <View style={Styles.goBackButton}>{renderSettingGoBack()}</View>
            <Text style={Styles.settingTitle}>設定</Text>
          </View>
        </View>

        <ScrollView
          style={Styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {userProfile?.userType !== 'guest' && (
            <>
              <Text style={Styles.blockTitle}>帳號</Text>
              <TouchableOpacity
                onPress={handleChangePasswordClick}
                style={Styles.blockButton}
              >
                <View style={Styles.buttonFlex}>
                  <Image source={ImageProvider.Setting.ChangePassword} />
                  <Text style={Styles.buttonText}>修改密碼</Text>
                </View>
                <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={handleDeleteAccountClick}
                style={Styles.blockButton}
              >
                <View style={Styles.buttonFlex}>
                  <Image source={ImageProvider.Setting.DeleteAccount} />
                  <Text style={Styles.buttonText}>刪除帳號</Text>
                </View>
                <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
              </TouchableOpacity> */}

              <View style={Styles.separator} />
            </>
          )}

          <Text style={Styles.blockTitle}>反饋</Text>
          <TouchableOpacity
            onPress={handleRateAppClick}
            style={Styles.blockButton}
          >
            <View style={Styles.buttonFlex}>
              <Image source={ImageProvider.Setting.RateApp} />
              <Text style={Styles.buttonText}>為我們評分</Text>
            </View>
            <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReportIssueClick}
            style={Styles.blockButton}
          >
            <View style={Styles.buttonFlex}>
              <Image source={ImageProvider.Setting.ReportIssue} />
              <Text style={Styles.buttonText}>回報問題</Text>
            </View>
            <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
          </TouchableOpacity>

          <View style={Styles.separator} />

          <Text style={Styles.blockTitle}>關於</Text>
          <TouchableOpacity
            onPress={handleFqaClick}
            style={Styles.aboutBlockButton}
          >
            <Text style={Styles.aboutBlockText}>常見問題</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAboutWishClick}
            style={Styles.aboutBlockButton}
          >
            <Text style={Styles.aboutBlockText}>關於喜願</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePrivacyPolicyClick}
            style={Styles.aboutBlockButton}
          >
            <Text style={Styles.aboutBlockText}>個資聲明 & 隱私權政策</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTermOfUseClick}
            style={Styles.aboutBlockButton}
          >
            <Text style={Styles.aboutBlockText}>使用條款</Text>
          </TouchableOpacity>

          {userProfile?.userType !== 'guest' && (
            <TouchableOpacity
              onPress={handleOpenPopupModal}
              style={Styles.logoutButton}
            >
              <Text style={Styles.logoutButtonText}>登出</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </ImageBackground>
      {isOpenModal ? (
        <Pressable
          onPress={handleClosePopupModal}
          style={Styles.popupModalContainer}
        >
          <View style={Styles.popupModalContent}>
            <View style={Styles.popupModalContentFlex}>
              <Text style={Styles.popupLogoutTitle}>登出帳號</Text>
              <Text style={Styles.popupLogoutText}>是否確定要登出此帳號？</Text>
              <View style={Styles.popupLogoutOptionsContainer}>
                <TouchableOpacity
                  onPress={handleLogoutClick}
                  style={Styles.popupLogoutYesButton}
                >
                  <Text style={Styles.popupLogoutYesButtonText}>是</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleClosePopupModal}
                  style={Styles.popupLogoutNoButton}
                >
                  <Text style={Styles.popupLogoutNoButtonText}>否</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      ) : null}
      <Portal>
        <Modalize
          ref={modalizeRef}
          onOverlayPress={handleCloseModal}
          adjustToContentHeight
        >
          <View style={Styles.welcomeBlock}>
            <Text style={Styles.welcomeText1}>歡迎回來</Text>

            <Text style={Styles.welcomeText2}>
              {'很高興您決定繼續留在 Wish Map\n與我們一起為病童們繼續圓夢'}
            </Text>

            <Image
              source={ImageProvider.Setting.SettingCancelDeleteAccountImage}
            />

            <TouchableOpacity
              onPress={handleCloseModal}
              style={Styles.welcomeModalCloseButton}
            >
              <Text style={Styles.welcomeModalCloseButtonText}>知道了</Text>
            </TouchableOpacity>
          </View>
        </Modalize>
      </Portal>
    </SafeAreaView>
  );
}
