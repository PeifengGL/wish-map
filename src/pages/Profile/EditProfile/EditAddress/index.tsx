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
  route: RouteProp<ProfileStackParamList, 'EditAddress'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'EditAddress'>;
};

export default function EditAddressPage({ navigation }: PageRouterProps) {
  const [userProfile, setUserProfile] = useState<UserProfileType>();
  const [userAddress, setUserAddress] = useState<string>('');

  useEffect(() => {
    const userProfileSubscription: Subscription =
      DataShareService.getUserProfile$().subscribe(
        (newUserProfile: UserProfileType) => {
          setUserProfile(newUserProfile);
          setUserAddress(newUserProfile.userAddress);
        },
      );
    return () => {
      userProfileSubscription.unsubscribe();
    };
  }, []);

  const renderEditUserAddressGoBack = () => {
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
      userPhone: userProfile?.userPhone!,
      userEmail: userProfile?.userEmail!,
      userAddress: userAddress,
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
          {renderEditUserAddressGoBack()}
          <TouchableOpacity onPress={saveEditUserPhone}>
            <Text
              style={{ fontSize: 14, fontFamily: 'Lato', color: '#0057B8' }}
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
          使用者聯絡地址
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            fontFamily: 'Lato',
            color: '#75787B',
          }}
        >
          Wish Map 會使用以下使用者聯絡地址在您填寫捐款人資料時，自動填入表格內
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
          style={{
            borderColor: '#0057B8',
            borderWidth: 1,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
          }}
        >
          <TextInput
            placeholder="請輸入聯絡地址"
            value={userAddress}
            onChangeText={setUserAddress}
            style={{
              flex: 1,
            }}
          />
          {userAddress !== '' && (
            <TouchableOpacity onPress={() => setUserAddress('')}>
              <Image
                source={ImageProvider.Profile.EditProfileTextInputCleanIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
