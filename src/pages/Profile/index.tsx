import React from 'react';
import { Text } from 'react-native';
import { RootStackParamList } from 'types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Profile'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

export default function ProfilePage({ navigation }: PageRouterProps) {
  return (
    <>
      <Text>這是個人頁面</Text>
    </>
  );
}
