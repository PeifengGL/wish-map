import React from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import Styles from './index.style';

interface LoadingModalProps {
  color?: string;
}

const LoadingModal = (props: LoadingModalProps) => {
  const { color } = props;

  return (
    <Pressable
      disabled
      style={[Styles.loadingModal, color ? { backgroundColor: color } : null]}
    >
      <ActivityIndicator size="large" />
    </Pressable>
  );
};

export default LoadingModal;
