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
import { ProfileStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';

import Styles from './index.style';
import { updateCustomerEmail } from 'api/Login';

type PageRouterProps = {
  route: RouteProp<ProfileStackParamList, 'EditEmail'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'EditEmail'>;
};

export default function EditEmailPage({ route, navigation }: PageRouterProps) {
  const { email } = route.params;
  const [userEmail, setUserEmail] = useState<string>(email);
  const [inputError, setInputError] = useState<boolean>(false);
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (userEmail === '') {
      setInputError(true);
    } else if (!emailRegex.test(userEmail)) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  }, [userEmail]);

  const renderEdituserEmailGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const saveEditUserEmail = () => {
    if (userEmail !== '') {
      LocalStorage.getData(LocalStorageKeys.CustomerAccessTokenKey).then(
        token => {
          if (token && typeof token === 'string') {
            updateCustomerEmail(token, userEmail).then(customerData => {
              console.log(customerData);
              navigation.goBack();
            });
          }
        },
      );
    }
  };

  const onInputBlur = () => {
    if (userEmail === '') {
      setInputError(true);
    } else {
      setInputError(false);
    }
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="#EBF1F9"
        barStyle="dark-content"
        translucent={false}
      />

      <View style={Styles.headerContainer}>
        <View style={Styles.headerFlex}>
          {renderEdituserEmailGoBack()}
          <TouchableOpacity
            onPress={saveEditUserEmail}
            disabled={inputError || userEmail === ''}
          >
            <Text
              style={[
                Styles.saveButton,
                inputError || userEmail === '' ? { color: '#75787B' } : {},
              ]}
            >
              儲存
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.editUserEmailContainer}>
        <Text style={Styles.editUserEmailTitle}>使用者電子信箱</Text>
        <Text style={Styles.editUserEmailDescription}>
          Wish Map 會使用以下使用者電子信箱在您填寫捐款人資料時，自動填入表格內
        </Text>
        <View style={Styles.separator} />

        <View
          style={[
            Styles.editUserMailInputContainer,
            inputError && { borderColor: '#FF0000' },
          ]}
        >
          <TextInput
            placeholder="請輸入使用者電子信箱"
            value={userEmail}
            onChangeText={text => {
              setUserEmail(text);
            }}
            onBlur={onInputBlur}
            style={Styles.editUserMailInput}
          />
          {userEmail !== '' && !inputError && (
            <TouchableOpacity onPress={() => setUserEmail('')}>
              <Image
                source={ImageProvider.Profile.EditProfileTextInputCleanIcon}
              />
            </TouchableOpacity>
          )}
          {inputError && (
            <Image
              source={ImageProvider.Profile.EditProfileTextInputErrorIcon}
            />
          )}
        </View>
        {inputError && (
          <Text style={Styles.editUserMailInputError}>
            使用者電子信箱格式錯誤
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
