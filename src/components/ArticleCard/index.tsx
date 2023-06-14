import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ArticleCardPropsType } from 'types/components';
import { RootStackParamList } from 'types/router';
import { ArticleClass } from 'shared/articles.data';
import Styles from './index.style';

const ArticleCard = (props: ArticleCardPropsType) => {
  const { articleData } = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleArticleCardClick = () => {
    navigation.push('ArticleDetail', {
      articleData: articleData,
    });
  };

  return (
    <Pressable style={Styles.cardContainer} onPress={handleArticleCardClick}>
      <View style={Styles.cardImageContainer}>
        <Image source={articleData.cover_image} style={Styles.cardImage} />
      </View>
      <View style={Styles.childrenBox}>
        <Text style={Styles.classText} numberOfLines={2}>
          {ArticleClass.message[articleData.type]}
        </Text>
        <Text style={Styles.titleText} numberOfLines={2}>
          {articleData.title}
        </Text>
        <Text style={Styles.subTitleText} numberOfLines={3}>
          {articleData.subTitle}
        </Text>
        <Text style={Styles.dateText} numberOfLines={3}>
          {articleData.date}
        </Text>
      </View>
    </Pressable>
  );
};

export default ArticleCard;
