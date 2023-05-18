import React, { useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from '../../types/router';
import Styles from './index.style';
import DataShareService from 'service';
import { Subscription } from 'rxjs';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'TestPage'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'TestPage'>;
};

export default function TestPage({ route, navigation }: PageRouterProps) {
  // const { text } = route.params;
  const [text, setText] = useState<string>('');
  const [countNumber, setCountNumber] = useState<number>(0);

  useEffect(() => {
    const subscription: Subscription = DataShareService.getText$().subscribe(
      (newText: string) => {
        setText(newText);
      },
    );
    const numberSubscription: Subscription =
      DataShareService.getCountNumber$().subscribe((newText: number) => {
        setCountNumber(newText);
      });
    return () => {
      subscription.unsubscribe();
      numberSubscription.unsubscribe();
    };
  }, []);

  const handleCounterClick = () => {
    DataShareService.setCountNumber(countNumber + 1);
  };

  function handlePress() {
    DataShareService.setLoginStatus(false);
  }

  return (
    <View style={Styles.container}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Text>{text}</Text>
      <Text>{countNumber}</Text>
      <TouchableOpacity onPress={handleCounterClick}>
        <Text>Click</Text>
      </TouchableOpacity>
      <Button title="show intro slider" onPress={handlePress} />
    </View>
  );
}
