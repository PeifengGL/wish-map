import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Styles from './index.style';

type CapsuleButtonPropsType = {
  showText: string | number;
  isSelected?: boolean;
  capsuleWidth?: number | string;
  returnText: string | number;
  handleCapsuleButtonPress: (text: string | number) => void;
};

const CapsuleButton = (props: CapsuleButtonPropsType) => {
  const {
    showText,
    isSelected,
    capsuleWidth,
    returnText,
    handleCapsuleButtonPress,
  } = props;

  const onPress = () => {
    handleCapsuleButtonPress(returnText);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Styles.capsuleButtonContainer,
        {
          width: capsuleWidth ? capsuleWidth : 67,
          backgroundColor: isSelected ? '#00BAB3' : '#FFFFFF',
        },
      ]}
    >
      <Text
        style={[
          Styles.capsuleButtonText,
          { color: isSelected ? '#FFFFFF' : '#2D2D2D' },
        ]}
      >
        {showText}
      </Text>
    </TouchableOpacity>
  );
};

export default CapsuleButton;
