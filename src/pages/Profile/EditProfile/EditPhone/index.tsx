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
import { updateCustomerPhone } from 'api/Login';

type PageRouterProps = {
  route: RouteProp<ProfileStackParamList, 'EditPhone'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'EditPhone'>;
};

export default function EditPhonePage({ route, navigation }: PageRouterProps) {
  const { phone } = route.params;
  const [userPhone, setUserPhone] = useState<string>(phone);
  const [inputError, setInputError] = useState<boolean>(false);
  const phoneRegex: RegExp = /^\+8869\d{8}$/;

  useEffect(() => {
    console.log('userPhone', userPhone);
    console.log(phoneRegex.test(userPhone));
    if (userPhone === '') {
      setInputError(false);
    } else if (!phoneRegex.test(userPhone)) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  }, [userPhone]);

  const renderEditUserPhoneGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const saveEditUserPhone = () => {
    if (userPhone !== '') {
      LocalStorage.getData(LocalStorageKeys.CustomerAccessTokenKey).then(
        token => {
          if (token && typeof token === 'string') {
            updateCustomerPhone(token, userPhone).then(customerData => {
              console.log(customerData);
              navigation.goBack();
            });
          }
        },
      );
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
          <View style={Styles.goBackButton}>{renderEditUserPhoneGoBack()}</View>
          <TouchableOpacity onPress={saveEditUserPhone} disabled={inputError}>
            <Text
              style={[
                Styles.saveButton,
                inputError ? { color: '#75787B' } : {},
              ]}
            >
              儲存
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.editUserPhoneContainer}>
        <Text style={Styles.editUserPhoneTitle}>使用者手機號碼</Text>
        <Text style={Styles.editUserPhoneDescription}>
          Wish Map 會使用以下使用者手機號碼在您填寫捐款人資料時，自動填入表格內
        </Text>
        <View style={Styles.separator} />

        <View
          style={[
            Styles.editUserPhoneInputContainer,
            inputError && { borderColor: '#FF0000' },
          ]}
        >
          <TextInput
            placeholder="請輸入手機號碼"
            value={userPhone}
            onChangeText={text => {
              setUserPhone(text);
            }}
            style={Styles.editUserPhoneInput}
          />
          {userPhone !== '' && !inputError && (
            <TouchableOpacity
              onPress={() => {
                setUserPhone('');
              }}
            >
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
          <Text style={Styles.editUserPhoneInputError}>請輸入正確手機號碼</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
