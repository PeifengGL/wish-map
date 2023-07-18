import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { RootStackParamList } from 'types/router';
import ShareButton from 'components/ShareButton';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import { ArticleClass, ArticlesData } from 'shared/articles.data';
import ImageProvider from 'assets';
import ArticleCard from 'components/ArticleCard';
import Styles from './index.style';
import { useState, useRef } from 'react';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'ArticleDetail'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'ArticleDetail'>;
};

export default function ArticleDetailPage({
  route,
  navigation,
}: PageRouterProps) {
  const { articleData } = route.params;
  const statusBarHeight = StatusBar.currentHeight;

  const readData = ArticlesData.filter(
    article => article.group === articleData?.group,
  );

  const handleArticleDetailGoBack = () => {
    navigation.goBack();
  };

  const dataGroup = articleData?.group!;

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

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle={showHeader ? 'dark-content' : 'light-content'}
        hidden={false}
        translucent={true}
      />
      <View
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#EBF1F9',
          position: 'absolute',
          top: 0,
          width: '100%',
          opacity: showHeader ? 1 : 0,
          zIndex: showHeader ? 100 : -1,
        }}
      >
        <Text style={{ marginBottom: 24, marginTop: statusBarHeight! + 24 }}>
          文章
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            position: 'absolute',
            top: statusBarHeight! + 10,
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity onPress={handleArticleDetailGoBack}>
            <Image source={ImageProvider.Article.ArticleGoBackIcon} />
          </TouchableOpacity>

          <ShareButton
            share_url={articleData?.article_url!}
            type="article"
            shareIcon={ImageProvider.Article.ArticleShareIcon}
          />
        </View>
      </View>

      <ScrollView onScroll={handleScroll}>
        <Image
          onLayout={event => {
            const { height } = event.nativeEvent.layout;
            setImageHeight(height);
          }}
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
    </SafeAreaView>
  );
}
