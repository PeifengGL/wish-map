import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from 'types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import VolunteerCard from 'components/VolunteerCard';
import Styles from './index.style';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import { VolunteerInfoData, VolunteerClass } from 'shared/volunteer.data';
import CapsuleButton from 'components/CapsuleButton';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import ImageProvider from 'assets';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Volunteer'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Volunteer'>;
};

export default function VolunteerPage({ route, navigation }: PageRouterProps) {
  const [activeVolunteerClassClass, setActiveVolunteerClass] = useState('全部');
  const [volunteerInfoList, setVolunteerInfoList] = useState(VolunteerInfoData);
  const modalRef = React.useRef<Modalize>(null);

  useEffect(() => {
    if (route.params?.enterOrigin === 'VolunteerApply') {
      modalRef.current?.open();
    }
  }, [route.params]);

  useEffect(() => {
    if (activeVolunteerClassClass === '全部') {
      setVolunteerInfoList(VolunteerInfoData);
    } else {
      const newVolunteerInfoList = VolunteerInfoData.filter(
        volunteerInfoData => {
          return (
            VolunteerClass[volunteerInfoData.type] === activeVolunteerClassClass
          );
        },
      );
      setVolunteerInfoList(newVolunteerInfoList);
    }
  }, [activeVolunteerClassClass]);

  const renderVolunteerClass = () => {
    const volunteerClassList = Object.values(VolunteerClass);
    return volunteerClassList.map((volunteerClass, index) => {
      return (
        <View style={Styles.capsuleButtonContainer} key={index}>
          <CapsuleButton
            showText={volunteerClass}
            returnText={volunteerClass}
            isSelected={volunteerClass === activeVolunteerClassClass}
            capsuleContainerStyle={{
              backgroundColor:
                volunteerClass === activeVolunteerClassClass
                  ? '#FFB549'
                  : '#FFFFFF',
              borderColor: '#FFB549',
            }}
            handleCapsuleButtonPress={() =>
              handleCapsuleButtonPress(volunteerClass)
            }
          />
        </View>
      );
    });
  };

  const handleCapsuleButtonPress = (text: string) => {
    setActiveVolunteerClass(text);
  };

  const handleVolunteerCardClick = () => {
    navigation.navigate('VolunteerApply', {});
  };

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <FocusAwareStatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Text style={Styles.headerText}>志工專區</Text>
      <View>
        <ScrollView
          horizontal
          style={Styles.classScrollView}
          showsHorizontalScrollIndicator={false}
        >
          {renderVolunteerClass()}
        </ScrollView>
      </View>
      <ScrollView style={Styles.contentScrollView}>
        {volunteerInfoList.map((volunteerInfoData, index) => {
          return (
            <View style={Styles.articleCardContainer} key={index}>
              <VolunteerCard volunteerInfoData={volunteerInfoData} />
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={handleVolunteerCardClick}
        style={{
          backgroundColor: '#0057B8',
          borderRadius: 50,
          position: 'absolute',
          right: 16,
          bottom: 24,
        }}
      >
        <View
          style={{
            marginHorizontal: 16,
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image source={ImageProvider.Volunteer.VolunteerApplyIcon} />
          <Text style={{ color: 'white', marginLeft: 4 }}>志工申請</Text>
        </View>
      </TouchableOpacity>
      <Portal>
        <Modalize ref={modalRef} adjustToContentHeight>
          <View
            style={{
              height: '100%',
              backgroundColor: '#ebf1f9',
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
            }}
          >
            <Text
              style={{
                color: '#FF585D',
                fontSize: 24,
                fontWeight: '700',
                marginTop: 50,
              }}
            >
              謝謝您的愛心
            </Text>
            <Text style={{ color: '#FF585D', fontSize: 16, fontWeight: '500' }}>
              期待與您一起為孩子們達成願望！
            </Text>
            <Image
              source={ImageProvider.Volunteer.VolunteerApplyBG}
              style={{
                width: 200,
                height: 200,
                resizeMode: 'contain',
                aspectRatio: 1,
              }}
            />
            <Text
              style={{
                color: '#75787B',
                fontSize: 14,
                fontWeight: '500',
                marginBottom: 24,
                marginTop: 16,
              }}
            >
              預計審核時間一個月內完成，本會將會盡快與您聯絡
            </Text>
            <View style={{ width: '100%', marginBottom: 32 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0057B8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  marginHorizontal: 28,
                }}
                onPress={() => modalRef.current?.close()}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    marginVertical: 12,
                    color: '#FFFFFF',
                  }}
                >
                  知道了
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </Portal>
    </SafeAreaView>
  );
}
