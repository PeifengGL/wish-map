// index.tsx
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { RootStackParamList } from '../../types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import Styles from './index.style';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};
export default function HomeScreen({ navigation }: PageRouterProps) {
  return (
    <View style={Styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TestPage', { text: 'Hi, This is TestPage' })
        }
      >
        <Text>Go to TestPage</Text>
      </TouchableOpacity>
    </View>
  );
}
