import React, { useEffect, useRef, useState } from 'react';
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
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';
import { checkIsVolunteer, getCustomerInfo } from 'api/Login';
import LoadingModal from 'components/LoadingModal';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Volunteer'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Volunteer'>;
};

export default function VolunteerPage({ route, navigation }: PageRouterProps) {
  const [activeVolunteerClassClass, setActiveVolunteerClass] = useState('全部');
  const [volunteerInfoList, setVolunteerInfoList] = useState(VolunteerInfoData);
  const [showApplyButton, setShowApplyButton] = useState<Boolean>(false);
  const modalRef = useRef<Modalize>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = await LocalStorage.getData(
        LocalStorageKeys.CustomerAccessTokenKey,
      );

      if (token && typeof token === 'string') {
        const info = await getCustomerInfo(token);

        if (info === null || !info.email) {
          return;
        }

        const result = await checkIsVolunteer(info.email);
        setIsLoading(false);
        setShowApplyButton(!result);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (route.params?.originEntry === 'VolunteerApply') {
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
    <>
      {isLoading ? (
        <LoadingModal color="#ffffff" />
      ) : (
        <SafeAreaView style={Styles.safeAreaView}>
          <FocusAwareStatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
          />
          <Text style={Styles.headerText}>志工專區</Text>
          <View style={Styles.classScrollViewContainer}>
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
          {showApplyButton && (
            <TouchableOpacity
              onPress={handleVolunteerCardClick}
              style={Styles.volunteerApplyButtonContainer}
            >
              <View style={Styles.volunteerApplyButton}>
                <Image source={ImageProvider.Volunteer.VolunteerApplyIcon} />
                <Text style={Styles.volunteerApplyButtonText}>志工申請</Text>
              </View>
            </TouchableOpacity>
          )}
          <Portal>
            <Modalize ref={modalRef} adjustToContentHeight>
              <View style={Styles.volunteerApplyDoneModalContainer}>
                <Text style={Styles.volunteerApplyDoneModalContent1}>
                  謝謝您的愛心
                </Text>
                <Text style={Styles.volunteerApplyDoneModalContent2}>
                  期待與您一起為孩子們達成願望！
                </Text>
                <Image
                  source={ImageProvider.Volunteer.VolunteerApplyBG}
                  style={Styles.volunteerApplyDoneModalContent3}
                />
                <Text style={Styles.volunteerApplyDoneModalContent4}>
                  預計審核時間一個月內完成，本會將會盡快與您聯絡
                </Text>
                <View style={Styles.closeModalButtonContainer}>
                  <TouchableOpacity
                    style={Styles.closeModalButton}
                    onPress={() => modalRef.current?.close()}
                  >
                    <Text style={Styles.closeModalButtonText}>知道了</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modalize>
          </Portal>
        </SafeAreaView>
      )}
    </>
  );
}
