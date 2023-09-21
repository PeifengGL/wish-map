import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import { RootStackParamList } from 'types/router';
import ShareButton from 'components/ShareButton';
import ImageProvider from 'assets';
import ArticleCard from 'components/ArticleCard';
import Styles from './index.style';
import { useState, useRef, useEffect } from 'react';
import { getArticleById, getReadMoreArticles } from 'api/ArticleList';
import { ArticleData, ArticleCardData } from 'types/articleList';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'ArticleDetail'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'ArticleDetail'>;
};

const articleDefaultData = {
  contentHtml: '',
  excerpt: '',
  handle: '',
  id: '',
  image: {
    url: '',
  },
  onlineStoreUrl: '',
  publishedAt: '',
  tags: [],
  title: '',
  blog: {
    handle: '',
    title: '',
  },
} as ArticleData;

export default function ArticleDetailPage({
  route,
  navigation,
}: PageRouterProps) {
  const { articleId } = route.params;
  const [articleData, setArticleData] =
    useState<ArticleData>(articleDefaultData);
  const [contentHtml, setContentHtml] = useState({
    html: '',
  });
  const [readMoreArticles, setReadMoreArticles] = useState<ArticleCardData[]>(
    [],
  );

  const { width } = useWindowDimensions();

  const statusBarHeight = StatusBar.currentHeight;

  useEffect(() => {
    getArticleById(articleId)
      .then(data => {
        setArticleData(data);
        setContentHtml({ html: data.contentHtml });
        const filter = {
          handle: data.blog.handle,
          id: data.id,
        };
        return filter;
      })
      .then(filter => {
        getReadMoreArticles(filter.handle).then(data => {
          const readMoreList = data.filter(
            (article: ArticleCardData) => article.id !== filter.id,
          );
          if (readMoreList.length >= 4) {
            readMoreList.pop();
          }
          setReadMoreArticles(readMoreList);
        });
      });
  }, []);

  const handleArticleDetailGoBack = () => {
    navigation.goBack();
  };

  const scrollOffset = useRef(0);
  const [showHeader, setShowHeader] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (imageHeight - headerHeight < currentOffset && showHeader === false) {
      setShowHeader(true);
    } else if (
      imageHeight - headerHeight > currentOffset &&
      showHeader === true
    ) {
      setShowHeader(false);
    }
    scrollOffset.current = currentOffset;
  };
  // StatusBar.setBarStyle('light-content', true);

  const getDate = (publishedAt: string) => {
    const publishDate = new Date(publishedAt);
    const year = publishDate.getFullYear();
    const month = publishDate.getMonth() + 1;
    const day = publishDate.getDate();
    return `發布日期  ${year} 年 ${month} 月 ${day} 日`;
  };

  return (
    <View style={Styles.safeArea}>
      {/* <FocusAwareStatusBar
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle={showHeader ? 'dark-content' : 'light-content'}
        hidden={false}
        translucent={true}
      /> */}
      <View
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}
        style={[
          Styles.stickyHeader,
          { opacity: showHeader ? 1 : 0, zIndex: showHeader ? 100 : -1 },
        ]}
      >
        <Text
          style={[
            Styles.stickyHeaderTitle,
            { marginTop: statusBarHeight! + 24 },
          ]}
        >
          文章
        </Text>
        <View style={Styles.stickyHeaderFlex}>
          <TouchableOpacity onPress={handleArticleDetailGoBack}>
            <Image source={ImageProvider.Article.ArticleGoBackIcon} />
          </TouchableOpacity>

          <ShareButton
            share_url={articleData.onlineStoreUrl}
            type="article"
            shareIcon={ImageProvider.Article.ArticleDetailShareIcon}
          />
        </View>
      </View>

      <ScrollView onScroll={handleScroll} scrollEventThrottle={100}>
        {articleData.image.url !== '' && (
          <Image
            onLayout={event => {
              const { height } = event.nativeEvent.layout;
              setImageHeight(height);
            }}
            source={{ uri: articleData.image.url }}
            resizeMode="contain"
            style={Styles.image}
          />
        )}
        <View style={Styles.headerButtonContainer}>
          <TouchableOpacity onPress={handleArticleDetailGoBack}>
            <Image source={ImageProvider.Article.ArticleDetailGoBackIcon} />
          </TouchableOpacity>
          <ShareButton
            share_url={articleData.onlineStoreUrl}
            type="article"
            shareIcon={ImageProvider.Article.ArticleShareIcon}
          />
        </View>
        <View style={Styles.contentContainer}>
          <View style={Styles.textContainer}>
            <Text style={Styles.text1Style}>{articleData.tags.join(' ')}</Text>
            <Text style={Styles.text2Style}>
              {getDate(articleData.publishedAt)}
            </Text>
          </View>
          <Text style={Styles.titleText}>{articleData.title}</Text>
          <Text style={Styles.subTtitleText}>{articleData.excerpt}</Text>
          {contentHtml.html !== '' && (
            <RenderHtml contentWidth={width - 32} source={contentHtml} />
          )}
          <View style={Styles.separator} />
          <Text style={Styles.titleText}>繼續閱讀</Text>
          {readMoreArticles.length !== 0 ? (
            readMoreArticles.map((article, index) => (
              <View key={index} style={Styles.articleCardContainer}>
                <ArticleCard articleData={article} />
              </View>
            ))
          ) : (
            <View style={Styles.articleCardContainer}></View>
          )}
        </View>
      </ScrollView>
      {/* {showHeader && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 50,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: headerOpacity,
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Header</Text>
        </Animated.View>
      )} */}
    </View>
  );
}
