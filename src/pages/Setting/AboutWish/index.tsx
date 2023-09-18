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
import Styles from './index.style';
import WishConceptContent from 'components/WishConceptContent';
import { WishData } from 'shared/project.data';

type PageRouterProps = {
  route: RouteProp<SettingStackParamList, 'AboutWish'>;
  navigation: NativeStackNavigationProp<SettingStackParamList, 'AboutWish'>;
};

export default function AboutWishPage({ navigation }: PageRouterProps) {
  const renderAboutWishGoBack = () => {
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
        <View style={Styles.headerFlex}>
          <View style={Styles.goBackButton}>{renderAboutWishGoBack()}</View>
          <Text style={Styles.headerTitle}>關於喜願</Text>
        </View>
      </View>
      <ScrollView>
        <View style={Styles.aboutWishContent}>
          <WishConceptContent wishData={WishData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
