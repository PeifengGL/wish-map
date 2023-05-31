import React from 'react';
import { View, Text } from 'react-native';
import Styles from './index.style';

type CapsuleButtonPropsType = {
  showText: string;
};

const CapsuleButton = (props: CapsuleButtonPropsType) => {
  const { showText } = props;

  return (
    <View style={Styles.capsuleButtonContainer}>
      <Text>{showText}</Text>
    </View>
  );
};

export default CapsuleButton;
