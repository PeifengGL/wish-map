import * as React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Routes from 'router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor=" rgba(0, 0, 0, 0)"
          barStyle="dark-content"
          hidden={false}
          translucent={true}
        />
        <Routes />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
