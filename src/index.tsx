import * as React from 'react';
import { SafeAreaView } from 'react-native';
import Routes from 'router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Styles from 'index.style';
import { UserProfileType } from 'types/profile';
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';
import DataShareService from 'service';

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

  LocalStorage.getData<boolean>(LocalStorageKeys.FirstOpenAppKey).then(
    (localIsFirstOpenApp: boolean | null) => {
      console.log('localIsFirstOpenApp', localIsFirstOpenApp);
      if (localIsFirstOpenApp !== null) {
        DataShareService.setIsFirstOpenApp(localIsFirstOpenApp);
        setTimeout(() => {}, 2000);
      }
    },
  );

  return (
    <GestureHandlerRootView style={Styles.gestureHandlerStyle}>
      <SafeAreaView style={Styles.safeAreaStyle}>
        <Routes />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
