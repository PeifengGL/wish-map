// router.tsx
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Registration from 'pages/Registration';
import Home from 'pages/Home';
import Welcome from 'pages/Welcome';
import TestPage from 'pages/TestPage';
import Login from 'pages/Login';

import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from 'types/router';

import DataShareService from 'service';
import { Subscription } from 'rxjs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="TestPage" component={TestPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
