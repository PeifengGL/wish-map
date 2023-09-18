import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
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
  const renderPrivacyPolicyGoBack = () => {
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
        <View style={Styles.headerBlock}>
          <View style={Styles.headerGoBack}>{renderPrivacyPolicyGoBack()}</View>
          <Text style={Styles.headerTitle}>個資聲明 ＆ 隱私政策</Text>
        </View>
      </View>

      <ScrollView>
        <View style={Styles.content}>
          <PrivacyContent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
