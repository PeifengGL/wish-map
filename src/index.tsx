import * as React from 'react';
import { SafeAreaView } from 'react-native';
import Routes from 'router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Styles from 'index.style';

export default function App() {
  return (
    <GestureHandlerRootView style={Styles.gestureHandlerStyle}>
      <SafeAreaView style={Styles.safeAreaStyle}>
        <Routes />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
