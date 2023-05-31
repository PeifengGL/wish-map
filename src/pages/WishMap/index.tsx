import React, { useState, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import { RootStackParamList } from 'types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import Map, { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import ImageProvider from 'assets';
import Geolocation from '@react-native-community/geolocation';
import { Modalize } from 'react-native-modalize';
import { ProjectsData, ProjectsDataType } from 'shared/project.data';
import ProgressBar from 'components/ProgressBar';
import FilterToolComponent from './FilterTool';
import Styles from './index.style';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'WishMap'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'WishMap'>;
};

export default function WishMapPage({ navigation }: PageRouterProps) {
  const [region, setRegion] = useState({
    latitude: 24.9761,
    longitude: 121.5356,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const dimensionsHeight = Dimensions.get('window').height;

  const [popupModalData, setPopupModalData] = useState<ProjectsDataType>();

  const [isMapLoadingComplete, setIsMapLoadingComplete] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(-1);
  const mapRef = useRef<Map>(null);

  const modalizeRef = useRef<Modalize>(null);

  const handleBtnClick = () => {
    console.log('click');
  };

  const requestUserLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleMarkerPress = (project: any) => {
    console.log('點擊的標記 ID:', project.id);
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
    return ProjectsData.map(project => (
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
          style={{ zIndex: 100000 }}
        />
      </Marker>
    ));
  };

  const handleRegionChangeComplete = () => {
    console.log('done');
  };

  const handleMapLoadingComplete = () => {
    setIsMapLoadingComplete(true);
    console.log('done');
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMarkerId(-1);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const progress = 0.8;

  const handleProgressCalc = (received: number, total: number) => {
    console.log((received / total) * 100);
    return (received / total) * 100;
  };

  const handleFilterToolClick = () => {
    modalizeRef.current?.open();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={Styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={Styles.map}
          initialRegion={region}
          loadingEnabled
          showsUserLocation={true}
          showsMyLocationButton={false}
          toolbarEnabled={false}
          onRegionChangeComplete={handleRegionChangeComplete}
          onMapLoaded={handleMapLoadingComplete}
        >
          {renderMarkers()}
        </MapView>
        {isMapLoadingComplete ? (
          <>
            <View style={Styles.filterProjectContainer}>
              <TouchableOpacity onPress={handleFilterToolClick}>
                <View style={Styles.filterProjectButton}>
                  <Image
                    source={ImageProvider.WishMap.FilterIcon}
                    style={Styles.filterProjectIcon}
                  />
                  <Text style={Styles.filterProjectText}>篩選</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[Styles.mapButtonBlock, { display: undefined }]}>
              <View style={Styles.donateButtonContainer}>
                <TouchableOpacity
                  style={Styles.donateButton}
                  onPress={handleBtnClick}
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
                  onPress={handleBtnClick}
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
              <TouchableOpacity
                onPress={handleBtnClick}
                style={Styles.popupModalClickBlock}
                activeOpacity={1}
              >
                <View style={Styles.popupModalImageContainer}>
                  <Image
                    source={popupModalData?.cover_image}
                    style={Styles.popupModalImage}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleBtnClick}
                style={Styles.popupModalClickBlock}
                activeOpacity={1}
              >
                <View style={Styles.popupModalDonateInfoContainer}>
                  <Text style={Styles.popupModalDonateInfoText}>
                    目前 ${popupModalData?.donation_received} / 目標 $
                    {popupModalData?.total_donation}
                  </Text>
                  <Text style={Styles.popupModalDonateInfoText}>
                    {popupModalData?.donation_received &&
                    popupModalData?.total_donation
                      ? `${handleProgressCalc(
                          popupModalData.donation_received,
                          popupModalData.total_donation,
                        )}%`
                      : '0%'}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleBtnClick}
                style={Styles.popupModalClickBlock}
                activeOpacity={1}
              >
                <View style={Styles.popupModalProgressBarMainContainer}>
                  <ProgressBar progress={progress} progressColor="#0057B8" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleBtnClick}
                style={Styles.popupModalClickBlock}
                activeOpacity={1}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                    marginTop: 12,
                  }}
                >
                  <Text>{popupModalData?.title}</Text>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Image source={ImageProvider.WishMap.PopupLocationIcon} />
                    <Text>{`${popupModalData?.city_country} ${popupModalData?.district}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <Text
                onPress={handleBtnClick}
                numberOfLines={2}
                ellipsizeMode="tail"
                style={Styles.popupModalDescription}
              >
                {popupModalData?.description}
              </Text>
              <TouchableOpacity style={Styles.popupModalDonateButton}>
                <Text style={Styles.popupModalDonateButtonText}>立即捐款</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <Modalize
        ref={modalizeRef}
        disableScrollIfPossible={false}
        modalHeight={dimensionsHeight * 0.9}
        avoidKeyboardLikeIOS={true}
      >
        <FilterToolComponent projects_data={ProjectsData} />
      </Modalize>
    </View>
  );
}
