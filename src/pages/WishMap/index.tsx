import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Dimensions,
  Animated,
  LayoutAnimation,
  StatusBar,
  Platform,
} from 'react-native';
import { Portal } from 'react-native-portalize';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import Map, { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import Geolocation from '@react-native-community/geolocation';
import { Modalize } from 'react-native-modalize';
import { Subscription } from 'rxjs';
import {
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

import { FilterMethodType } from 'types/wishMap';
import { RootStackParamList } from 'types/router';

import DataShareService from 'service';
import FilterProjectTool from 'util/FilterTool';
import FocusAwareStatusBar from 'util/StatusBarAdapter';

import { ProjectsData, ProjectsDataType, WishData } from 'shared/project.data';
import FilterToolComponent from './FilterTool';
import FilterToolButton from 'components/FilterToolButton';
import ProjectCard from 'components/ProjectCard';
import ImageProvider from 'assets';
import Styles from './index.style';
import { getProducts } from 'api/WishMap';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'WishMap'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'WishMap'>;
};

export async function getLocationPermissions() {
  let permission: Permission | undefined;

  if (Platform.OS === 'android') {
    permission = PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
  } else if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  }

  if (!permission) {
    return false; // Handle the case where the platform is neither Android nor iOS
  }

  const granted = await request(permission, {
    title: 'WishMap',
    message: 'WishMap would like access to your location ',
  });

  return granted === RESULTS.GRANTED;
}

