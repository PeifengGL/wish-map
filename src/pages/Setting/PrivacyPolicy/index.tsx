import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ToastAndroid,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { SettingStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import PrivacyContent from 'components/PrivacyContent';
import Styles from './index.style';

type PageRouterProps = {
  route: RouteProp<SettingStackParamList, 'PrivacyPolicy'>;
  navigation: NativeStackNavigationProp<SettingStackParamList, 'PrivacyPolicy'>;
};

export default function PrivacyPolicyPage({ navigation }: PageRouterProps) {
  const renderDeleteAccountReasonGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
      </TouchableOpacity>
    );
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
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginVertical: 16,
          }}
        >
          <View style={{ position: 'absolute', left: 0, top: 0 }}>
            {renderDeleteAccountReasonGoBack()}
          </View>

          <Text
            style={{
              marginBottom: 14,
              marginTop: 10,
              color: '#75787B',
              fontSize: 16,
              fontWeight: '500',
              fontFamily: 'Lato',
            }}
          >
            個資聲明 ＆ 隱私政策
          </Text>
          <View />
        </View>
      </View>

      <ScrollView>
        <View style={{ marginTop: 40 }}>
          <PrivacyContent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
