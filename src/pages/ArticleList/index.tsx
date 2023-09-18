import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { ArticlesData, ArticleClass } from 'shared/articles.data';
import CapsuleButton from 'components/CapsuleButton';
import ArticleCard from 'components/ArticleCard';
import Styles from './index.style';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import { getArticles } from 'api/ArticleList';

export default function ArticleListPage() {
  const [activeTab, setActiveTab] = useState('message');
  const [activeArticleClass, setActiveArticleClass] = useState({
    message: '所有貼文',
    journey: '所有貼文',
  });
  const [animationValue] = useState(new Animated.Value(0));
  const windowsWidth = Dimensions.get('window').width;
  const [messageList, setMessageList] = useState(
    ArticlesData.filter(article => article.group === 'message'),
  );
  const [journeyList, setJourneyList] = useState(
    ArticlesData.filter(article => article.group === 'journey'),
  );

  const handleCapsuleButtonPress = (text: string) => {
    if (activeTab === 'message') {
      setActiveArticleClass({
        ...activeArticleClass,
        message: text,
      });
      text === '所有貼文'
        ? setMessageList(
            ArticlesData.filter(article => article.group === 'message'),
          )
        : setMessageList(
            ArticlesData.filter(
              article =>
                article.group === 'message' &&
                ArticleClass.message[article.type] === text,
            ),
          );
    } else if (activeTab === 'journey') {
      setActiveArticleClass({
        ...activeArticleClass,
        journey: text,
      });
      text === '所有貼文'
        ? setJourneyList(
            ArticlesData.filter(article => article.group === 'journey'),
          )
        : setJourneyList(
            ArticlesData.filter(
              article =>
                article.group === 'journey' &&
                ArticleClass.journey[article.type] === text,
            ),
          );
    }
  };

  const renderArticleClass = () => {
    if (activeTab === 'message') {
      const messageClassList = Object.values(ArticleClass.message);
      return messageClassList.map((messageClass, index) => {
        return (
          <View style={Styles.capsuleButtonContainer} key={index}>
            <CapsuleButton
              showText={messageClass}
              returnText={messageClass}
              isSelected={messageClass === activeArticleClass.message}
              capsuleContainerStyle={{
                backgroundColor:
                  messageClass === activeArticleClass.message
                    ? '#FFB549'
                    : '#FFFFFF',
                borderColor: '#FFB549',
              }}
              handleCapsuleButtonPress={() =>
                handleCapsuleButtonPress(messageClass)
              }
            />
          </View>
        );
      });
    } else if (activeTab === 'journey') {
      const journeyClassList = Object.values(ArticleClass.journey);
      return journeyClassList.map((journeyClass, index) => {
        return (
          <View style={Styles.capsuleButtonContainer} key={index}>
            <CapsuleButton
              showText={journeyClass}
              returnText={journeyClass}
              isSelected={journeyClass === activeArticleClass.journey}
              capsuleContainerStyle={{
                backgroundColor:
                  journeyClass === activeArticleClass.journey
                    ? '#FFB549'
                    : '#FFFFFF',
                borderColor: '#FFB549',
              }}
              handleCapsuleButtonPress={() =>
                handleCapsuleButtonPress(journeyClass)
              }
            />
          </View>
        );
      });
    }
  };

  const tabIndicatorPosition = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowsWidth / 2],
  });

  const handleTabClick = (tabName: any) => {
    if (tabName !== activeTab) {
      setActiveTab(tabName);
      Animated.timing(animationValue, {
        toValue: tabName === 'message' ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const [articleList, setArticleList] = useState([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    getArticles().then(data => {
      // console.log('pages140', data);
      setArticleList(data);
    });
  }, []);

  const handleScroll = (event: any) => {
    if (isFetching) {
      return;
    }
    const { layoutMeasurement, contentSize, contentOffset } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
    if (isCloseToBottom) {
      console.log('call next api');
      setIsFetching(true);
      setTimeout(() => {
        setIsFetching(false);
      }, 5000);
    }
  };

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <FocusAwareStatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Text style={Styles.headerText}>喜願文章</Text>
      <View style={Styles.tabBar}>
        <TouchableOpacity
          style={[Styles.tabItem]}
          onPress={() => handleTabClick('message')}
        >
          <Text
            style={[
              Styles.tabText,
              activeTab === 'message' && Styles.activeTabText,
            ]}
          >
            訊息快遞
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.tabItem]}
          onPress={() => handleTabClick('journey')}
        >
          <Text
            style={[
              Styles.tabText,
              activeTab === 'journey' && Styles.activeTabText,
            ]}
          >
            願望旅程
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            Styles.tabIndicator,
            { width: windowsWidth / 2 },
            { transform: [{ translateX: tabIndicatorPosition }] },
          ]}
        />
      </View>
      <View>
        <ScrollView
          horizontal
          style={Styles.classScrollView}
          showsHorizontalScrollIndicator={false}
        >
          {renderArticleClass()}
        </ScrollView>
      </View>
      <ScrollView onScroll={handleScroll} style={Styles.contentScrollView}>
        {articleList.map((article, index) => (
          <View key={index} style={Styles.articleCardContainer}>
            <ArticleCard articleData={article} />
          </View>
        ))}
        {/* {activeTab === 'message'
          ? messageList.map((message, index) => {
              return (
                <View key={index} style={Styles.articleCardContainer}>
                  <ArticleCard articleData={message} />
                </View>
              );
            })
          : journeyList.map((journey, index) => {
              return (
                <View key={index} style={Styles.articleCardContainer}>
                  <ArticleCard key={index} articleData={journey} />
                </View>
              );
            })} */}
        {isFetching && (
          <View style={{ marginBottom: 10 }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
