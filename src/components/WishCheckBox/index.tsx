import React, { useRef, useState } from 'react';
import { TouchableWithoutFeedback, Animated, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './index.style';

/* 
tinTColors 顏色
value 值
containerStyle 寬高給一格值 預設正方形
onValueChange 更改的值
 */
interface CheckboxProps {
  tintColors?: { true: string; false: string };
  value?: boolean;
  size?: number;
  onValueChange?: (isChecked: boolean) => void;
}

const CheckboxComponent: React.FC<CheckboxProps> = ({
  tintColors,
  value,
  size = 22,
  onValueChange,
}) => {
  const [isChecked, setChecked] = useState(value || false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  // 動畫
  const toggleCheckbox = () => {
    const newValue = !isChecked;
    setChecked(newValue);

    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onValueChange && onValueChange(newValue);
      }
    });
  };

  // 計算比例
  const ratio = size / 22;
  // 調整svg勾勾大小
  const svgWidth = 13.75 * ratio;
  const svgHeight = 10.62 * ratio;

  return (
    <TouchableWithoutFeedback onPress={toggleCheckbox}>
      <View style={[styles.container, { width: size, height: size }]}>
        <Animated.View
          style={[
            styles.checkbox,
            { transform: [{ scale: scaleValue }] },
            {
              borderColor: tintColors?.true,
              backgroundColor: isChecked ? tintColors?.false : 'white',
              width: size,
              height: size,
            },
          ]}
        >
          {isChecked && (
            <Svg
              height={svgHeight}
              width={svgWidth}
              viewBox={`0 0 13.75 10.62`}
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <Path
                d="M1 5L5.5 9.5L12.5 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CheckboxComponent;
