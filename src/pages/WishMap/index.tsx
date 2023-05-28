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
import MapView, { Marker } from 'react-native-maps';
import ImageProvider from 'assets';
import Geolocation from '@react-native-community/geolocation';
import Styles from './index.style';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'WishMap'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'WishMap'>;
};

export default function WishMapPage({ navigation }: PageRouterProps) {
  const [region, setRegion] = useState({
    latitude: 24.1514,
    longitude: 120.664,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

  const [isShowLayOutForMap, setIsShowLayOutForMap] = useState(false);

  const mapRef = useRef<MapView>(null);

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
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
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

  return (
    <View style={Styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={Styles.map}
        region={region}
        loadingEnabled
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={{
            latitude: 24.1513049,
            longitude: 120.6640025,
          }}
        >
          <Image
            source={ImageProvider.WishMap.MapMarkIcon}
            style={{ tintColor: '#FF0000' }}
          />
        </Marker>
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
