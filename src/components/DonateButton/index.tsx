import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';
import Styles from './index.style';
import { DonateButtonPropsType } from 'types/components';

const DonateButton = (props: DonateButtonPropsType) => {
  const { donate_url, buttonText, buttonBackgroundColor, buttonTextStyle } =
    props;

  const openURL = (url: string) => {
    Linking.openURL(url).catch(error =>
      console.error('An error occurred', error),
    );
  };

  const handleDonateButtonPress = () => {
    openURL(donate_url);
  };

  return (
    <TouchableOpacity
      style={[Styles.donateButton, { backgroundColor: buttonBackgroundColor }]}
      onPress={handleDonateButtonPress}
    >
      <Text style={[Styles.donateButtonText, buttonTextStyle]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default DonateButton;
