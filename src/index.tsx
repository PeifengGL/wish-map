import * as React from 'react';
import { SafeAreaView } from 'react-native';
import Routes from 'router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Routes />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
