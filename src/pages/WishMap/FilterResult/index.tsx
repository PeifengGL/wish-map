import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'FilterResult'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'FilterResult'>;
};

export default function FilterResultPage({ navigation }: PageRouterProps) {
  return (
    <View style={{ flex: 1 }}>
      <FocusAwareStatusBar
        backgroundColor="#FFFFFF"
        barStyle="default"
        hidden={false}
        translucent={false}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('WishMap', {
            childPage: 'FilterResultPage',
          })
        }
      >
        <Text>123</Text>
      </TouchableOpacity>
    </View>
  );
}
