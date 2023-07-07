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

  const handleChangePasswordClick = () => {
    navigation.navigate('ChangePassword', {});
  };

  const handleDeleteAccountClick = () => {
    navigation.navigate('DeleteAccountReason', {});
  };

  const handleRateAppClick = () => {
    console.log('handleRateAppClick');
  };

  const handleReportIssueClick = () => {
    navigation.navigate('ReportIssue', {});
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

    LocalStorage.setData(LocalStorageKeys.UserProfileKey, userProfile).finally(
      () => {
        DataShareService.setUserProfile(userProfile);

        rootNavigation.navigate('Login', {});
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginVertical: 16,
            }}
          >
            <View style={{ position: 'absolute', left: 0, top: 0 }}>
              {renderSettingGoBack()}
            </View>

            <Text
              style={{
                marginBottom: 14,
                marginTop: 10,
                color: '#75787B',
                fontSize: 16,
                fontWeight: '500',
                fontFamily: 'Lato',
              }}
            >
              設定
            </Text>
            <View />
          </View>
        </View>

        <ScrollView
          style={{ marginHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              fontFamily: 'Lato',
              color: '#1A1A1A',
              marginTop: 24,
              marginBottom: 16,
            }}
          >
            帳號
          </Text>
          <TouchableOpacity
            onPress={handleChangePasswordClick}
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              borderColor: '#0057B8',
              borderWidth: 1,
              borderRadius: 50,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 12,
              }}
            >
              <Image source={ImageProvider.Setting.ChangePassword} />
              <Text
                style={{
                  color: '#0057B8',
                  fontSize: 14,
                  fontWeight: '500',
                  fontFamily: 'Lato',
                  marginLeft: 6,
                }}
              >
                修改密碼
              </Text>
            </View>
            <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteAccountClick}
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              borderColor: '#0057B8',
              borderWidth: 1,
              borderRadius: 50,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 12,
              }}
            >
              <Image source={ImageProvider.Setting.DeleteAccount} />
              <Text
                style={{
                  color: '#0057B8',
                  fontSize: 14,
                  fontWeight: '500',
                  fontFamily: 'Lato',
                  marginLeft: 6,
                }}
              >
                刪除帳號
              </Text>
            </View>
            <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
          </TouchableOpacity>

          <View
            style={{
              height: 2,
              backgroundColor: '#CCCCCC',
              width: '100%',
              marginVertical: 24,
            }}
          />

          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              fontFamily: 'Lato',
              color: '#1A1A1A',
              marginBottom: 16,
            }}
          >
            反饋
          </Text>
          <TouchableOpacity
            onPress={handleRateAppClick}
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              borderColor: '#0057B8',
              borderWidth: 1,
              borderRadius: 50,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 12,
              }}
            >
              <Image source={ImageProvider.Setting.RateApp} />
              <Text
                style={{
                  color: '#0057B8',
                  fontSize: 14,
                  fontWeight: '500',
                  fontFamily: 'Lato',
                  marginLeft: 6,
                }}
              >
                為我們評分
              </Text>
            </View>
            <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReportIssueClick}
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              borderColor: '#0057B8',
              borderWidth: 1,
              borderRadius: 50,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 12,
              }}
            >
              <Image source={ImageProvider.Setting.ReportIssue} />
              <Text
                style={{
                  color: '#0057B8',
                  fontSize: 14,
                  fontWeight: '500',
                  fontFamily: 'Lato',
                  marginLeft: 6,
                }}
              >
                回報問題
              </Text>
            </View>
            <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
          </TouchableOpacity>

          <View
            style={{
              height: 2,
              backgroundColor: '#CCCCCC',
              width: '100%',
              marginVertical: 24,
            }}
          />

          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              fontFamily: 'Lato',
              color: '#1A1A1A',
              marginBottom: 16,
            }}
          >
            關於
          </Text>
          <TouchableOpacity
            onPress={handleFqaClick}
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: '#0057B8',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Lato',
                marginVertical: 12,
              }}
            >
              常見問題
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAboutWishClick}
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: '#0057B8',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Lato',
                marginVertical: 12,
              }}
            >
              關於喜願
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePrivacyPolicyClick}
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: '#0057B8',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Lato',
                marginVertical: 12,
              }}
            >
              個資聲明 & 隱私權政策
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTermOfUseClick}
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: '#0057B8',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Lato',
                marginVertical: 12,
              }}
            >
              使用條款
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleOpenPopupModal}
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              borderRadius: 50,
              marginBottom: 28,
              backgroundColor: '#FF585D',
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Lato',
                marginVertical: 14,
              }}
            >
              登出
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
      {isOpenModal ? (
        <Pressable
          onPress={handleClosePopupModal}
          style={{
            position: 'absolute',
            zIndex: 10000,
            backgroundColor: '#00000066',
            flex: 1,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ width: '100%', paddingHorizontal: 24 }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 16,
                padding: 24,
              }}
            >
              <Text
                style={{
                  color: '#1A1A1A',
                  fontFamily: 'Lato',
                  fontSize: 24,
                  fontWeight: '700',
                  marginBottom: 16,
                }}
              >
                登出帳號
              </Text>
              <Text
                style={{
                  color: '#2D2D2D',
                  fontFamily: 'Lato',
                  fontSize: 14,
                  fontWeight: '400',
                }}
              >
                是否確定要登出此帳號？
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 24,
                }}
              >
                <TouchableOpacity
                  onPress={handleLogoutClick}
                  style={{
                    borderColor: '#0057B8',
                    borderRadius: 50,
                    borderWidth: 1,
                    marginRight: 8,
                  }}
                >
                  <Text
                    style={{
                      marginHorizontal: 34,
                      marginVertical: 12,
                      color: '#0057B8',
                    }}
                  >
                    是
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleClosePopupModal}
                  style={{
                    backgroundColor: '#0057B8',
                    borderRadius: 50,
                  }}
                >
                  <Text
                    style={{
                      marginHorizontal: 34,
                      marginVertical: 12,
                      color: '#ffffff',
                    }}
                  >
                    否
                  </Text>
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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 36,
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                color: '#FF585D',
                fontSize: 24,
                fontWeight: '700',
                fontFamily: 'Lato',
                marginBottom: 8,
              }}
            >
              歡迎回來
            </Text>

            <Text
              style={{
                color: '#FF585D',
                fontSize: 16,
                fontWeight: '500',
                fontFamily: 'Lato',
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              {'很高興您決定繼續留在 Wish Map\n與我們一起為病童們繼續圓夢'}
            </Text>

            <Image
              source={ImageProvider.Setting.SettingCancelDeleteAccountImage}
            />

            <TouchableOpacity
              onPress={handleCloseModal}
              style={{
                borderRadius: 50,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0057B8',
                marginBottom: 28,
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Lato',
                  marginVertical: 14,
                  color: '#ffffff',
                }}
              >
                知道了
              </Text>
            </TouchableOpacity>
          </View>
        </Modalize>
      </Portal>
    </SafeAreaView>
  );
}
