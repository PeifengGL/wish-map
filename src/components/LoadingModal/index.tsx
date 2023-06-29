import React from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import Styles from './index.style';

const LoadingModal = () => {
  return (
    <Pressable disabled style={Styles.loadingModal}>
      <ActivityIndicator size="large" />
    </Pressable>
  );
};

export default LoadingModal;
