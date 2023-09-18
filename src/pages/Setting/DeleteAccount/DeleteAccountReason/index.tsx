import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ToastAndroid,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { SettingStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import { Subscription } from 'rxjs';
import DataShareService from 'service';
import { UserProfileType } from 'types/profile';
import Styles from './index.style';
import WishRadioButton from 'components/WishRadioButton';

type PageRouterProps = {
  route: RouteProp<SettingStackParamList, 'DeleteAccountReason'>;
  navigation: NativeStackNavigationProp<
    SettingStackParamList,
    'DeleteAccountReason'
  >;
};

export default function DeleteAccountReasonPage({
  route,
  navigation,
}: PageRouterProps) {
  const [deleteAccountReason, setDeleteAccountReason] = useState<string>('');

  const renderDeleteAccountReasonGoBack = () => {
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

  const radioButtonClick = (text: string) => {
    setDeleteAccountReason(text);
  };

  const handleNextStep = () => {
    if (deleteAccountReason === '') {
      ToastAndroid.show('請選擇刪除原因', ToastAndroid.SHORT);
    } else {
      navigation.navigate('DeleteAccountSafeCheck', {});
    }
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
          <View style={Styles.deleteAccountReasonGoBackContainer}>
            {renderDeleteAccountReasonGoBack()}
          </View>
        </View>

        <View style={Styles.content}>
          <Text style={Styles.title}>刪除 Wish Map 帳號</Text>
          <Text style={Styles.description}>
            對於您決定刪除帳號我們感到非常不捨！想了解您刪除帳號的原因，幫助我們更加了解您的想法
          </Text>

          <View style={Styles.separator} />

          <View style={Styles.reasonContainer}>
            <View>
              <View style={Styles.reasonItemContainer}>
                <WishRadioButton
                  itemText="我對資料安全有疑慮"
                  isSelected={deleteAccountReason === '我對資料安全有疑慮'}
                  radioClickFunction={radioButtonClick}
                />
              </View>

              <View style={Styles.reasonItemContainer}>
                <WishRadioButton
                  itemText="隱私顧慮"
                  isSelected={deleteAccountReason === '隱私顧慮'}
                  radioClickFunction={radioButtonClick}
                />
              </View>

              <View style={Styles.reasonItemContainer}>
                <WishRadioButton
                  itemText="找不到想捐款的對象"
                  isSelected={deleteAccountReason === '找不到想捐款的對象'}
                  radioClickFunction={radioButtonClick}
                />
              </View>

              <View style={Styles.reasonItemContainer}>
                <WishRadioButton
                  itemText="無法開始使用"
                  isSelected={deleteAccountReason === '無法開始使用'}
                  radioClickFunction={radioButtonClick}
                />
              </View>

              <View style={Styles.reasonItemContainer}>
                <WishRadioButton
                  itemText="操作不方便"
                  isSelected={deleteAccountReason === '操作不方便'}
                  radioClickFunction={radioButtonClick}
                />
              </View>

              <View style={Styles.reasonItemContainer}>
                <WishRadioButton
                  itemText="其他"
                  isSelected={deleteAccountReason === '其他'}
                  radioClickFunction={radioButtonClick}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={Styles.continueButtonContainer}>
          <TouchableOpacity
            onPress={handleNextStep}
            style={[
              Styles.continueButton,
              deleteAccountReason === ''
                ? { backgroundColor: '#ECECEC' }
                : { backgroundColor: '#0057B8' },
            ]}
            disabled={deleteAccountReason === ''}
          >
            <Text
              style={[
                Styles.continueButtonText,
                deleteAccountReason === ''
                  ? { color: '#909090' }
                  : { color: '#ffffff' },
              ]}
            >
              繼續
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
