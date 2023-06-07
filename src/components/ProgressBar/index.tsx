import React from 'react';
import { View } from 'react-native';
import Styles from './index.style';
import { ProgressBarPropsType } from 'types/components';

const ProgressBar = (props: ProgressBarPropsType) => {
  const { progress, progressColor, progressHeight } = props;
  return (
    <View
      style={[
        Styles.popupModalProgressBarContainer,
        { height: progressHeight ? progressHeight : 5 },
      ]}
    >
      <View
        style={[
          Styles.popupModalProgressBar,
          { width: `${progress}%`, backgroundColor: progressColor },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
