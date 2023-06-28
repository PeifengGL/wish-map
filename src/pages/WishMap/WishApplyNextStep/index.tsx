import React, { useState, useEffect, useRef } from 'react';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import { RootStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import CheckBox from '@react-native-community/checkbox';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import DatePicker from 'react-native-date-picker';
import WishRadioButton from 'components/WishRadioButton';
import Styles from './index.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DataShareService from 'service';
import PrivacyContent, { PrivacyHeader } from 'components/PrivacyContent';
import LoadingModal from 'components/LoadingModal';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'WishApplyNextStep'>;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'WishApplyNextStep'
  >;
};

export default function WishApplyNextStepPage({
  route,
  navigation,
}: PageRouterProps) {
  const { stepOneData } = route.params;
  const dimensionsHeight = Dimensions.get('window').height;

  const [childName, setChildName] = useState('');
  const [childGender, setChildGender] = useState('');
  const [birthLabel, setBirthLabel] = useState('- 年 - 月 - 日');
  const [date, setDate] = useState(new Date());
  const [supplement, setSupplement] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactRelationship, setContactRelationship] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [hospital, setHospital] = useState('');
  const [medicalDepartment, setMedicalDepartment] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [supplementFile, setSupplementFile] = useState('');
  const [howToKnowMakeWish, setHowToKnowMakeWish] = useState<string[]>([]);
  const [isAgreePrivacy, setIsAgreePrivacy] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isButtonEnable, setIsButtonEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const modalizeRef = useRef<Modalize>(null);
  const privacyModalizeRef = useRef<Modalize>(null);

  const genderRadioButtonClick = (itemText: string) => {
    setChildGender(itemText);
  };

  const handlePrivacyClick = () => {
    privacyModalizeRef.current?.open();
    setModalIsOpen(true);
  };

  const renderWishApplyGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Volunteer.VolunteerGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const handlePrivacyClose = () => {
    privacyModalizeRef.current?.close();
    setModalIsOpen(false);
  };

  const checkButtonEnabled = () => {
    if (
      childName !== '' &&
      childGender !== '' &&
      contactAddress !== '' &&
      contactPerson !== '' &&
      contactRelationship !== '' &&
      contactPhone !== '' &&
      isAgreePrivacy
    ) {
      setIsButtonEnable(true);
      return;
    }
    setIsButtonEnable(false);
  };

  useEffect(() => {
    checkButtonEnabled();
  }, [
    childName,
    childGender,
    contactAddress,
    contactPerson,
    contactRelationship,
    contactPhone,
    isAgreePrivacy,
  ]);

  const sendWishApply = async () => {
    const wishApplyData = {
      申請人身分: stepOneData.wishApplierType,
      申請人姓名: stepOneData.wishApplierName,
      申請人手機號碼: stepOneData.wishApplierPhone,
      申請人服務單位: stepOneData.wishApplierServiceUnits,
      申請人職稱: stepOneData.wishApplierJobTitle,
      病童姓名: childName,
      性別: childGender,
      生日: birthLabel,
      補充說明: supplement,
      聯絡地址: contactAddress,
      聯絡人: contactPerson,
      關係: contactRelationship,
      聯絡人手機號碼: contactPhone,
      醫院: hospital,
      就診科別: medicalDepartment,
      醫師姓名: doctorName,
      如何得知喜願: howToKnowMakeWish.join(','),
    };

    setIsLoading(true);
    await DataShareService.sendWishApply(wishApplyData).finally(() =>
      setIsLoading(false),
    );

    navigation.navigate('WishMap', {
      enterOrigin: 'WishApply',
    });
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      {modalIsOpen ? (
        <FocusAwareStatusBar
          backgroundColor="#1F1F1F4D"
          barStyle="light-content"
        />
      ) : (
        <FocusAwareStatusBar
          backgroundColor="#EBF1F9"
          barStyle="dark-content"
        />
      )}

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
            病童資料
          </Text>
          <View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>病童姓名</Text>
                <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
              </View>
              <TextInput
                placeholder="請輸入病童姓名"
                style={Styles.fieldTextInputStyle}
                onChangeText={text => setChildName(text)}
              />
            </View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>性別</Text>
                <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                  <WishRadioButton
                    itemText="男"
                    isSelected={childGender === '男'}
                    radioClickFunction={() => genderRadioButtonClick('男')}
                  />
                </View>
                <View style={{ flex: 0.5 }}>
                  <WishRadioButton
                    itemText="女"
                    isSelected={childGender === '女'}
                    radioClickFunction={() => genderRadioButtonClick('女')}
                  />
                </View>
              </View>
            </View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>生日</Text>
              </View>
              <View
                style={{
                  alignSelf: 'flex-start',
                }}
              >
                <TouchableOpacity
                  onPress={() => modalizeRef.current?.open()}
                  style={{
                    borderColor: '#0057B8',
                    borderRadius: 30,
                    borderWidth: 1,
                    alignSelf: 'center',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#0057B8',
                        marginVertical: 12,
                        marginRight: 24,
                      }}
                    >
                      {birthLabel}
                    </Text>
                    <Image
                      source={ImageProvider.Volunteer.VolunteerArrowDownIcon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>補充說明</Text>
              </View>
              <TextInput
                placeholder="請輸入個性、特質、興趣與喜好...等等"
                style={Styles.fieldMultilineTextInputStyle}
                onChangeText={text => setSupplement(text)}
                multiline
              />
            </View>
            <View style={Styles.separator} />
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                color: '#0057B8',
                marginBottom: 16,
              }}
            >
              聯絡資料
            </Text>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>聯絡地址</Text>
                <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
              </View>
              <TextInput
                placeholder="請輸入聯絡地址"
                style={Styles.fieldTextInputStyle}
                onChangeText={text => setContactAddress(text)}
              />
            </View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>聯絡人</Text>
                <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
              </View>
              <TextInput
                placeholder="請輸入聯絡人"
                style={Styles.fieldTextInputStyle}
                onChangeText={text => setContactPerson(text)}
              />
            </View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>關係</Text>
                <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
              </View>
              <TextInput
                placeholder="請輸入關係"
                style={Styles.fieldTextInputStyle}
                onChangeText={text => setContactRelationship(text)}
              />
            </View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>聯絡人手機號碼</Text>
                <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
              </View>
              <TextInput
                placeholder="請輸入聯絡人手機號碼"
                style={Styles.fieldTextInputStyle}
                onChangeText={text => setContactPhone(text)}
              />
            </View>
            <View style={Styles.separator} />
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                color: '#0057B8',
                marginBottom: 16,
              }}
            >
              病況資料
            </Text>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>醫院</Text>
              </View>
              <TextInput
                placeholder="請輸入病童就診醫院"
                style={Styles.fieldTextInputStyle}
                onChangeText={text => setHospital(text)}
              />
            </View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>就診科別</Text>
              </View>
              <TextInput
                placeholder="請輸入病童就診科別"
                style={Styles.fieldTextInputStyle}
                onChangeText={text => setMedicalDepartment(text)}
              />
            </View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>醫師</Text>
              </View>
              <TextInput
                placeholder="請輸入主治醫師姓名"
                style={Styles.fieldTextInputStyle}
                onChangeText={text => setDoctorName(text)}
              />
            </View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>補充文件</Text>
                <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
              </View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#0057B8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}
              >
                <Text
                  style={{
                    marginVertical: 12,
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#0057B8',
                  }}
                >
                  {`請上傳所需附件（例如：病歷摘要)`}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={Styles.separator} />
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                color: '#0057B8',
                marginBottom: 16,
              }}
            >
              其他
            </Text>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>如何得知喜願</Text>
                <Text style={Styles.fieldHeaderRequiredText}>(可複選)</Text>
              </View>

              <View>
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 0.5,
                    }}
                  >
                    <CheckBox
                      tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                      value={howToKnowMakeWish.includes('病友')}
                      onValueChange={() => {
                        if (howToKnowMakeWish.includes('病友')) {
                          setHowToKnowMakeWish(
                            howToKnowMakeWish.filter(item => item !== '病友'),
                          );
                        } else {
                          setHowToKnowMakeWish([...howToKnowMakeWish, '病友']);
                        }
                      }}
                    />
                    <Text
                      style={{ fontSize: 14, color: '#2D2D2D', marginLeft: 4 }}
                    >
                      病友
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 0.5,
                    }}
                  >
                    <CheckBox
                      tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                      value={howToKnowMakeWish.includes('醫護')}
                      onValueChange={() => {
                        if (howToKnowMakeWish.includes('醫護')) {
                          setHowToKnowMakeWish(
                            howToKnowMakeWish.filter(item => item !== '醫護'),
                          );
                        } else {
                          setHowToKnowMakeWish([...howToKnowMakeWish, '醫護']);
                        }
                      }}
                    />
                    <Text
                      style={{ fontSize: 14, color: '#2D2D2D', marginLeft: 4 }}
                    >
                      醫護
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 0.5,
                    }}
                  >
                    <CheckBox
                      tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                      value={howToKnowMakeWish.includes('網路')}
                      onValueChange={() => {
                        if (howToKnowMakeWish.includes('網路')) {
                          setHowToKnowMakeWish(
                            howToKnowMakeWish.filter(item => item !== '網路'),
                          );
                        } else {
                          setHowToKnowMakeWish([...howToKnowMakeWish, '網路']);
                        }
                      }}
                    />
                    <Text
                      style={{ fontSize: 14, color: '#2D2D2D', marginLeft: 4 }}
                    >
                      網路
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 0.5,
                    }}
                  >
                    <CheckBox
                      tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                      value={howToKnowMakeWish.includes('其他')}
                      onValueChange={() => {
                        if (howToKnowMakeWish.includes('其他')) {
                          setHowToKnowMakeWish(
                            howToKnowMakeWish.filter(item => item !== '其他'),
                          );
                        } else {
                          setHowToKnowMakeWish([...howToKnowMakeWish, '其他']);
                        }
                      }}
                    />
                    <Text
                      style={{ fontSize: 14, color: '#2D2D2D', marginLeft: 4 }}
                    >
                      其他
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>個資聲明</Text>
                <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 0.5,
                }}
              >
                <CheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={isAgreePrivacy}
                  onValueChange={() => {
                    setIsAgreePrivacy(!isAgreePrivacy);
                  }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{ fontSize: 14, color: '#2D2D2D', marginLeft: 4 }}
                  >
                    我已閱讀
                  </Text>
                  <TouchableOpacity onPress={handlePrivacyClick}>
                    <Text style={{ color: '#0057B8' }}> 個資聲明 </Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 14, color: '#2D2D2D' }}>
                    並同意該條款
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={sendWishApply}
            style={[
              {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 12,
                borderRadius: 50,
              },
              isButtonEnable
                ? { backgroundColor: '#0057B8' }
                : { backgroundColor: '#ECECEC' },
            ]}
            disabled={!isButtonEnable}
          >
            <Text
              style={[
                { marginVertical: 14 },
                isButtonEnable ? { color: 'white' } : { color: '#909090' },
              ]}
            >
              送出
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          onOverlayPress={() => {
            setBirthLabel(
              `${date.getFullYear()} 年 ${
                date.getMonth() + 1
              } 月 ${date.getUTCDate()} 日`,
            );
            modalizeRef.current?.close();
          }}
        >
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 24,
                paddingHorizontal: 16,
              }}
            >
              <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
                <Image source={ImageProvider.Volunteer.VolunteerClose} />
              </TouchableOpacity>

              <Text>選擇出生日期</Text>
              <TouchableOpacity
                onPress={() => {
                  setBirthLabel(
                    `${date.getFullYear()} 年 ${
                      date.getMonth() + 1
                    } 月 ${date.getUTCDate()} 日`,
                  );
                  modalizeRef.current?.close();
                }}
              >
                <Image source={ImageProvider.Volunteer.VolunteerConfirm} />
              </TouchableOpacity>
            </View>
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
              <DatePicker
                mode="date"
                date={date}
                onDateChange={date => setDate(date)}
                locale="zh-TW"
                androidVariant="nativeAndroid"
                fadeToColor="#0057B8"
              />
            </View>
          </View>
        </Modalize>
        <Modalize
          ref={privacyModalizeRef}
          modalHeight={dimensionsHeight}
          onClosed={() => setModalIsOpen(false)}
          HeaderComponent={PrivacyHeader(handlePrivacyClose)}
        >
          <PrivacyContent />
        </Modalize>
      </Portal>
      {isLoading ? <LoadingModal /> : null}
    </SafeAreaView>
  );
}
