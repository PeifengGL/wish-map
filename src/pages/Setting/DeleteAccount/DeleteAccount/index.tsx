import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { SettingStackParamList, RootStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import { Subscription } from 'rxjs';
import DataShareService from 'service';
import { UserProfileType } from 'types/profile';
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';
import Styles from './index.style';

type PageRouterProps = {
  route: RouteProp<SettingStackParamList, 'DeleteAccount'>;
  navigation: NativeStackNavigationProp<SettingStackParamList, 'DeleteAccount'>;
};

export default function DeleteAccountPage({
  route,
  navigation,
}: PageRouterProps) {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const renderDeleteAccountBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);

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

  const handleCancelDeleteAccount = () => {
    navigation.navigate('Setting', { cancelDeleteAccountStatus: true });
  };

  const handleDeleteAccount = () => {
    const userProfile: UserProfileType = {
      userName: '',
      userEmail: '',
      userPhone: '',
      userAddress: '',
      userUID: '',
      userType: '',
      userPassword: '',
    };

    LocalStorage.setData(LocalStorageKeys.UserProfileKey, userProfile).finally(
      () => {
        DataShareService.setUserProfile(userProfile);

        rootNavigation.navigate('Registration', {
          isDeleteAccount: true,
          isLogout: false,
        });
      },
    );
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="#EBF1F9"
        barStyle="dark-content"
        translucent={false}
      />

      <ImageBackground
        source={ImageProvider.Setting.SettingBackgroundImage}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      >
        <View style={Styles.headerContainer}>
          <View style={Styles.goBackButton}>{renderDeleteAccountBack()}</View>
        </View>

        <View style={Styles.content}>
          <Text style={Styles.title}>刪除 Wish Map 帳號</Text>
          <Text style={Styles.description}>
            對於您決定刪除帳號我們感到非常不捨！想了解您刪除帳號的原因，幫助我們更加了解您的想法
          </Text>

          <View style={Styles.separator} />

          <TouchableOpacity
            onPress={handleCancelDeleteAccount}
            style={Styles.cancelButton}
          >
            <Text style={Styles.cancelButtonText}>取消</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteAccount}
            style={Styles.deleteAccountButton}
          >
            <Text style={Styles.deleteAccountButtonText}>刪除帳號</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
