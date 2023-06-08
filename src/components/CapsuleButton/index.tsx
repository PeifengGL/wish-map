import React from 'react';
import { View, Text, TouchableOpacity, Pressable, Image } from 'react-native';
import ImageProvider from 'assets';
import Styles from './index.style';
import { CapsuleButtonPropsType } from 'types/components';

const CapsuleButton = (props: CapsuleButtonPropsType) => {
  const {
    showText,
    isSelected,
    capsuleWidth,
    returnText,
    showCancelIcon,
    capsuleEnabled,
    handleCancelIconPress,
    handleCapsuleButtonPress,
  } = props;

  const onPress = () => {
    if (handleCapsuleButtonPress) {
      handleCapsuleButtonPress(returnText);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleCapsuleButtonPress ? onPress : () => {}}
      disabled={capsuleEnabled === false ? true : false}
      style={[
        Styles.capsuleButtonContainer,
        {
          width: capsuleWidth ? capsuleWidth : 'auto',
          backgroundColor: isSelected ? '#00BAB3' : '#FFFFFF',
        },
      ]}
    >
      <View style={Styles.capsuleView}>
        <Text
          style={[
            Styles.capsuleButtonText,
            { color: isSelected ? '#FFFFFF' : '#2D2D2D' },
          ]}
        >
          {showText}
        </Text>
        {showCancelIcon ? (
          <Pressable
            style={Styles.capsuleButtonCancelIcon}
            onPress={handleCancelIconPress}
          >
            <Image source={ImageProvider.WishMap.CapsuleCancelIcon} />
          </Pressable>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default CapsuleButton;
