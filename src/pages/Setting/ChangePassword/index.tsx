import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ToastAndroid,
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
  const renderEditUserAddressGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
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

  useEffect(() => {
    if (route.params?.resetPasswordStatus === true) {
      setOldPassword('');
      ToastAndroid.show('密碼修改成功！', ToastAndroid.SHORT);
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
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 12,
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {renderEditUserAddressGoBack()}
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
          修改密碼
        </Text>

        <View style={{ width: '100%' }}>
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
              placeholder="請輸入舊密碼"
              value={oldPassword}
              onChangeText={text => {
                setOldPassword(text);
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
            oldPassword === ''
              ? { backgroundColor: '#ECECEC' }
              : { backgroundColor: '#0057B8' },
          ]}
          disabled={oldPassword === ''}
        >
          <Text
            style={[
              {
                fontSize: 14,
                fontFamily: 'Lato',
                marginVertical: 14,
              },
              oldPassword === '' ? { color: '#909090' } : { color: '#ffffff' },
            ]}
          >
            下一步
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
