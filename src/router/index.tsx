import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Host } from 'react-native-portalize';

import LoginPage from 'pages/Login';
import WelcomePage from 'pages/Welcome';
import WishMapPage from 'pages/WishMap';
import VolunteerPage from 'pages/Volunteer';
import ArticleListPage from 'pages/ArticleList';
import ProfilePage from 'pages/Profile';
import FilterResultPage from 'pages/WishMap/FilterResult';
import ProjectDetailPage from 'pages/WishMap/ProjectDetail';
import RegistrationPage from 'pages/Registration';
import ArticleDetailPage from 'pages/ArticleList/ArticleDetail';
import VolunteerApplyPage from 'pages/Volunteer/VolunteerApply';
import WishApplyPage from 'pages/WishMap/WishApply';
import WishApplyNextStepPage from 'pages/WishMap/WishApplyNextStep';

import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from 'types/router';
import ImageProvider from 'assets';

import DataShareService from 'service';
import { Subscription } from 'rxjs';
import { IdentityType } from 'types/router';

import Styles from './index.style';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Routes() {
  const [isLogin, setIsLogin] = useState(false);
  const [identityType, setIdentityType] = useState<IdentityType>('guest');

  useEffect(() => {
    const isLoginSubscription: Subscription =
      DataShareService.getLoginStatus$().subscribe((newIsLogin: boolean) => {
        setIsLogin(newIsLogin);
      });
    const identityTypeSubscription: Subscription =
      DataShareService.getIdentityType$().subscribe(
        (newIdentityType: IdentityType) => {
          setIdentityType(newIdentityType);
        },
      );
    return () => {
      isLoginSubscription.unsubscribe();
      identityTypeSubscription.unsubscribe();
    };
  }, []);

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          keyboardHidesTabBar: true,
          tabBarStyle: Styles.tabBarStyle,
          tabBarIcon: ({ color, size, focused }) => {
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
              <View
                style={[
                  Styles.tabBarIconContainer,
                  focused ? Styles.tabBarSelected : {},
                ]}
              >
                <Image
                  source={iconSource}
                  style={[
                    {
                      tintColor: color,
                      width: size,
                      height: size,
                    },
                    Styles.tabBarIcon,
                  ]}
                />
              </View>
            );
          },
          tabBarLabel: ({ color }) => {
            let label;
            if (route.name === 'WishMap') {
              label = '喜願地圖';
            } else if (route.name === 'Volunteer') {
              label = '志工專區';
            } else if (route.name === 'ArticleList') {
              label = '喜願文章';
            } else if (route.name === 'Profile') {
              label = '個人';
            }

            return <Text style={[{ color }, Styles.tabBarLabel]}>{label}</Text>;
          },
        })}
      >
        <Tab.Screen
          name="WishMap"
          component={WishMapPage}
          // initialParams={{ childPage: 'WishMap' }}
        />
        <Tab.Screen name="Volunteer" component={VolunteerPage} />
        <Tab.Screen name="ArticleList" component={ArticleListPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Host>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {identityType !== '' ? (
            <>
              <Stack.Screen name="HomeTabs" component={HomeTabs} />
              <Stack.Screen name="FilterResult" component={FilterResultPage} />
              <Stack.Screen
                name="ProjectDetail"
                component={ProjectDetailPage}
              />
              <Stack.Screen
                name="ArticleDetail"
                component={ArticleDetailPage}
              />
              <Stack.Screen
                name="VolunteerApply"
                component={VolunteerApplyPage}
              />
              <Stack.Screen name="WishApply" component={WishApplyPage} />
              <Stack.Screen
                name="WishApplyNextStep"
                component={WishApplyNextStepPage}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={WelcomePage} />
              <Stack.Screen name="Registration" component={RegistrationPage} />
              <Stack.Screen name="Login" component={LoginPage} />
            </>
          )}
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
}
