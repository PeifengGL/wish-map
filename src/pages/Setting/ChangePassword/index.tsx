import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
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
import Toast from 'react-native-toast-message';

type PageRouterProps = {
  route: RouteProp<SettingStackParamList, 'ChangePassword'>;
  navigation: NativeStackNavigationProp<
    SettingStackParamList,
    'ChangePassword'
  >;
};

export default function ChangePasswordPage({
  route,
  navigation,
}: PageRouterProps) {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [hideInputContent, setHideInputContent] = useState<boolean>(true);
  const [onFocusInput, setOnFocusInput] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>('');
  const renderChangePasswordGoBack = () => {
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
    if (oldPassword !== userProfile?.userPassword) {
      setInputError('請輸入正確的密碼');
    } else {
      setInputError('');
      navigation.navigate('ResetPassword', {});
    }
  };

  const toastConfig = {
    customToast: ({ text1 }: any) => (
      <View style={Styles.toastContainer}>
        <Text style={Styles.toastText}>{text1}</Text>
        <TouchableOpacity onPress={() => Toast.hide()}>
          <Image source={ImageProvider.Register.CloseToast} />
        </TouchableOpacity>
      </View>
    ),
  };

  useEffect(() => {
    if (route.params?.resetPasswordStatus === true) {
      console.log(route.params?.resetPasswordStatus);
      setOldPassword('');
      Toast.show({
        type: 'customToast',
        text1: '密碼修改成功！',
        position: 'bottom',
        bottomOffset: 28,
        autoHide: true,
        visibilityTime: 3000,
      });
      navigation.setParams({ resetPasswordStatus: false });
    }
  }, [route.params]);

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
        translucent={false}
      />

      <View style={Styles.headerContainer}>
        <View style={Styles.goBackButton}>{renderChangePasswordGoBack()}</View>
      </View>

      <View style={Styles.changePasswordContainer}>
        <Text style={Styles.changePasswordTitle}>修改密碼</Text>

        <View style={Styles.changePasswordInputContainer}>
          <View
            style={[
              Styles.changePasswordInput,
              inputError !== ''
                ? { borderWidth: 2, borderColor: '#FF0000' }
                : onFocusInput
                ? { borderWidth: 2, borderColor: '#0057B8' }
                : { borderWidth: 1, borderColor: '#669ad4' },
            ]}
          >
            <TextInput
              placeholder="請輸入舊密碼"
              value={oldPassword}
              onChangeText={text => {
                setOldPassword(text);
                setInputError('');
              }}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              secureTextEntry={hideInputContent}
              style={Styles.input}
            />

            <View style={Styles.inputFieldLabel}>
              <Text
                style={[
                  Styles.inputFieldLabelText,
                  inputError !== ''
                    ? { color: '#FF0000' }
                    : { color: '#0057B8' },
                ]}
              >
                舊密碼
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
          <Text style={Styles.inputFieldError}>
            {inputError !== '' ? inputError : ''}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleNextStep}
          style={[
            Styles.nextStepButton,
            oldPassword === ''
              ? { backgroundColor: '#ECECEC' }
              : { backgroundColor: '#0057B8' },
          ]}
          disabled={oldPassword === ''}
        >
          <Text
            style={[
              Styles.nextStepButtonText,
              oldPassword === '' ? { color: '#909090' } : { color: '#ffffff' },
            ]}
          >
            下一步
          </Text>
        </TouchableOpacity>
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}
