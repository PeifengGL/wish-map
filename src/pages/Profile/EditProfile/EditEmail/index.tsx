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
  route: RouteProp<ProfileStackParamList, 'EditEmail'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'EditEmail'>;
};

export default function EditEmailPage({ navigation }: PageRouterProps) {
  const [userProfile, setUserProfile] = useState<UserProfileType>();
  const [userEmail, setUserEmail] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const userProfileSubscription: Subscription =
      DataShareService.getUserProfile$().subscribe(
        (newUserProfile: UserProfileType) => {
          setUserProfile(newUserProfile);
          setUserEmail(newUserProfile.userEmail);
        },
      );
    return () => {
      userProfileSubscription.unsubscribe();
    };
  }, []);

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
      const updatedUserProfile: UserProfileType = {
        userUID: userProfile?.userUID!,
        userName: userProfile?.userName!,
        userEmail: userEmail,
        userPhone: userProfile?.userPhone!,
        userAddress: userProfile?.userAddress!,
        userType: userProfile?.userType!,
      };

      LocalStorage.setData<UserProfileType>(
        LocalStorageKeys.UserProfileKey,
        updatedUserProfile,
      ).then(() => {
        DataShareService.setUserProfile(updatedUserProfile);
        console.log('updatedUserProfile-success', updatedUserProfile);
      });

      navigation.goBack();
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
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 12,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {renderEdituserEmailGoBack()}
          <TouchableOpacity
            onPress={saveEditUserEmail}
            disabled={inputError || userEmail === ''}
          >
            <Text
              style={[
                { fontSize: 14, fontFamily: 'Lato', color: '#0057B8' },
                inputError || userEmail === '' ? { color: '#75787B' } : {},
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
          使用者電子信箱
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            fontFamily: 'Lato',
            color: '#75787B',
          }}
        >
          Wish Map 會使用以下使用者電子信箱在您填寫捐款人資料時，自動填入表格內
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
            placeholder="請輸入使用者電子信箱"
            value={userEmail}
            onChangeText={text => {
              setUserEmail(text);
              // text !== '' ? setInputError(false) : setInputError(true);
            }}
            onBlur={onInputBlur}
            style={{
              flex: 1,
            }}
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
            使用者電子信箱格式錯誤
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}