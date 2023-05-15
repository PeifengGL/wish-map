// index.tsx
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { RootStackParamList } from '../../types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import Styles from './index.style';
import DataShareService from 'service';
import { Subscription } from 'rxjs';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};
export default function HomeScreen({ navigation }: PageRouterProps) {
  const [text, setText] = useState<string>('');
  const [countNumber, setCountNumber] = useState<number>(0);

  useEffect(() => {
    DataShareService.setText('hi test page');
    const textSubscription: Subscription = DataShareService.getText$().subscribe(
      newText => {
        console.log('newText', newText);
        setText(newText);
      },
    );
    const numberSubscription: Subscription =
      DataShareService.getCountNumber$().subscribe((newText: number) => {
        console.log('newText', newText);
        setCountNumber(newText);
      });
    return () => {
      textSubscription.unsubscribe();
      numberSubscription.unsubscribe();
    };
  }, []);

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TestPage', { text: 'Hi, This is TestPage' })
        }
      >
        <Text>Go to TestPage</Text>
        <Text>{text}</Text>
        <Text>{countNumber}</Text>
      </TouchableOpacity>
    </View>
  );
}
