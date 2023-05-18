// index.tsx
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Button } from 'react-native';
import { RootStackParamList } from '../../types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import Styles from './index.style';
import DataShareService from 'service';
import { Subscription, count } from 'rxjs';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};
export default function Home({ navigation }: PageRouterProps) {
  const [text, setText] = useState<string>('');
  const [countNumber, setCountNumber] = useState<number>(0);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const isLoginSubscription: Subscription =
      DataShareService.getLoginStatus$().subscribe((newIsLogin: boolean) => {
        setIsLogin(newIsLogin);
      });
    return () => {
      isLoginSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    DataShareService.setText('hi test page');
    const textSubscription: Subscription =
      DataShareService.getText$().subscribe(newText => {
        setText(newText);
      });
    const numberSubscription: Subscription =
      DataShareService.getCountNumber$().subscribe((newText: number) => {
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
