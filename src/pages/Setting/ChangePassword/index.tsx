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

type PageRouterProps = {
  route: RouteProp<SettingStackParamList, 'ChangePassword'>;
  navigation: NativeStackNavigationProp<
    SettingStackParamList,
    'ChangePassword'
  >;
};

export default function ChangePasswordPage({ navigation }: PageRouterProps) {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [hideInputContent, setHideInputContent] = useState<boolean>(true);
  const [onFocusInput, setOnFocusInput] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);
  const renderEditUserAddressGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const handleOnBlur = () => {
    setOnFocusInput(false);
  };

  const handleOnFocus = () => {
    setOnFocusInput(true);
  };

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

        <View
          style={[
            {
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
            },
            onFocusInput
              ? { borderWidth: 2, borderColor: '#0057B8' }
              : { borderWidth: 1, borderColor: '#669ad4' },
          ]}
        >
          <TextInput
            placeholder="請輸入舊密碼"
            value={oldPassword}
            onChangeText={setOldPassword}
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
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: '#0057B8',
                fontFamily: 'Lato',

                marginHorizontal: 6,
              }}
            >
              舊密碼
            </Text>
          </View>

          {inputError ? (
            <Image source={ImageProvider.Setting.SettingInputErrorIcon} />
          ) : (
            <TouchableOpacity
              onPress={() => setHideInputContent(!hideInputContent)}
            >
              {hideInputContent ? (
                <Image source={ImageProvider.Setting.SettingShowPasswordIcon} />
              ) : (
                <Image source={ImageProvider.Setting.SettingHidePasswordIcon} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
