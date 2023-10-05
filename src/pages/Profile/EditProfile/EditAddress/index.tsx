import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ProfileStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';
import Styles from './index.style';
import {
  createCustomerAddress,
  getCustomerDefaultAddress,
  updateCustomerAddress,
} from 'api/Login';

type PageRouterProps = {
  route: RouteProp<ProfileStackParamList, 'EditAddress'>;
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'EditAddress'>;
};

export default function EditAddressPage({ navigation }: PageRouterProps) {
  const [userZip, setUserZip] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');

  useEffect(() => {
    LocalStorage.getData(LocalStorageKeys.CustomerAccessTokenKey).then(
      token => {
        if (token && typeof token === 'string') {
          getCustomerDefaultAddress(token).then(data => {
            if (data && data.id) {
              setUserAddress(data?.address1);
              setUserZip(data?.zip);
              setUserCity(data?.city);
            }
          });
        }
      },
    );
  }, []);

  const renderEditUserAddressGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const saveEditUserAddress = () => {
    if (userAddress !== '' && userZip !== '' && userCity !== '') {
      LocalStorage.getData(LocalStorageKeys.CustomerAccessTokenKey).then(
        token => {
          if (token && typeof token === 'string') {
            getCustomerDefaultAddress(token).then(data => {
              const address = {
                address1: userAddress,
                city: userCity,
                zip: userZip,
              };
              if (data && data.id) {
                updateCustomerAddress(token, data.id, address).then(data => {
                  console.log('updateAddress!, ', data);
                  navigation.goBack();
                });
              } else {
                createCustomerAddress(token, address).then(data => {
                  console.log('createAddress!, ', data);
                  navigation.goBack();
                });
              }
            });
          }
        },
      );
    }
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="#EBF1F9"
        barStyle="dark-content"
        translucent={false}
      />

      <View style={Styles.headerContainer}>
        <View style={Styles.headerFlex}>
          {renderEditUserAddressGoBack()}
          <TouchableOpacity onPress={saveEditUserAddress}>
            <Text style={Styles.saveButtonText}>儲存</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.editUserAddressContainer}>
        <Text style={Styles.editUserAddressTitle}>使用者聯絡地址</Text>
        <Text style={Styles.editUserAddressDescription}>
          Wish Map 會使用以下使用者聯絡地址在您填寫捐款人資料時，自動填入表格內
        </Text>
        <View style={Styles.separator} />

        <View style={Styles.editUserZipAndCityInputContainer}>
          <Text style={Styles.inputLabel}>郵遞區號／城市</Text>
          <TextInput
            placeholder="郵遞區號"
            value={userZip}
            onChangeText={setUserZip}
            style={Styles.editUserZipInput}
          />
          <TextInput
            placeholder="請輸入居住城市"
            value={userCity}
            onChangeText={setUserCity}
            style={Styles.editUserCityInput}
          />
        </View>
        <View style={Styles.editUserAddressInputContainer}>
          <TextInput
            placeholder="請輸入聯絡地址"
            value={userAddress}
            onChangeText={setUserAddress}
            style={Styles.editUserAddressInput}
          />
          {userAddress !== '' && (
            <TouchableOpacity onPress={() => setUserAddress('')}>
              <Image
                source={ImageProvider.Profile.EditProfileTextInputCleanIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
