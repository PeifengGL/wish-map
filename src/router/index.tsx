// router.tsx
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomePage from 'pages/Welcome';
import WishMapPage from 'pages/WishMap';
import VolunteerPage from 'pages/Volunteer';
import ArticleListPage from 'pages/ArticleList';
import ProfilePage from 'pages/Profile';

import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from 'types/router';
import ImageProvider from 'assets';

import DataShareService from 'service';
import { Subscription } from 'rxjs';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

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

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconSource;

            if (route.name === 'WishMap') {
              iconSource = ImageProvider.Tabs.WishMap;
            } else if (route.name === 'Volunteer') {
              iconSource = ImageProvider.Tabs.Volunteer;
            } else if (route.name === 'ArticleList') {
              iconSource = ImageProvider.Tabs.Article;
            } else if (route.name === 'Profile') {
              iconSource = ImageProvider.Tabs.Profile;
            }

            return (
              <Image
                source={iconSource}
                style={{ tintColor: color, width: size, height: size }}
              />
            );
          },
        })}
      >
        <Tab.Screen name="WishMap" component={WishMapPage} />
        <Tab.Screen name="Volunteer" component={VolunteerPage} />
        <Tab.Screen name="ArticleList" component={ArticleListPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomePage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
