// router.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'pages/Home';
import TestPage from 'pages/TestPage';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from 'types/router';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TestPage" component={TestPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
