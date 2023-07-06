import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { SettingStackParamList, ProfileStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import Styles from './index.style';
import ImageProvider from 'assets';

type PageRouterProps = {
  route: RouteProp<SettingStackParamList, 'Setting'>;
  navigation: NativeStackNavigationProp<SettingStackParamList, 'Setting'>;
};

export default function SettingPage({ navigation }: PageRouterProps) {
  const renderSettingGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Setting.SettingGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const handleChangePasswordClick = () => {
    navigation.navigate('ChangePassword', {});
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="#EBF1F9"
        barStyle="dark-content"
        translucent={false}
      />
      <ImageBackground
        source={ImageProvider.Setting.SettingBackgroundImage}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      >
        <View style={Styles.headerContainer}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 12,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {renderSettingGoBack()}
            <Text>設定</Text>
            <View />
          </View>
        </View>

        <ScrollView
          style={{ marginHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              fontFamily: 'Lato',
              color: '#1A1A1A',
              marginTop: 24,
              marginBottom: 16,
            }}
          >
            帳號
          </Text>
          <TouchableOpacity
            onPress={handleChangePasswordClick}
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              borderColor: '#0057B8',
              borderWidth: 1,
              borderRadius: 50,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 12,
              }}
            >
              <Image source={ImageProvider.Setting.ChangePassword} />
              <Text
                style={{
                  color: '#0057B8',
                  fontSize: 14,
                  fontWeight: '500',
                  fontFamily: 'Lato',
                  marginLeft: 6,
                }}
              >
                修改密碼
              </Text>
            </View>
            <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              borderColor: '#0057B8',
              borderWidth: 1,
              borderRadius: 50,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 12,
              }}
            >
              <Image source={ImageProvider.Setting.DeleteAccount} />
              <Text
                style={{
                  color: '#0057B8',
                  fontSize: 14,
                  fontWeight: '500',
                  fontFamily: 'Lato',
                  marginLeft: 6,
                }}
              >
                刪除帳號
              </Text>
            </View>
            <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
          </TouchableOpacity>

          <View
            style={{
              height: 2,
              backgroundColor: '#CCCCCC',
              width: '100%',
              marginVertical: 24,
            }}
          />

          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              fontFamily: 'Lato',
              color: '#1A1A1A',
              marginBottom: 16,
            }}
          >
            反饋
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              borderColor: '#0057B8',
              borderWidth: 1,
              borderRadius: 50,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 12,
              }}
            >
              <Image source={ImageProvider.Setting.RateApp} />
              <Text
                style={{
                  color: '#0057B8',
                  fontSize: 14,
                  fontWeight: '500',
                  fontFamily: 'Lato',
                  marginLeft: 6,
                }}
              >
                為我們評分
              </Text>
            </View>
            <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              borderColor: '#0057B8',
              borderWidth: 1,
              borderRadius: 50,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 12,
              }}
            >
              <Image source={ImageProvider.Setting.ReportIssue} />
              <Text
                style={{
                  color: '#0057B8',
                  fontSize: 14,
                  fontWeight: '500',
                  fontFamily: 'Lato',
                  marginLeft: 6,
                }}
              >
                回報問題
              </Text>
            </View>
            <Image source={ImageProvider.Setting.SettingRightArrowIcon} />
          </TouchableOpacity>

          <View
            style={{
              height: 2,
              backgroundColor: '#CCCCCC',
              width: '100%',
              marginVertical: 24,
            }}
          />

          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              fontFamily: 'Lato',
              color: '#1A1A1A',
              marginBottom: 16,
            }}
          >
            關於
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: '#0057B8',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Lato',
                marginVertical: 12,
              }}
            >
              常見問題
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: '#0057B8',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Lato',
                marginVertical: 12,
              }}
            >
              關於喜願
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: '#0057B8',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Lato',
                marginVertical: 12,
              }}
            >
              個資聲明 & 隱私權政策
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: '#0057B8',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Lato',
                marginVertical: 12,
              }}
            >
              使用條款
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              borderRadius: 50,
              marginBottom: 28,
              backgroundColor: '#FF585D',
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Lato',
                marginVertical: 14,
              }}
            >
              登出
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
