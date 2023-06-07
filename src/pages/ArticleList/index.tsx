import React from 'react';
import { Text } from 'react-native';
import { RootStackParamList } from 'types/router'
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'ArticleList'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'ArticleList'>;
};

export default function ArticleListPage({ navigation }: PageRouterProps) {
  return (
    <>
      <Text>這是文章列表頁面</Text>
    </>
  );
}
