import React from 'react';
import { Text } from 'react-native';
import { RootStackParamList } from 'types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Volunteer'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Volunteer'>;
};

export default function VolunteerPage({ navigation }: PageRouterProps) {
  return (
    <>
      <Text>這是志願者專區</Text>
    </>
  );
}
