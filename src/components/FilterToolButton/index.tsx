import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Styles from './index.style';
import { FilterToolButtonPropsType } from 'types/components';
import ImageProvider from 'assets';

const FilterToolButton = (props: FilterToolButtonPropsType) => {
  const { isSelected, handleFilterToolClick } = props;
  return (
    <TouchableOpacity
      onPress={handleFilterToolClick}
      style={[
        Styles.filterProjectButtonContainer,
        { backgroundColor: isSelected ? '#0057B8' : '#FFFFFF' },
      ]}
    >
      <View style={Styles.filterProjectButton}>
        <Image
          source={
            isSelected
              ? ImageProvider.WishMap.FilterSelectedIcon
              : ImageProvider.WishMap.FilterIcon
          }
          style={Styles.filterProjectIcon}
        />
        <Text
          style={[
            Styles.filterProjectText,
            { color: isSelected ? '#FFFFFF' : '#0057B8' },
          ]}
        >
          篩選
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilterToolButton;