export default function WishMapPage({ route, navigation }: PageRouterProps) {
  const dimensionsHeight = Dimensions.get('window').height;

  const region = {
    latitude: 25.036043,
    longitude: 121.544322,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09,
  };
  const [popupModalData, setPopupModalData] = useState<ProjectsDataType>();
  const [isMapLoadingComplete, setIsMapLoadingComplete] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(-1);
  const [isEnableFilterResultButton, setIsEnableFilterResultButton] =
    useState(false);
  const [isFilterButtonSelected, setIsFilterButtonSelected] = useState(false);

  const mapRef = useRef<Map>(null);
  const modalizeRef = useRef<Modalize>(null);
  const statusBar = StatusBar.currentHeight;
  const sendWishApplyModalRef = useRef<Modalize>(null);

  const [projectsData, setProjectsData] =
    useState<ProjectsDataType[]>(ProjectsData);

  const handleWishApplyClick = () => {
    navigation.navigate('WishApply', {});
  };

  const handleDonateWishClick = () => {
    navigation.navigate('ProjectDetail', {
      wishData: WishData,
      originEntry: 'wishMap',
    });
  };

  const requestUserLocationPermission = async () => {
    console.log('requestUserLocationPermission');
    let permission: Permission | undefined;

    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }

    if (!permission) {
      return false; // Handle the case where the platform is neither Android nor iOS
    }

    const granted = await request(permission, {
      title: 'WishMap',
      message: 'WishMap would like access to your location ',
    });

    setIsModalVisible(false);
    setSelectedMarkerId(-1);
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        });
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      },
    );

    return granted === RESULTS.GRANTED;
  };
  // const requestUserLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: '喜願Wish Map App',
  //         message:
  //           '喜願Wish Map App 需要取得您的定位權限' +
  //           '您可以在地圖上顯示您的位置',
  //         buttonNeutral: '稍後再試',
  //         buttonNegative: '取消',
  //         buttonPositive: '允許',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  // setIsModalVisible(false);
  // setSelectedMarkerId(-1);
  // Geolocation.getCurrentPosition(
  //   position => {
  //     const { latitude, longitude } = position.coords;
  //     mapRef.current?.animateToRegion({
  //       latitude,
  //       longitude,
  //       latitudeDelta: 0.03,
  //       longitudeDelta: 0.03,
  //     });
  //   },
  //   error => {
  //     console.log(error);
  //   },
  //   {
  //     enableHighAccuracy: true,
  //   },
  // );
  //     } else {
  //       console.log('Location permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const handleMarkerPress = (project: any) => {
    setSelectedMarkerId(project.id);
    setPopupModalData(project);
    mapRef.current?.animateToRegion(
      {
        latitude: project.latitude + 0.005,
        longitude: project.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500,
    );
    setTimeout(() => {
      setIsModalVisible(true);
    }, 250);
  };

  const renderMarkers = () => {
    return projectsData.map(project => (
      <Marker
        key={project.id}
        coordinate={{
          latitude: project.latitude,
          longitude: project.longitude,
        }}
        onPress={() => handleMarkerPress(project)}
      >
        <Image
          source={
            project.id === selectedMarkerId
              ? ImageProvider.WishMap.MapMarkSelectedIcon
              : ImageProvider.WishMap.MapMarkIcon
          }
        />
      </Marker>
    ));
  };

  const handleMapLoadingComplete = () => {
    console.log('Map Loading Complete');
    setIsMapLoadingComplete(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMarkerId(-1);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFilterToolClick = () => {
    setIsFilterButtonSelected(true);
    modalizeRef.current?.open();
  };

  const handleFilterToolClose = () => {
    setIsFilterButtonSelected(false);
    modalizeRef.current?.close();
  };

  const getFilterMethodIsEmpty = (methodEmpty: boolean) => {
    setIsEnableFilterResultButton(methodEmpty);
  };

  const [filterMethod, setFilterMethod] = useState<FilterMethodType>({
    filterKeywordMethod: '',
    filterAgeMethod: [],
    filterCityMethod: [],
  });

  useEffect(() => {
    getProducts().then(data => {
      if (data) {
        setProjectsData(data);
      }
    });
    const filterMethodSub: Subscription =
      DataShareService.getFilterMethod$().subscribe(
        (filterMethodData: FilterMethodType) => {
          setFilterMethod(filterMethodData);
        },
      );
    return () => {
      filterMethodSub.unsubscribe();
    };
  }, []);

  const handleFilterButtonPress = () => {
    DataShareService.setFilteredResult(
      FilterProjectTool(ProjectsData, filterMethod),
    );
    modalizeRef.current?.close();
    navigation.navigate('FilterResult', {});
  };

  const renderModalizeFooter = () => {
    return (
      <Animated.View
        style={[Styles.modalizeFooterContainer, { opacity: animation }]}
      >
        <TouchableOpacity
          style={[
            Styles.modalizeFooterButton,
            {
              backgroundColor: isEnableFilterResultButton
                ? '#0057B8'
                : '#BDBDBD',
            },
          ]}
          activeOpacity={0.9}
          disabled={!isEnableFilterResultButton}
          onPress={handleFilterButtonPress}
        >
          <Text style={Styles.modalizeFooterButtonText}>顯示結果</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  useEffect(() => {
    if (route.params?.childPage === 'FilterResultPage') {
      modalizeRef.current?.open();
      navigation.setParams({ childPage: 'WishMap' });
    }
  }, [route.params]);

  useEffect(() => {
    if (route.params?.originEntry === 'WishApply') {
      sendWishApplyModalRef.current?.open();
    }
  }, [route.params]);

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
  // fetch('https://sheetdb.io/api/v1/aepso07gors7a?sheet', {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  // });
  useEffect(() => {
    Animated.timing(animation, {
      toValue: shouldShow ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [shouldShow, animation]);

  return (
    <View style={Styles.mapPage}>
      <FocusAwareStatusBar
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />
      <View style={Styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={Styles.map}
          initialRegion={region}
          loadingEnabled
          showsUserLocation={true}
          showsMyLocationButton={false}
          toolbarEnabled={false}
          onMapLoaded={handleMapLoadingComplete}
          moveOnMarkerPress={false}
          rotateEnabled={false}
          loadingIndicatorColor="#0057B8"
          onMapReady={handleMapLoadingComplete}
          // followsUserLocation={true}
        >
          {renderMarkers()}
        </MapView>
        {isMapLoadingComplete ? (
          <>
            <View style={[Styles.filterProjectContainer, { top: statusBar }]}>
              <FilterToolButton
                handleFilterToolClick={handleFilterToolClick}
                isSelected={isFilterButtonSelected}
              />
            </View>
            <View style={[Styles.mapButtonBlock, { display: undefined }]}>
              <View style={Styles.donateButtonContainer}>
                <TouchableOpacity
                  style={Styles.donateButton}
                  onPress={handleDonateWishClick}
                >
                  <Image
                    source={ImageProvider.WishMap.DreamDonateButton}
                    style={Styles.donateButtonImage}
                  />
                  <Text style={Styles.donateButtonText}>贊助喜願</Text>
                </TouchableOpacity>
              </View>
              <View style={Styles.applyButtonContainer}>
                <TouchableOpacity
                  style={Styles.applyButton}
                  onPress={handleWishApplyClick}
                >
                  <Image
                    source={ImageProvider.WishMap.DreamApplyButton}
                    style={Styles.applyButtonImage}
                  />
                  <Text style={Styles.applyButtonText}>圓夢申請</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={Styles.userCurrentLocation}>
              <Pressable
                style={Styles.userCurrentLocationButton}
                onPress={requestUserLocationPermission}
              >
                <Image
                  source={ImageProvider.WishMap.UserCurrentLocationIcon}
                  style={Styles.userCurrentLocationImage}
                />
              </Pressable>
            </View>
          </>
        ) : null}
      </View>

      {isModalVisible ? (
        <View style={Styles.popupModal}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={Styles.closePopupModalButton}
            activeOpacity={1}
          >
            <View style={Styles.popupModalContainer}>
              {popupModalData && (
                <ProjectCard
                  projectData={popupModalData}
                  descriptionLineLimit={2}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <Portal>
        <Modalize
          ref={modalizeRef}
          disableScrollIfPossible={false}
          FooterComponent={renderModalizeFooter()}
          onOverlayPress={handleFilterToolClose}
          onClosed={() => setIsFilterButtonSelected(false)}
          scrollViewProps={{ onScroll: handleScroll }}
          withHandle={false}
          modalStyle={{
            minHeight: dimensionsHeight,
          }}
          onOpen={() => setShouldShow(true)}
        >
          <FilterToolComponent
            projects_data={ProjectsData}
            getMethodEmpty={getFilterMethodIsEmpty}
            closeFilterTool={handleFilterToolClose}
          />
        </Modalize>

        <Modalize ref={sendWishApplyModalRef} adjustToContentHeight>
          <View style={Styles.volunteerApplySuccessModalContainer}>
            <Text style={Styles.applySuccessModalContent1}>申請成功</Text>
            <Text style={Styles.applySuccessModalContent2}>
              {`每一位重症孩子都值得擁有希望幸福的每一天\n喜願與您一起讓願望一一實現！`}
            </Text>
            <Image
              source={ImageProvider.WishMap.WishApplyDoneImage}
              style={Styles.applySuccessModalContent3}
            />
            <Text style={Styles.applySuccessModalContent4}>
              預計審核時間一週內完成，本會將會盡快與您聯絡
            </Text>
            <View style={Styles.applySuccessModalButtonContainer}>
              <TouchableOpacity
                style={Styles.applySuccessModalButton}
                onPress={() => sendWishApplyModalRef.current?.close()}
              >
                <Text style={Styles.applySuccessModalButtonText}>知道了</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </Portal>
    </View>
  );
}
