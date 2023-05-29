import React, { useState, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import { RootStackParamList } from 'types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import Map, { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import ImageProvider from 'assets';
import Geolocation from '@react-native-community/geolocation';
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

  const [isShowLayOutForMap, setIsShowLayOutForMap] = useState(false);

  const mapRef = useRef<Map>(null);

  const handleBtnClick = () => {
    console.log('click');
  };

  const requestCameraPermission = async () => {
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
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            mapRef.current?.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          },
          error => {
            console.log(error);
            setIsShowLayOutForMap(true);
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

  const handleMarkerPress = (marker: any) => {
    console.log('點擊的標記 ID:', marker.id);
    mapRef.current?.animateToRegion({
      latitude: marker.latitude + 0.0035,
      longitude: marker.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const markers = [
    { id: 1, latitude: 24.979929, longitude: 121.533897 },
    { id: 2, latitude: 24.976929, longitude: 121.536897 },
    { id: 3, latitude: 24.972929, longitude: 121.542897 },
    { id: 4, latitude: 24.969929, longitude: 121.545897 },
    { id: 5, latitude: 24.966929, longitude: 121.548897 },
  ];

  const renderMarkers = () => {
    return markers.map(marker => (
      <Marker
        key={marker.id}
        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
        onPress={() => handleMarkerPress(marker)}
      >
        <Image
          source={ImageProvider.WishMap.MapMarkIcon}
          style={{ tintColor: '#FF0000' }}
        />
      </Marker>
    ));
  };

  return (
    <View style={Styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={Styles.map}
        initialRegion={region}
        loadingEnabled
        showsUserLocation={true}
        showsMyLocationButton={false}
        toolbarEnabled={false}
      >
        {renderMarkers()}
      </MapView>
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
          <TouchableOpacity style={Styles.applyButton} onPress={handleBtnClick}>
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
          onPress={requestCameraPermission}
        >
          <Image
            source={ImageProvider.WishMap.UserCurrentLocationIcon}
            style={Styles.userCurrentLocationImage}
          />
        </Pressable>
      </View>
    </View>
  );
}
