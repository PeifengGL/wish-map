import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Animated,
  LayoutAnimation,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import DataShareService from 'service';
import { FilterMethodType } from 'types/wishMap';
import { ProjectsData, ProjectsDataType } from 'shared/project.data';
import FilterToolButton from 'components/FilterToolButton';
import { Modalize } from 'react-native-modalize';
import { Subscription } from 'rxjs';
import ImageProvider from 'assets';
import { Portal } from 'react-native-portalize';
import FilterToolComponent from '../FilterTool';
import CapsuleButton from 'components/CapsuleButton';
import ProjectCard from 'components/ProjectCard';
import Styles from './index.style';
import FilterProjectTool from 'util/FilterTool';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'FilterResult'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'FilterResult'>;
};

export default function FilterResultPage({ navigation }: PageRouterProps) {
  const dimensionsHeight = Dimensions.get('window').height;
  const [filterMethod, setFilterMethod] = useState<FilterMethodType>({
    filterKeywordMethod: '',
    filterAgeMethod: [],
    filterCityMethod: [],
  });
  const [filteredResult, setFilteredResult] = useState<ProjectsDataType[]>([]);
  const [isEnableFilterButton, setIsEnableFilterButton] = useState(false);
  const [isFilterButtonSelected, setIsFilterButtonSelected] = useState(false);

  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    const filterMethodSub: Subscription =
      DataShareService.getFilterMethod$().subscribe(filterMethod => {
        setFilterMethod(filterMethod);
      });
    const filteredDataSub: Subscription =
      DataShareService.getFilteredResult$().subscribe(filteredResult => {
        setFilteredResult(filteredResult);
      });

    return () => {
      filterMethodSub.unsubscribe();
      filteredDataSub.unsubscribe();
    };
  }, [filterMethod, filteredResult]);

  const getFilterMethodIsEmpty = (methodEmpty: boolean) => {
    setIsEnableFilterButton(methodEmpty);
  };

  const handleFilterToolClose = () => {
    DataShareService.setFilterMethod(filterMethod);
    DataShareService.setFilteredResult(
      FilterProjectTool(ProjectsData, filterMethod),
    );
    setIsFilterButtonSelected(false);
    modalizeRef.current?.close();
  };

  const handleFilterToolClick = () => {
    setIsFilterButtonSelected(true);
    modalizeRef.current?.open();
  };

  const handleFilterButtonPress = () => {
    const filteredDataResult: ProjectsDataType[] = FilterProjectTool(
      ProjectsData,
      filterMethod,
    );
    modalizeRef.current?.close();
    navigation.navigate('FilterResult', {});
    DataShareService.setFilteredResult(filteredDataResult);
  };

  const handleKeywordCapsulePress = () => {
    const tempFilterMethod = {
      ...filterMethod,
      filterKeywordMethod: '',
    };
    DataShareService.setFilterMethod(tempFilterMethod);
    DataShareService.setFilteredResult(
      FilterProjectTool(ProjectsData, tempFilterMethod),
    );
  };

  const handleAgeCapsulePress = (age: number) => {
    const tempFilterMethod = {
      ...filterMethod,
      filterAgeMethod: filterMethod.filterAgeMethod.filter(
        filterAge => filterAge !== age,
      ),
    };
    DataShareService.setFilterMethod(tempFilterMethod);
    DataShareService.setFilteredResult(
      FilterProjectTool(ProjectsData, tempFilterMethod),
    );
  };

  const handleCityCapsulePress = (city: string) => {
    const tempFilterMethod = {
      ...filterMethod,
      filterCityMethod: filterMethod.filterCityMethod.filter(
        filterCity => filterCity !== city,
      ),
    };
    DataShareService.setFilterMethod(tempFilterMethod);
    DataShareService.setFilteredResult(
      FilterProjectTool(ProjectsData, tempFilterMethod),
    );
  };

  const renderFilterCapsule = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        key="scrollBar"
        style={Styles.capsuleButtonScrollView}
      >
        {filterMethod.filterKeywordMethod !== '' ? (
          <View style={Styles.capsuleButtonContainer} key={'keyword'}>
            <CapsuleButton
              showText={filterMethod.filterKeywordMethod}
              returnText={'keyword'}
              isSelected
              showCancelIcon
              capsuleEnabled={false}
              handleCancelIconPress={handleKeywordCapsulePress}
            />
          </View>
        ) : null}

        {filterMethod.filterAgeMethod.length > 0
          ? filterMethod.filterAgeMethod.map((age, index) => (
              <View
                style={Styles.capsuleButtonContainer}
                key={`${age}${index}`}
              >
                <CapsuleButton
                  key={index}
                  showText={age}
                  returnText={age}
                  isSelected
                  showCancelIcon
                  capsuleEnabled={false}
                  handleCancelIconPress={() => handleAgeCapsulePress(age)}
                />
              </View>
            ))
          : null}

        {filterMethod.filterCityMethod.length > 0
          ? filterMethod.filterCityMethod.map((city, index) => (
              <View
                style={Styles.capsuleButtonContainer}
                key={`${city}${index}`}
              >
                <CapsuleButton
                  key={index}
                  showText={city.split(',')[1]}
                  returnText={city}
                  isSelected
                  showCancelIcon
                  capsuleEnabled={false}
                  handleCancelIconPress={() => handleCityCapsulePress(city)}
                />
              </View>
            ))
          : null}
      </ScrollView>
    );
  };

  const [shouldShow, setShouldShow] = useState(true);
  const scrollOffset = useRef(0);
  const animation = useRef(new Animated.Value(1)).current;

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    let newShouldShow = shouldShow;
    if (currentOffset > 30) {
      if (currentOffset > scrollOffset.current || currentOffset === 0) {
        newShouldShow = false;
      } else {
        newShouldShow = true;
      }

      if (
        newShouldShow !== shouldShow &&
        (!newShouldShow || currentOffset > 30)
      ) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        scrollOffset.current = currentOffset;
        setShouldShow(newShouldShow);
      }
    }

    scrollOffset.current = currentOffset;
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: shouldShow ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [shouldShow, animation]);

  const renderModalizeFooter = () => {
    return (
      <Animated.View
        style={[Styles.modalizeFooterContainer, { opacity: animation }]}
      >
        <TouchableOpacity
          style={[
            Styles.modalizeFooterButton,
            {
              backgroundColor: isEnableFilterButton ? '#0057B8' : '#BDBDBD',
            },
          ]}
          activeOpacity={0.9}
          disabled={!isEnableFilterButton}
          onPress={handleFilterButtonPress}
        >
          <Text style={Styles.modalizeFooterButtonText}>顯示結果</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <FocusAwareStatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
      />
      <View style={Styles.headerBlock}>
        <View style={Styles.headerBlockShadow}>
          <View style={Styles.headerButtonContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WishMap', {
                  childPage: 'FilterResultPage',
                })
              }
            >
              <Image source={ImageProvider.FilterResult.GoBackIcon} />
            </TouchableOpacity>
            <View>
              <FilterToolButton
                handleFilterToolClick={handleFilterToolClick}
                isSelected={isFilterButtonSelected}
              />
            </View>
          </View>
          <View style={Styles.separator} />
          {renderFilterCapsule()}
        </View>
      </View>
      <ScrollView>
        {filteredResult.length > 0 ? (
          <>
            <Text style={Styles.filterResultTitle}>篩選結果</Text>
            {filteredResult.map((projectData, index) => (
              <View style={Styles.projectCardContainer} key={index}>
                <ProjectCard
                  projectData={projectData}
                  descriptionLineLimit={4}
                />
              </View>
            ))}
          </>
        ) : (
          <Text style={Styles.noResultContainer}>沒有符合條件的專案</Text>
        )}
      </ScrollView>

      <Portal>
        <Modalize
          ref={modalizeRef}
          disableScrollIfPossible={false}
          modalHeight={dimensionsHeight}
          FooterComponent={renderModalizeFooter()}
          onOverlayPress={handleFilterToolClose}
          onClosed={() => setIsFilterButtonSelected(false)}
          scrollViewProps={{ onScroll: handleScroll }}
          onOpen={() => setShouldShow(true)}
        >
          <View>
            <FilterToolComponent
              projects_data={ProjectsData}
              getMethodEmpty={getFilterMethodIsEmpty}
              closeFilterTool={handleFilterToolClose}
            />
          </View>
        </Modalize>
      </Portal>
    </SafeAreaView>
  );
}
