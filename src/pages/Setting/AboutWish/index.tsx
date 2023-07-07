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
            關於喜願
          </Text>
          <View />
        </View>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: 16, marginTop: 40 }}>
          <WishConceptContent wishData={WishData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
