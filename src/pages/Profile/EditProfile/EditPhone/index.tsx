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
import Toast from 'react-native-toast-message';

type PageRouterProps = {
  route: RouteProp<ProfileStackParamList, 'EditPhone'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'EditPhone'>;
};

export default function EditPhonePage({ route, navigation }: PageRouterProps) {
  const { phone } = route.params;
  const [userPhone, setUserPhone] = useState<string>(phone);
  const [inputError, setInputError] = useState<boolean>(false);
  const phoneRegex: RegExp = /^09\d{8}$/;

  useEffect(() => {
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
            const cleanedNumber = userPhone.replace(/[-\s]/g, '');
            let updatePhone = cleanedNumber;
            if (cleanedNumber.startsWith('09') && cleanedNumber.length === 10) {
              updatePhone = `+886${cleanedNumber.slice(1)}`;
            }
            updateCustomerPhone(token, updatePhone).then(customerData => {
              console.log(customerData);
              if (customerData.customerUserErrors.length > 0) {
                Toast.show({
                  type: 'customToast',
                  text1: customerData.customerUserErrors[0].message,
                  position: 'bottom',
                  bottomOffset: 28,
                  autoHide: true,
                  visibilityTime: 3000,
                });
              } else if (customerData.customer !== null) {
                console.log(customerData.customer.phone);
                navigation.goBack();
              }
            });
          }
        },
      );
    }
  };

  const toastConfig = {
    customToast: ({ text1 }: any) => (
      <View style={Styles.toast}>
        <Text style={Styles.toastText}>{text1}</Text>
        <TouchableOpacity onPress={() => Toast.hide()}>
          <Image source={ImageProvider.Register.CloseToast} />
        </TouchableOpacity>
      </View>
    ),
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
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}
