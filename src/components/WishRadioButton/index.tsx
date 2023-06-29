import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { WishRadioButtonPropsType } from 'types/components';
import Styles from './index.style';

const WishRadioButton = (props: WishRadioButtonPropsType) => {
  const { isSelected, radioClickFunction } = props;
  const itemText = props.itemText ? props.itemText : '';

  return (
    <TouchableOpacity
      onPress={() => radioClickFunction(itemText)}
      style={Styles.radioContainer}
    >
      <View style={Styles.radioOuter}>
        <View
          style={
            isSelected ? Styles.radioInnerSelected : Styles.radioInnerUnSelected
          }
        ></View>
      </View>
      {itemText !== '' ? (
        <Text style={Styles.radioItem}>{itemText}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default WishRadioButton;
