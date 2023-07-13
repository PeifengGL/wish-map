import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { RootStackParamList } from 'types/router';
import ShareButton from 'components/ShareButton';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import { ArticleClass, ArticlesData } from 'shared/articles.data';
import ImageProvider from 'assets';
import ArticleCard from 'components/ArticleCard';
import Styles from './index.style';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'ArticleDetail'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'ArticleDetail'>;
};

export default function ArticleDetailPage({
  route,
  navigation,
}: PageRouterProps) {
  const { articleData } = route.params;

  const readData = ArticlesData.filter(
    article => article.group === articleData?.group,
  );

  const handleArticleDetailGoBack = () => {
    navigation.goBack();
  };

  const dataGroup = articleData?.group!;

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle="light-content"
        hidden={false}
        translucent={true}
      />
      <ScrollView>
        <Image
          source={articleData?.cover_image}
          resizeMode="contain"
          style={Styles.image}
        />
        <View style={Styles.headerButtonContainer}>
          <TouchableOpacity onPress={handleArticleDetailGoBack}>
            <Image source={ImageProvider.Article.ArticleDetailGoBackIcon} />
          </TouchableOpacity>
          <ShareButton
            share_url={articleData?.article_url!}
            type="article"
            shareIcon={ImageProvider.Article.ArticleShareIcon}
          />
        </View>
        <View style={Styles.contentContainer}>
          <View style={Styles.textContainer}>
            <Text style={Styles.text1Style}>
              {ArticleClass[dataGroup][articleData?.type!]}
            </Text>
            <Text style={Styles.text2Style}>{articleData?.date}</Text>
          </View>
          <Text style={Styles.titleText}>{articleData?.title}</Text>
          <Text style={Styles.subTtitleText}>{articleData?.subTitle}</Text>
          <Text style={Styles.contentText}>{articleData?.content}</Text>
          <View style={Styles.separator} />
          <Text style={Styles.titleText}>繼續閱讀</Text>
          {readData.length > 2
            ? readData.slice(0, 3).map((article, index) => {
                return (
                  <View key={index} style={Styles.articleCardContainer}>
                    <ArticleCard articleData={article} />
                  </View>
                );
              })
            : readData.map((article, index) => {
                return (
                  <View key={index} style={Styles.articleCardContainer}>
                    <ArticleCard articleData={article} />
                  </View>
                );
              })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
