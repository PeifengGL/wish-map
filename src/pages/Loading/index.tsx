import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { RootStackParamList } from 'types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Loading'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Loading'>;
};
export default function LoadingPage({ navigation }: PageRouterProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  useEffect(() => {
    if (!isLoading) {
      navigation.navigate('Welcome', {});
    }
  }, [isLoading]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      {/* <ActivityIndicator size='large' color="#0057B8" /> */}
    </View>
  );
}
