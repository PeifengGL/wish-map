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
  ToastAndroid,
  Pressable,
  BackHandler,
  StatusBar,
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
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import DocumentPicker, {
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';
import { Subscription } from 'rxjs';
import { UserProfileType } from 'types/profile';
import { WishApplyToJotform } from 'api/Jotform';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'WishApplyNextStep'>;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'WishApplyNextStep'
  >;
};
const MAX_IMAGES = 15;
export default function WishApplyNextStepPage({
  route,
  navigation,
}: PageRouterProps) {
  const { stepOneData } = route.params;
  const statusBarHeight = StatusBar.currentHeight;
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
  const [supplementFile, setSupplementFile] = useState<string[]>([]);
  const [howToKnowMakeWish, setHowToKnowMakeWish] = useState<string[]>([]);
  const [isAgreePrivacy, setIsAgreePrivacy] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isButtonEnable, setIsButtonEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowImageOpenModal, setIsShowImageOpenModal] = useState(false);
  const [selectedPreviewImageInfo, setSelectedPreviewImageInfo] = useState<{
    uri: string;
    ratio: number;
  }>({ uri: '', ratio: 1 });
  const [previewImageLoadEnd, setPreviewImageLoadEnd] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileType>();
  const [birthToJotform, setBirthToJotform] = useState<string>('');

  useEffect(() => {
    const userProfileSubscription: Subscription =
      DataShareService.getUserProfile$().subscribe(
        (newUserProfile: UserProfileType) => {
          setUserProfile(newUserProfile);
        },
      );
    return () => {
      userProfileSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (isShowImageOpenModal) {
        closeShowPreviewImageModal();
        return true;
      } else if (modalIsOpen) {
        setModalIsOpen(false);
        return true;
      }
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const modalizeRef = useRef<Modalize>(null);
  const privacyModalizeRef = useRef<Modalize>(null);
  const picturePickModalizeRef = useRef<Modalize>(null);

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
    const formData = new FormData();
    const birthSplit = birthToJotform.split('/');
    console.log('birthToJotform', birthToJotform);
    formData.append('submission[3]', stepOneData.wishApplierType);
    formData.append('submission[5]', stepOneData.wishApplierName);
    formData.append(
      'submission[6]',
      stepOneData.wishApplierPhone.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3'),
    );
    formData.append('submission[7]', stepOneData.wishApplierServiceUnits);
    formData.append('submission[8]', stepOneData.wishApplierJobTitle);
    formData.append('submission[15]', childName);
    formData.append('submission[17]', childGender);
    formData.append('submission[18][year]', birthSplit[0]);
    formData.append('submission[18][month]', birthSplit[1]);
    formData.append('submission[18][day]', birthSplit[2]);
    formData.append('submission[19]', supplement);
    formData.append('submission[21][addr_line1]', contactAddress);
    formData.append('submission[22]', contactPerson);
    formData.append('submission[23]', contactRelationship);
    formData.append(
      'submission[24]',
      contactPhone.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3'),
    );
    formData.append('submission[28]', hospital);
    formData.append('submission[30]', doctorName);
    formData.append('submission[31]', medicalDepartment);
    formData.append('submission[47]', 'Accepted');
    howToKnowMakeWish.forEach(item => {
      formData.append('submission[53][]', item);
    });

    const wishApplyData = {
      userId: userProfile?.userUID,
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
    WishApplyToJotform(formData);
    await DataShareService.sendWishApply(wishApplyData).finally(() =>
      setIsLoading(false),
    );

    navigation.navigate('WishMap', {
      originEntry: 'WishApply',
    });
  };

  const filterSelectedFileUri = (
    data: Array<Asset> | Array<DocumentPickerResponse>,
  ) => {
    const filterSelectedFileUriData = data.map(item => item.uri!);
    const concatUri = supplementFile.concat(filterSelectedFileUriData);
    if (concatUri.length > 15) {
      ToastAndroid.show(
        `您已選擇${MAX_IMAGES}檔案，最多只能選15個檔案)`,
        ToastAndroid.SHORT,
      );
      setSupplementFile(concatUri.slice(0, MAX_IMAGES));
      return;
    }
    setSupplementFile(concatUri);
  };

  const handleChooseImageFromFile = () => {
    DocumentPicker.pick({
      type: types.images,
      allowMultiSelection: true,
    }).then(res => {
      filterSelectedFileUri(res);

      picturePickModalizeRef.current?.close();
    });
  };

  const handleChooseImageFromGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: MAX_IMAGES - supplement.length,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      } else if (response.errorMessage) {
        return;
      }

      const newSelectedImages: Asset[] = response.assets!;

      filterSelectedFileUri(newSelectedImages);
      picturePickModalizeRef.current?.close();
    });
  };

  const setPreviewImage = (uri: string) => {
    Image.getSize(uri, (width, height) => {
      setSelectedPreviewImageInfo({ uri: uri, ratio: width / height });
    });
  };

  const renderSelectedImage = () => {
    return supplementFile.map((item, index) => {
      return (
        <View key={index} style={Styles.renderSelectedImageContainer}>
          <TouchableOpacity
            onPress={() => {
              setPreviewImage(item);
              setIsShowImageOpenModal(true);
            }}
          >
            <Image source={{ uri: item }} style={Styles.renderSelectedImage} />
          </TouchableOpacity>

          <View style={Styles.renderSelectedImageText}>
            <Text>{`病歷摘要 - ${index + 1}.jpg`}</Text>
            <TouchableOpacity
              onPress={() =>
                setSupplementFile(supplementFile.filter(data => data !== item))
              }
            >
              <Image source={ImageProvider.WishMap.WishApplyDeleteImageIcon} />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  const closeShowPreviewImageModal = () => {
    setIsShowImageOpenModal(false);
    setSelectedPreviewImageInfo({ uri: '', ratio: 1 });
    setPreviewImageLoadEnd(false);
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
          <Text style={Styles.blockTitleText}>病童資料</Text>
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
              <View style={Styles.genderContainer}>
                <View style={Styles.genderItemContainer}>
                  <WishRadioButton
                    itemText="男"
                    isSelected={childGender === '男'}
                    radioClickFunction={() => genderRadioButtonClick('男')}
                  />
                </View>
                <View style={Styles.genderItemContainer}>
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
              <View style={Styles.birthdayContainer}>
                <TouchableOpacity
                  onPress={() => modalizeRef.current?.open()}
                  style={Styles.selectBirthdayButton}
                >
                  <View style={Styles.selectBirthdayButtonTextContainer}>
                    <Text style={Styles.selectBirthdayButtonText}>
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
            <Text style={Styles.blockTitleText}>聯絡資料</Text>
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
            <Text style={Styles.blockTitleText}>病況資料</Text>
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
                onPress={() => picturePickModalizeRef.current?.open()}
                style={Styles.medicalRecordsButton}
              >
                <Text style={Styles.medicalRecordsButtonText}>
                  {`請上傳所需附件（例如：病歷摘要)`}
                </Text>
              </TouchableOpacity>
              {renderSelectedImage()}
            </View>
            <View style={Styles.separator} />
            <Text style={Styles.blockTitleText}>其他</Text>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>如何得知喜願</Text>
                <Text style={Styles.fieldHeaderRequiredText}>(可複選)</Text>
              </View>

              <View>
                <View style={Styles.otherBlockContainer}>
                  <View style={Styles.otherRowContainer}>
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
                    <Text style={Styles.otherRowCheckBoxText}>病友</Text>
                  </View>
                  <View style={Styles.otherRowContainer}>
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
                    <Text style={Styles.otherRowCheckBoxText}>醫護</Text>
                  </View>
                </View>

                <View style={Styles.otherBlockContainer2}>
                  <View style={Styles.otherRowContainer}>
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
                    <Text style={Styles.otherRowCheckBoxText}>網路</Text>
                  </View>
                  <View style={Styles.otherRowContainer}>
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
                    <Text style={Styles.otherRowCheckBoxText}>其他</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.fieldContainer}>
              <View style={Styles.fieldHeaderContainer}>
                <Text style={Styles.fieldHeaderText}>個資聲明</Text>
                <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
              </View>
              <View style={Styles.otherRowContainer}>
                <CheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={isAgreePrivacy}
                  onValueChange={() => {
                    setIsAgreePrivacy(!isAgreePrivacy);
                  }}
                />
                <View style={Styles.otherBlockContainer2}>
                  <Text style={Styles.otherRowCheckBoxText}>我已閱讀</Text>
                  <TouchableOpacity onPress={handlePrivacyClick}>
                    <Text style={Styles.policyButtonText}> 個資聲明 </Text>
                  </TouchableOpacity>
                  <Text style={Styles.readTermsText}>並同意該條款</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={sendWishApply}
            style={[
              Styles.sendApplyButton,
              isButtonEnable
                ? { backgroundColor: '#0057B8' }
                : { backgroundColor: '#ECECEC' },
            ]}
            disabled={!isButtonEnable}
          >
            <Text
              style={[
                Styles.sendApplyButtonText,
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
            setBirthToJotform(
              `${date.getFullYear()}/${
                date.getUTCMonth() + 1 < 10
                  ? `0${date.getUTCMonth() + 1}`
                  : date.getUTCMonth() + 1
              }/${
                date.getUTCDate() < 10
                  ? `0${date.getUTCDate()}`
                  : date.getUTCDate()
              }`,
            );
            modalizeRef.current?.close();
          }}
        >
          <View style={Styles.selectBirthdayModalHeader}>
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
                setBirthToJotform(
                  `${date.getFullYear()}/${
                    date.getUTCMonth() + 1 < 10
                      ? `0${date.getUTCMonth() + 1}`
                      : date.getUTCMonth() + 1
                  }/${
                    date.getUTCDate() < 10
                      ? `0${date.getUTCDate()}`
                      : date.getUTCDate()
                  }`,
                );
                modalizeRef.current?.close();
              }}
            >
              <Image source={ImageProvider.Volunteer.VolunteerConfirm} />
            </TouchableOpacity>
          </View>
          <View style={Styles.selectBirthdayModalContainer}>
            <DatePicker
              mode="date"
              date={date}
              onDateChange={date => setDate(date)}
              locale="zh-TW"
              androidVariant="nativeAndroid"
              fadeToColor="#0057B8"
            />
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

        <Modalize ref={picturePickModalizeRef} adjustToContentHeight>
          <View style={Styles.selectImageModalContainer}>
            <Text style={Styles.selectImageModalHeaderTitle}>
              請選擇上傳途徑
            </Text>
            <TouchableOpacity
              onPress={() => picturePickModalizeRef.current?.close()}
              style={Styles.selectImageModalClose}
            >
              <Image source={ImageProvider.WishMap.ClosePrivacyIcon} />
            </TouchableOpacity>
          </View>
          <View style={Styles.selectImageButtonsContainer}>
            <TouchableOpacity
              onPress={handleChooseImageFromFile}
              style={Styles.selectImageModalFileButton}
            >
              <Text style={Styles.selectImageModeButtonText}>檔案</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleChooseImageFromGallery}
              style={Styles.selectImageModalAlbumButton}
            >
              <Text style={Styles.selectImageModeButtonText}>相簿</Text>
            </TouchableOpacity>
          </View>
        </Modalize>
      </Portal>

      {isLoading ? <LoadingModal /> : null}

      {isShowImageOpenModal ? (
        <Pressable
          onPress={closeShowPreviewImageModal}
          style={Styles.showImageOpenModalContainer}
        >
          {selectedPreviewImageInfo.uri ? (
            <Image
              source={{ uri: selectedPreviewImageInfo.uri }}
              onLoadEnd={() => setPreviewImageLoadEnd(true)}
              style={
                selectedPreviewImageInfo.ratio > 1
                  ? {
                      width: Dimensions.get('window').width,
                      aspectRatio: selectedPreviewImageInfo.ratio,
                    }
                  : {
                      height:
                        Dimensions.get('window').height - statusBarHeight!,
                      aspectRatio: selectedPreviewImageInfo.ratio,
                    }
              }
            />
          ) : null}
          <TouchableOpacity
            onPress={closeShowPreviewImageModal}
            style={Styles.showImageOpenModalCloseButton}
          >
            <Image source={ImageProvider.WishMap.WishApplyCancelImageIcon} />
          </TouchableOpacity>
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
}
