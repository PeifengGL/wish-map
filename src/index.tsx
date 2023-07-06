import * as React from 'react';
import { SafeAreaView } from 'react-native';
import Routes from 'router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Styles from 'index.style';
import { UserProfileType } from 'types/profile';
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';
import DataShareService from 'service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function App() {
  LocalStorage.getData<UserProfileType>(LocalStorageKeys.UserProfileKey).then(
    (localUserProfile: UserProfileType | null) => {
      console.log('1');
      if (localUserProfile !== null) {
        console.log('localUserProfile', localUserProfile);
        DataShareService.setUserProfile(localUserProfile);
        setTimeout(() => {}, 2000);
      }
    },
  );

  // useEffect(readReminders, []);

  // function readReminders() {
  //   AsyncStorage.getItem(LocalStorageKeys.UserProfileKey).then(res => {
  //     console.log('123123');

  //     if (res) {
  //       const tranRes: UserProfileType = JSON.parse(res);
  //       console.log('tranRes', tranRes);
  //       DataShareService.setUserProfile(tranRes);
  //     }
  //   });
  // }

  return (
    <GestureHandlerRootView style={Styles.gestureHandlerStyle}>
      <SafeAreaView style={Styles.safeAreaStyle}>
        <Routes />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
