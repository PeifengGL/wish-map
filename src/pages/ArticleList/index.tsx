import React, { useState, useEffect, useRef } from 'react';
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
import CapsuleButton from 'components/CapsuleButton';
import ArticleCard from 'components/ArticleCard';
import Styles from './index.style';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import { getArticles, getTagsByTab } from 'api/ArticleList';
import { ArticleCardData } from 'types/articleList';

export default function ArticleListPage() {
  const [activeTab, setActiveTab] = useState<'message' | 'journey'>('message');
  const [activeArticleClass, setActiveArticleClass] = useState({
    message: '所有貼文',
    journey: '所有貼文',
  });
  const [animationValue] = useState(new Animated.Value(0));
  const windowsWidth = Dimensions.get('window').width;
  const windowsHeight = Dimensions.get('window').height;
  const renderArticleClass = () => {
    const tags = getTagsByTab(activeTab)!;
    return tags.map((tag, index) => {
      return (
        <View style={Styles.capsuleButtonContainer} key={index}>
          <CapsuleButton
            showText={tag.name}
            returnText={tag.name}
            isSelected={tag.name === activeArticleClass[activeTab]}
            capsuleContainerStyle={{
              backgroundColor:
                tag.name === activeArticleClass[activeTab]
                  ? '#FFB549'
                  : '#FFFFFF',
              borderColor: '#FFB549',
            }}
            handleCapsuleButtonPress={() => handleCapsuleButtonPress(tag.name)}
          />
        </View>
      );
    });
  };

  const tabIndicatorPosition = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowsWidth / 2],
  });

  const handleTabClick = (tabName: 'message' | 'journey') => {
    if (tabName !== activeTab) {
      setActiveTab(tabName);
      Animated.timing(animationValue, {
        toValue: tabName === 'message' ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const [articleList, setArticleList] = useState<ArticleCardData[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string>('');
  const [isDataEnd, setIsDataEnd] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);
  const classScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    getArticles('', endCursor, activeTab).then(data => {
      setArticleList(data.nodes);
      if (data.pageInfo.hasNextPage) {
        setEndCursor(data.pageInfo.endCursor);
      } else {
        setEndCursor('');
        setIsDataEnd(true);
      }
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setIsDataEnd(false);
    const tag = activeArticleClass[activeTab];
    getArticles(tag, '', activeTab).then(data => {
      setArticleList(data.nodes);
      if (data.pageInfo.hasNextPage) {
        setEndCursor(data.pageInfo.endCursor);
      } else {
        setEndCursor('');
        setIsDataEnd(true);
      }
    });
  }, [activeTab, activeArticleClass]);

  useEffect(() => {
    classScrollRef.current?.scrollTo({
      x: 0,
      animated: true,
    });
  }, [activeTab]);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    if (isDataEnd) {
      setIsFetching(false);
      return;
    }
    const tag = activeArticleClass[activeTab];
    getArticles(tag, endCursor, activeTab)
      .then(data => {
        setArticleList([...articleList, ...data.nodes]);
        if (data.pageInfo.hasNextPage) {
          setEndCursor(data.pageInfo.endCursor);
        } else {
          setEndCursor('');
          setIsDataEnd(true);
        }
      })
      .catch(err => {
        console.log(err);
        setEndCursor('');
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [isFetching]);

  const handleScroll = (event: any) => {
    if (isFetching || isDataEnd) {
      return;
    }
    const { layoutMeasurement, contentSize, contentOffset } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
    if (isCloseToBottom) {
      setIsFetching(true);
    }
  };

  const handleCapsuleButtonPress = (text: string) => {
    if (text === activeArticleClass[activeTab]) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      return;
    }
    if (activeTab === 'message') {
      setActiveArticleClass({
        ...activeArticleClass,
        message: text,
      });
    } else if (activeTab === 'journey') {
      setActiveArticleClass({
        ...activeArticleClass,
        journey: text,
      });
    }
  };

  const handleContentSizeChange = (height: number, width: number) => {
    if (width <= windowsHeight && !isDataEnd) {
      setIsFetching(true);
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
          ref={classScrollRef}
        >
          {renderArticleClass()}
        </ScrollView>
      </View>
      <ScrollView
        onScroll={handleScroll}
        style={Styles.contentScrollView}
        ref={scrollRef}
        onContentSizeChange={handleContentSizeChange}
      >
        {articleList.map((article: ArticleCardData, index: number) => (
          <View key={index} style={Styles.articleCardContainer}>
            <ArticleCard articleData={article} />
          </View>
        ))}
        {isFetching && (
          <View style={{ marginBottom: 10 }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
