import React from 'react';
import { Text, View, Image } from 'react-native';
import ImageProvider from 'assets';
import { WishConceptContentPropsType } from 'types/components';
import Styles from './index.style';

const WishConceptContent = (props: WishConceptContentPropsType) => {
  const { wishData } = props;
  return (
    <View>
      <View>
        <Text style={Styles.wishDetailTitle}>{wishData.title1}</Text>
        <View style={Styles.wishDetailSubContainer}>
          <Image source={ImageProvider.WishMap.WishDetailIcon1} />
          <Text style={Styles.wishDetailSubtitleText}>
            {wishData?.subTitle1}
          </Text>
        </View>
        <Text style={Styles.wishDetailDescription}>
          {wishData.description1}
        </Text>

        <View style={Styles.wishDetailSubContainer}>
          <Image source={ImageProvider.WishMap.WishDetailIcon2} />
          <Text style={Styles.wishDetailSubtitleText}>
            {wishData?.subTitle2}
          </Text>
        </View>
        <Text style={Styles.wishDetailDescription}>
          {wishData.description2}
        </Text>

        <View style={Styles.wishDetailSubContainer}>
          <Image source={ImageProvider.WishMap.WishDetailIcon3} />
          <Text style={Styles.wishDetailSubtitleText}>
            {wishData?.subTitle3}
          </Text>
        </View>
        <Text style={Styles.wishDetailDescription}>
          {wishData.description3}
        </Text>
      </View>

      <View style={[Styles.separator, Styles.wishDetailSeparator]} />
      <Text style={Styles.wishDetailTitle}>{wishData.title2}</Text>
      <Text style={Styles.wishDetailDescription}>{wishData.content2}</Text>

      <View style={[Styles.separator, Styles.wishDetailSeparator]} />
      <Text style={Styles.wishDetailTitle}>{wishData.title3}</Text>
      <Text style={Styles.wishDetailDescription}>{wishData.content3}</Text>

      <View style={[Styles.separator, Styles.wishDetailSeparator]} />
      <Text style={Styles.wishDetailTitle}>{wishData.title4}</Text>
      <Text style={Styles.wishDetailDescription}>{wishData.content4}</Text>
    </View>
  );
};

export default WishConceptContent;
