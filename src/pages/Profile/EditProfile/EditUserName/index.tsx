import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
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
import Styles from './index.style';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import { Subscription } from 'rxjs';
import DataShareService from 'service';
import { UserProfileType } from 'types/profile';
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';

type PageRouterProps = {
  route: RouteProp<ProfileStackParamList, 'EditUsername'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'EditUsername'>;
};

export default function EditUsernamePage({ navigation }: PageRouterProps) {
  const [userProfile, setUserProfile] = useState<UserProfileType>();
  const [userName, setUserName] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);

  useEffect(() => {
    const userProfileSubscription: Subscription =
      DataShareService.getUserProfile$().subscribe(
        (newUserProfile: UserProfileType) => {
          setUserProfile(newUserProfile);
          setUserName(newUserProfile.userName);
        },
      );
    return () => {
      userProfileSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userName === '') {
      setInputError(true);
    } else {
      setInputError(false);
    }
  }, [userName]);

  const renderEditUsernameGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const saveEditUsername = () => {
    if (userName !== '') {
      const updatedUserProfile: UserProfileType = {
        userUID: userProfile?.userUID!,
        userName: userName,
        userEmail: userProfile?.userEmail!,
        userPhone: userProfile?.userPhone!,
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
    }
  };

  const onInputBlur = () => {
    if (userName === '') {
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
          <View style={Styles.goBackButton}>{renderEditUsernameGoBack()}</View>

          <TouchableOpacity
            onPress={saveEditUsername}
            disabled={inputError || userName === ''}
          >
            <Text
              style={[
                { fontSize: 14, fontFamily: 'Lato', color: '#0057B8' },
                inputError || userName === '' ? { color: '#75787B' } : {},
              ]}
            >
              儲存
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.editUserNameContainer}>
        <Text style={Styles.editUserNameTitle}>使用者名稱</Text>
        <Text style={Styles.editUserNameDescription}>
          Wish Map 會使用以下使用者名稱在您填寫捐款人資料時，自動填入表格內
        </Text>
        <View style={Styles.separator} />

        <View
          style={[
            Styles.editUserNameInputContainer,
            inputError && { borderColor: '#FF0000' },
          ]}
        >
          <TextInput
            placeholder="請輸入使用者名稱"
            value={userName}
            onChangeText={text => {
              text !== '' ? setInputError(false) : setInputError(true);
              setUserName(text);
            }}
            onBlur={onInputBlur}
            style={Styles.editUserNameInput}
          />
          {userName !== '' && !inputError && (
            <TouchableOpacity onPress={() => setUserName('')}>
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
          <Text style={Styles.editUserNameInputErrorText}>
            使用者名稱無法為空
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
