import React from 'react';
import { Button, View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from '../../types/router';
import Styles from './index.style';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'TestPage'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'TestPage'>;
};

export default function TestPage({ route, navigation }: PageRouterProps) {
  console.log(route.params);
  const { text } = route.params;
  return (
    <View style={Styles.container}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Text>{text}</Text>
    </View>
  );
}
