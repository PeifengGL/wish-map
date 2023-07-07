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
import { Subscription } from 'rxjs';
import DataShareService from 'service';
import { UserProfileType } from 'types/profile';
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';
import Styles from './index.style';

type PageRouterProps = {
  route: RouteProp<ProfileStackParamList, 'EditPhone'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'EditPhone'>;
};

export default function EditPhonePage({ navigation }: PageRouterProps) {
  const [userProfile, setUserProfile] = useState<UserProfileType>();
  const [userPhone, setUserPhone] = useState<string>('');
  const [formatPhoneNumber, setFormatPhoneNumber] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);
  const phoneRegex: RegExp = /^09\d{8}$/;

  useEffect(() => {
    const userProfileSubscription: Subscription =
      DataShareService.getUserProfile$().subscribe(
        (newUserProfile: UserProfileType) => {
          setUserProfile(newUserProfile);
          setUserPhone(newUserProfile.userPhone.replace(/-/g, ''));
          setFormatPhoneNumber(newUserProfile.userPhone);
        },
      );
    return () => {
      userProfileSubscription.unsubscribe();
    };
  }, []);

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

  const renderEditUserEmailGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const saveEditUserPhone = () => {
    const updatedUserProfile: UserProfileType = {
      userUID: userProfile?.userUID!,
      userName: userProfile?.userName!,
      userPhone: formatPhoneNumber,
      userEmail: userProfile?.userEmail!,
      userAddress: userProfile?.userAddress!,
      userType: userProfile?.userType!,
      userPassword: userProfile?.userPassword!,
    };

    LocalStorage.setData<UserProfileType>(
      LocalStorageKeys.UserProfileKey,
      updatedUserProfile,
    ).then(() => {
      DataShareService.setUserProfile(updatedUserProfile);
      console.log('updatedUserProfile-success', updatedUserProfile);
    });

    navigation.goBack();
  };

  const formatPhone = (phoneNumber: string) => {
    const phoneRegex = /^(\d{4})(\d{3})(\d{3})$/;
    return phoneNumber.replace(phoneRegex, '$1-$2-$3');
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="#EBF1F9"
        barStyle="dark-content"
        translucent={false}
      />

      <View style={Styles.headerContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <View style={{ marginVertical: 16 }}>
            {renderEditUserEmailGoBack()}
          </View>
          <TouchableOpacity onPress={saveEditUserPhone} disabled={inputError}>
            <Text
              style={[
                { fontSize: 14, fontFamily: 'Lato', color: '#0057B8' },
                inputError ? { color: '#75787B' } : {},
              ]}
            >
              儲存
            </Text>
          </TouchableOpacity>
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
          使用者手機號碼
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            fontFamily: 'Lato',
            color: '#75787B',
          }}
        >
          Wish Map 會使用以下使用者手機號碼在您填寫捐款人資料時，自動填入表格內
        </Text>
        <View
          style={{
            height: 2,
            width: '100%',
            backgroundColor: '#D9D9D9',
            marginVertical: 24,
          }}
        />

        <View
          style={[
            {
              borderColor: '#0057B8',
              borderWidth: 1,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
            },
            inputError && { borderColor: '#FF0000' },
          ]}
        >
          <TextInput
            placeholder="請輸入手機號碼"
            value={formatPhoneNumber}
            onChangeText={text => {
              console.log('text', text);
              setUserPhone(text.replace(/-/g, ''));
              setFormatPhoneNumber(formatPhone(text));
            }}
            style={{
              flex: 1,
            }}
          />
          {userPhone !== '' && !inputError && (
            <TouchableOpacity
              onPress={() => {
                setUserPhone('');
                setFormatPhoneNumber('');
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
          <Text
            style={{
              fontSize: 11,
              fontFamily: 'Lato',
              fontWeight: '500',
              color: '#F23A3C',
              marginTop: 4,
              marginLeft: 16,
            }}
          >
            請輸入正確手機號碼
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
