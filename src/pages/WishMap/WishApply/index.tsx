import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { RootStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import WishRadioButton from 'components/WishRadioButton';
import Styles from './index.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'WishApply'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'WishApply'>;
};

export default function WishApplyPage({ navigation }: PageRouterProps) {
  const [wishApplierType, setWishApplierType] = useState<string>('');
  const [wishApplierName, setWishApplierName] = useState<string>('');
  const [wishApplierPhone, setWishApplierPhone] = useState<string>('');
  const [wishApplierServiceUnits, setWishApplierServiceUnits] =
    useState<string>('');
  const [wishApplierJobTitle, setWishApplierJobTitle] = useState<string>('');

  const handleNextButtonClick = () => {
    const wishApplyStepOneData = {
      wishApplierType: wishApplierType,
      wishApplierName: wishApplierName,
      wishApplierPhone: wishApplierPhone,
      wishApplierServiceUnits: wishApplierServiceUnits,
      wishApplierJobTitle: wishApplierJobTitle,
    };
    navigation.push('WishApplyNextStep', {
      stepOneData: wishApplyStepOneData,
    });
  };

  const renderWishApplyGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Volunteer.VolunteerGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const radioButtonClick = (text: string) => {
    setWishApplierType(text);
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar backgroundColor="#EBF1F9" barStyle="dark-content" />
      <ImageBackground
        source={ImageProvider.WishMap.WishApplyBackground}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      >
        <View style={Styles.headerContainer}>
          <View style={Styles.headerGoBack}>{renderWishApplyGoBack()}</View>
          <Text style={Styles.headerTitle}>圓夢申請</Text>
        </View>
        <KeyboardAwareScrollView style={Styles.scrollView} enableOnAndroid>
          <View style={Styles.scrollViewContainer}>
            <View style={Styles.contentTitleContainer}>
              <Text
                style={Styles.contentTitleText}
              >{`若您是或身邊有3歲以上，未滿18歲的重症病童，\n您可以向本會提出圓夢申請，請填寫下列表單，本會將由專人與您聯繫。\n亦可撥打圓夢專線：02-2718-2656`}</Text>
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                color: '#0057B8',
                marginBottom: 16,
              }}
            >
              申請人身分
            </Text>
            <View>
              <View style={{ marginBottom: 16 }}>
                <View style={{ marginBottom: 8 }}>
                  <WishRadioButton
                    itemText="病童本人"
                    isSelected={wishApplierType === '病童本人'}
                    radioClickFunction={radioButtonClick}
                  />
                </View>

                {wishApplierType === '病童本人' ? (
                  <>
                    <View style={{ marginBottom: 8 }}>
                      <TextInput
                        label="申請人姓名"
                        value={wishApplierName}
                        placeholder="請輸入申請人姓名"
                        onChangeText={text => setWishApplierName(text)}
                        mode="outlined"
                        outlineColor="#0057B8"
                        outlineStyle={{
                          borderRadius: 12,
                          borderColor: '#0057B8',
                        }}
                        theme={{
                          colors: {
                            primary: '#0057B8',
                          },
                        }}
                      />
                    </View>
                    <TextInput
                      label="手機號碼"
                      value={wishApplierPhone}
                      placeholder="請輸入手機號碼"
                      onChangeText={text => setWishApplierPhone(text)}
                      mode="outlined"
                      outlineStyle={{
                        borderRadius: 12,
                        borderColor: '#0057B8',
                      }}
                      theme={{
                        colors: {
                          primary: '#0057B8',
                        },
                      }}
                    />
                  </>
                ) : null}
              </View>
              <View style={{ marginBottom: 16 }}>
                <View style={{ marginBottom: 8 }}>
                  <WishRadioButton
                    itemText="病童親屬"
                    isSelected={wishApplierType === '病童親屬'}
                    radioClickFunction={radioButtonClick}
                  />
                </View>

                {wishApplierType === '病童親屬' ? (
                  <>
                    <View style={{ marginBottom: 8 }}>
                      <TextInput
                        label="申請人姓名"
                        value={wishApplierName}
                        placeholder="請輸入申請人姓名"
                        onChangeText={text => setWishApplierName(text)}
                        mode="outlined"
                        outlineColor="#0057B8"
                        outlineStyle={{
                          borderRadius: 12,
                          borderColor: '#0057B8',
                        }}
                        theme={{
                          colors: {
                            primary: '#0057B8',
                          },
                        }}
                      />
                    </View>
                    <View style={{ marginBottom: 8 }}>
                      <TextInput
                        label="手機號碼"
                        value={wishApplierPhone}
                        placeholder="請輸入手機號碼"
                        onChangeText={text => setWishApplierPhone(text)}
                        mode="outlined"
                        outlineStyle={{
                          borderRadius: 12,
                          borderColor: '#0057B8',
                        }}
                        theme={{
                          colors: {
                            primary: '#0057B8',
                          },
                        }}
                      />
                    </View>
                  </>
                ) : null}
              </View>
              <View style={{ marginBottom: 16 }}>
                <View style={{ marginBottom: 8 }}>
                  <WishRadioButton
                    itemText="醫護/社工"
                    isSelected={wishApplierType === '醫護/社工'}
                    radioClickFunction={radioButtonClick}
                  />
                </View>

                {wishApplierType === '醫護/社工' ? (
                  <>
                    <View style={{ marginBottom: 8 }}>
                      <TextInput
                        label="申請人姓名"
                        value={wishApplierName}
                        placeholder="請輸入申請人姓名"
                        onChangeText={text => setWishApplierName(text)}
                        mode="outlined"
                        outlineColor="#0057B8"
                        outlineStyle={{
                          borderRadius: 12,
                          borderColor: '#0057B8',
                        }}
                        theme={{
                          colors: {
                            primary: '#0057B8',
                          },
                        }}
                      />
                    </View>
                    <View style={{ marginBottom: 8 }}>
                      <TextInput
                        label="手機號碼"
                        value={wishApplierPhone}
                        placeholder="請輸入手機號碼"
                        onChangeText={text => setWishApplierPhone(text)}
                        mode="outlined"
                        outlineStyle={{
                          borderRadius: 12,
                          borderColor: '#0057B8',
                        }}
                        theme={{
                          colors: {
                            primary: '#0057B8',
                          },
                        }}
                      />
                    </View>
                    <View style={{ marginBottom: 8 }}>
                      <TextInput
                        label="服務單位"
                        value={wishApplierServiceUnits}
                        placeholder="請輸入服務單位"
                        onChangeText={text => setWishApplierServiceUnits(text)}
                        mode="outlined"
                        outlineStyle={{
                          borderRadius: 12,
                          borderColor: '#0057B8',
                        }}
                        theme={{
                          colors: {
                            primary: '#0057B8',
                          },
                        }}
                      />
                    </View>
                    <View style={{ marginBottom: 8 }}>
                      <TextInput
                        label="職稱"
                        value={wishApplierJobTitle}
                        placeholder="請輸入職稱"
                        onChangeText={text => setWishApplierJobTitle(text)}
                        mode="outlined"
                        outlineStyle={{
                          borderRadius: 12,
                          borderColor: '#0057B8',
                        }}
                        theme={{
                          colors: {
                            primary: '#0057B8',
                          },
                        }}
                      />
                    </View>
                  </>
                ) : null}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: '#0057B8',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            marginHorizontal: 16,
            marginBottom: 28,
          }}
          onPress={handleNextButtonClick}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              marginVertical: 12,
              color: '#FFFFFF',
            }}
          >
            下一步
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
