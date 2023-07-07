import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ToastAndroid,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { SettingStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import { Subscription } from 'rxjs';
import DataShareService from 'service';
import { UserProfileType } from 'types/profile';
import Styles from './index.style';
import WishRadioButton from 'components/WishRadioButton';

type PageRouterProps = {
  route: RouteProp<SettingStackParamList, 'DeleteAccountSafeCheck'>;
  navigation: NativeStackNavigationProp<
    SettingStackParamList,
    'DeleteAccountSafeCheck'
  >;
};

export default function DeleteAccountSafeCheckPage({
  navigation,
}: PageRouterProps) {
  const [inputPassword, setInputPassword] = useState<string>('');
  const [hideInputContent, setHideInputContent] = useState<boolean>(true);
  const [onFocusInput, setOnFocusInput] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>('');

  const renderDeleteAccountReasonGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
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

  const handleOnBlur = () => {
    setOnFocusInput(false);
  };

  const handleOnFocus = () => {
    setOnFocusInput(true);
  };

  const handleNextStep = () => {
    if (inputPassword !== userProfile?.userPassword) {
      setInputError('請輸入正確的密碼');
    } else {
      setInputError('');
      navigation.navigate('DeleteAccount', {});
    }
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
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              marginVertical: 16,
            }}
          >
            {renderDeleteAccountReasonGoBack()}
            <View />
          </View>
        </View>

        <View style={{ marginHorizontal: 16 }}>
          <Text
            style={{
              marginTop: 24,
              fontSize: 24,
              fontWeight: '700',
              fontFamily: 'Lato',
              color: '#0057B8',
              marginBottom: 8,
            }}
          >
            保護帳號安全
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              fontFamily: 'Lato',
              color: '#75787B',
            }}
          >
            對為了保障您的帳號安全，請再次輸入密碼以繼續
          </Text>

          <View
            style={{
              height: 2,
              width: '100%',
              backgroundColor: '#D9D9D9',
              marginVertical: 24,
            }}
          />

          <View style={{ width: '100%', marginTop: 16 }}>
            <View
              style={[
                {
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 16,
                },
                inputError !== ''
                  ? { borderWidth: 2, borderColor: '#FF0000' }
                  : onFocusInput
                  ? { borderWidth: 2, borderColor: '#0057B8' }
                  : { borderWidth: 1, borderColor: '#669ad4' },
              ]}
            >
              <TextInput
                placeholder="請輸入密碼"
                value={inputPassword}
                onChangeText={text => {
                  setInputPassword(text);
                  setInputError('');
                }}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                secureTextEntry={hideInputContent}
                style={{
                  flex: 1,
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  backgroundColor: '#ffffff',
                  left: 16,
                  top: -8,
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: 12,
                      fontWeight: '700',
                      fontFamily: 'Lato',
                      marginHorizontal: 6,
                    },
                    inputError !== ''
                      ? { color: '#FF0000' }
                      : { color: '#0057B8' },
                  ]}
                >
                  密碼
                </Text>
              </View>

              {inputError !== '' ? (
                <Image source={ImageProvider.Setting.SettingInputErrorIcon} />
              ) : (
                <TouchableOpacity
                  onPress={() => setHideInputContent(!hideInputContent)}
                >
                  {hideInputContent ? (
                    <Image
                      source={ImageProvider.Setting.SettingShowPasswordIcon}
                    />
                  ) : (
                    <Image
                      source={ImageProvider.Setting.SettingHidePasswordIcon}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                fontFamily: 'Lato',
                marginHorizontal: 6,
                color: '#FF0000',
                marginTop: 6,
              }}
            >
              {inputError !== '' ? inputError : ''}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleNextStep}
            style={[
              {
                borderRadius: 50,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              },
              inputPassword === ''
                ? { backgroundColor: '#ECECEC' }
                : { backgroundColor: '#0057B8' },
            ]}
            disabled={inputPassword === ''}
          >
            <Text
              style={[
                {
                  fontSize: 14,
                  fontFamily: 'Lato',
                  marginVertical: 14,
                },
                inputPassword === ''
                  ? { color: '#909090' }
                  : { color: '#ffffff' },
              ]}
            >
              下一步
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
