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
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';
import Styles from './index.style';
import { updateCustomerPassword } from 'api/Login';

type PageRouterProps = {
  route: RouteProp<SettingStackParamList, 'ResetPassword'>;
  navigation: NativeStackNavigationProp<SettingStackParamList, 'ResetPassword'>;
};

export default function ResetPasswordPage({ navigation }: PageRouterProps) {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [hideNewPasswordContent, setHideNewPasswordContent] =
    useState<boolean>(true);
  const [hideConfirmNewPasswordContent, setHideConfirmNewPasswordContent] =
    useState<boolean>(true);
  const [onFocusNewPasswordInput, setOnFocusNewPasswordInput] =
    useState<boolean>(false);
  const [onFocusConfirmNewPasswordInput, setOnFocusConfirmNewPasswordInput] =
    useState<boolean>(false);
  const [newPasswordError, setNewPasswordError] = useState<string>('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] =
    useState<string>('');

  const renderResetPasswordGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={Styles.cancelButtonText}>取消</Text>
      </TouchableOpacity>
    );
  };

  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const passwordRegex = /^[a-zA-Z0-9]{8,12}$/;

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

  const handleNewPasswordOnBlur = () => {
    setOnFocusNewPasswordInput(false);
    if (!passwordRegex.test(newPassword)) {
      setNewPasswordError('請輸入8-12位密碼');
    } else {
      if (confirmNewPassword !== '') {
        if (confirmNewPassword !== newPassword) {
          setConfirmNewPasswordError('檢查密碼是否輸入一致');
        } else {
          setConfirmNewPasswordError('');
        }
      } else {
        setNewPasswordError('');
      }
    }
  };

  const handleNewPasswordOnFocus = () => {
    setOnFocusNewPasswordInput(true);
  };

  const handleConfirmNewPasswordOnBlur = () => {
    setOnFocusConfirmNewPasswordInput(false);
    if (confirmNewPassword !== newPassword) {
      setConfirmNewPasswordError('檢查密碼是否輸入一致');
    } else {
      setConfirmNewPasswordError('');
    }
  };

  const handleConfirmNewPasswordOnFocus = () => {
    setOnFocusConfirmNewPasswordInput(true);
  };

  const handleSubmit = () => {
    if (!passwordRegex.test(newPassword)) {
      setNewPasswordError('請輸入8-12位密碼');
    } else {
      setNewPasswordError('');
    }

    if (confirmNewPassword !== newPassword) {
      setConfirmNewPasswordError('檢查密碼是否輸入一致');
    } else {
      setConfirmNewPasswordError('');
    }

    if (passwordRegex.test(newPassword) && confirmNewPassword === newPassword) {
      LocalStorage.getData(LocalStorageKeys.CustomerAccessTokenKey).then(
        token => {
          if (token && typeof token === 'string') {
            updateCustomerPassword(token, newPassword).then(data => {
              if (data.customerUserErrors.length > 0) {
                console.log(
                  'update password error',
                  data.customerUserErrors[0].message,
                );
              } else {
                console.log('update password success');
                const newToken = data.customerAccessToken.accessToken;
                LocalStorage.setData(
                  LocalStorageKeys.CustomerAccessTokenKey,
                  newToken,
                ).then(() => {
                  navigation.navigate('Setting', {});
                });
              }
            });
          }
        },
      );
    }
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
        translucent={false}
      />

      <View style={Styles.headerContainer}>
        <View style={Styles.goBackButton}>{renderResetPasswordGoBack()}</View>
      </View>

      <View style={Styles.resetPassword}>
        <Text style={Styles.resetPasswordTitle}>重置密碼</Text>
        <View style={Styles.resetPasswordContainer}>
          <View
            style={[
              Styles.resetPasswordInputContainer,
              newPasswordError !== ''
                ? { borderWidth: 2, borderColor: '#FF0000' }
                : onFocusNewPasswordInput
                ? { borderWidth: 2, borderColor: '#0057B8' }
                : { borderWidth: 1, borderColor: '#669ad4' },
            ]}
          >
            <TextInput
              placeholder="請輸入8-12位新密碼"
              value={newPassword}
              onChangeText={text => {
                setNewPassword(text);
                setNewPasswordError('');
              }}
              onFocus={handleNewPasswordOnFocus}
              onBlur={handleNewPasswordOnBlur}
              secureTextEntry={hideNewPasswordContent}
              style={Styles.input}
            />

            <View style={Styles.inputLabel}>
              <Text
                style={[
                  Styles.inputLabelText,
                  newPasswordError !== ''
                    ? { color: '#FF0000' }
                    : { color: '#0057B8' },
                ]}
              >
                新密碼
              </Text>
            </View>

            {newPasswordError !== '' ? (
              <Image source={ImageProvider.Setting.SettingInputErrorIcon} />
            ) : (
              <TouchableOpacity
                onPress={() =>
                  setHideNewPasswordContent(!hideNewPasswordContent)
                }
              >
                {hideNewPasswordContent ? (
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

          <Text style={Styles.inputErrorText}>
            {newPasswordError !== '' ? newPasswordError : ''}
          </Text>
        </View>

        <View style={Styles.resetPasswordContainer}>
          <View
            style={[
              Styles.resetPasswordInputContainer,
              confirmNewPasswordError !== ''
                ? { borderWidth: 2, borderColor: '#FF0000' }
                : onFocusConfirmNewPasswordInput
                ? { borderWidth: 2, borderColor: '#0057B8' }
                : { borderWidth: 1, borderColor: '#669ad4' },
            ]}
          >
            <TextInput
              placeholder="請再次輸入與上方一致的新密碼"
              value={confirmNewPassword}
              onChangeText={text => {
                setConfirmNewPassword(text);
                setConfirmNewPasswordError('');
              }}
              onFocus={handleConfirmNewPasswordOnFocus}
              onBlur={handleConfirmNewPasswordOnBlur}
              secureTextEntry={hideConfirmNewPasswordContent}
              style={Styles.input}
            />

            <View style={Styles.inputLabel}>
              <Text
                style={[
                  Styles.inputLabelText,
                  confirmNewPasswordError !== ''
                    ? { color: '#FF0000' }
                    : { color: '#0057B8' },
                ]}
              >
                再次輸入新密碼
              </Text>
            </View>

            {confirmNewPasswordError !== '' ? (
              <Image source={ImageProvider.Setting.SettingInputErrorIcon} />
            ) : (
              <TouchableOpacity
                onPress={() =>
                  setHideConfirmNewPasswordContent(
                    !hideConfirmNewPasswordContent,
                  )
                }
              >
                {hideConfirmNewPasswordContent ? (
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
          <Text style={Styles.inputErrorText}>
            {confirmNewPasswordError !== '' ? confirmNewPasswordError : ''}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={Styles.resetPasswordButton}
        >
          <Text style={Styles.resetPasswordButtonText}>送出</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
