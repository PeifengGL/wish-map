import React from 'react';
import { View } from 'react-native';
import Styles from './index.style';
import { ProgressBarPropsType } from 'types/wishMap';

const ProgressBar = (props: ProgressBarPropsType) => {
  const { progress, progressColor } = props;
  return (
    <View style={Styles.popupModalProgressBarContainer}>
      <View
        style={[
          Styles.popupModalProgressBar,
          { width: `${progress * 100}%`, backgroundColor: progressColor },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
