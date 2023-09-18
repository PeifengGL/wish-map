import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
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

  const renderDeleteAccountSafeCheckGoBack = () => {
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
          <View style={Styles.deleteAccountReasonGoBackContainer}>
            {renderDeleteAccountSafeCheckGoBack()}
          </View>
        </View>

        <View style={Styles.content}>
          <Text style={Styles.title}>保護帳號安全</Text>
          <Text style={Styles.description}>
            對為了保障您的帳號安全，請再次輸入密碼以繼續
          </Text>

          <View style={Styles.separator} />

          <View style={Styles.passwordInputBlock}>
            <View
              style={[
                Styles.passwordInputContainer,
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
                style={Styles.input}
              />

              <View style={Styles.inputLabel}>
                <Text
                  style={[
                    Styles.inputLabelText,
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
            <Text style={Styles.errorText}>
              {inputError !== '' ? inputError : ''}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleNextStep}
            style={[
              Styles.nextStepButton,
              inputPassword === ''
                ? { backgroundColor: '#ECECEC' }
                : { backgroundColor: '#0057B8' },
            ]}
            disabled={inputPassword === ''}
          >
            <Text
              style={[
                Styles.nextStepButtonText,
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
