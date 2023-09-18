import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from 'types/router';
import { ArticleCardPropsType } from 'types/components';
import { ArticleClass } from 'shared/articles.data';
import Styles from './index.style';

type ArticleCardProps = {
  articleData: {
    id: string;
    image: { url: string };
    publishedAt: string;
    tags: string[];
    title: string;
  };
};

const ArticleCard = (articleData: ArticleCardProps) => {
  const data = articleData.articleData;
  const { id, image, publishedAt, tags, title } = data;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleArticleCardClick = () => {
    const getArticle = `getArticle/${id}`;
    // navigation.push('ArticleDetail', {
    //   articleData: articleData,
    // });
  };

  return (
    <Pressable style={Styles.cardContainer} onPress={handleArticleCardClick}>
      <View style={Styles.cardImageContainer}>
        <Image source={{ uri: image.url }} style={Styles.cardImage} />
      </View>
      <View style={Styles.childrenBox}>
        <Text style={Styles.classText} numberOfLines={2}>
          {tags.join(' ')}
        </Text>
        <Text style={Styles.titleText} numberOfLines={2}>
          {title}
        </Text>
        {/* <Text style={Styles.subTitleText} numberOfLines={3}>
          {article api 沒有 subTitle}
        </Text> */}
        <Text style={Styles.dateText} numberOfLines={3}>
          {publishedAt}
        </Text>
      </View>
    </Pressable>
  );
};

export default ArticleCard;
