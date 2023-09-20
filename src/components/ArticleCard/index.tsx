import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from 'types/router';
import Styles from './index.style';

type ArticleCardProps = {
  articleData: {
    id: string;
    image: { url: string };
    publishedAt: string;
    tags: string[];
    title: string;
    excerpt: string;
  };
};

const ArticleCard = (articleData: ArticleCardProps) => {
  const data = articleData.articleData;
  const { id, image, publishedAt, tags, title, excerpt } = data;
  const publishDate = new Date(publishedAt);
  const year = publishDate.getFullYear();
  const month = publishDate.getMonth() + 1;
  const day = publishDate.getDate();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleArticleCardClick = () => {
    navigation.push('ArticleDetail', {
      articleId: id,
    });
  };

  return (
    <Pressable style={Styles.cardContainer} onPress={handleArticleCardClick}>
      <View style={Styles.cardImageContainer}>
        {image?.url && (
          <Image source={{ uri: image.url }} style={Styles.cardImage} />
        )}
      </View>
      <View style={Styles.childrenBox}>
        <Text style={Styles.classText} numberOfLines={2}>
          {tags.join(' ')}
        </Text>
        <Text style={Styles.titleText} numberOfLines={2}>
          {title}
        </Text>
        <Text style={Styles.subTitleText} numberOfLines={3}>
          {excerpt}
        </Text>
        <Text style={Styles.dateText} numberOfLines={3}>
          發布日期 {`${year} 年 ${month} 月 ${day} 日`}
        </Text>
      </View>
    </Pressable>
  );
};

export default ArticleCard;
