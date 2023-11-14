import React, { useState, useEffect, useRef } from 'react';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
import { RootStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import { RadioButton } from 'react-native-paper';
import WishCheckBox from '@components/WishCheckBox/index';
import { Modalize } from 'react-native-modalize';
import DatePicker from 'react-native-date-picker';
import LoadingModal from 'components/LoadingModal';
import DataShareService from 'service';
import { Subscription } from 'rxjs';
import PrivacyContent, { PrivacyHeader } from 'components/PrivacyContent';
import { UserProfileType } from 'types/profile';
import { VolunteerApplyToJotform } from 'api/Jotform';
import Styles from './index.style';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'VolunteerApply'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'VolunteerApply'>;
};

export default function VolunteerApplyPage({ navigation }: PageRouterProps) {
  const dimensionsHeight =
    StatusBar.currentHeight !== undefined
      ? Dimensions.get('window').height - StatusBar.currentHeight
      : Dimensions.get('window').height;
  const [gender, setGender] = useState<'男' | '女' | ''>('');
  const [date, setDate] = useState<Date>(new Date());
  const [birthLabel, setBirthLabel] = useState<string>('- 年 - 月 - 日');
  const [birthToJotform, setBirthToJotform] = useState<string>('');
  const [volunteerName, setVolunteerName] = useState<string>('');
  const [volunteerEmail, setVolunteerEmail] = useState<string>('');
  const [volunteerPhone, setVolunteerPhone] = useState<string>('');
  const [volunteerAddress, setVolunteerAddress] = useState<string>('');
  const [volunteerJob, setVolunteerJob] = useState<string>('');
  const [volunteerEducation, setVolunteerEducation] = useState<string>('');
  const [volunteerExpertise, setVolunteerExpertise] = useState<string>('');
  const [volunteerServiceTime, setVolunteerServiceTime] = useState<any>({
    '1A': 0,
    '1P': 0,
    '2A': 0,
    '2P': 0,
    '3A': 0,
    '3P': 0,
    '4A': 0,
    '4P': 0,
    '5A': 0,
    '5P': 0,
    '6A': 0,
    '6P': 0,
    '7A': 0,
    '7P': 0,
  });

  const [serviceTimeLayoutWidth, setServiceTimeLayoutWidth] =
    useState<number>(0);
  const [volunteerArea, setVolunteerArea] = useState<string>('');
  const [volunteerTypes, setVolunteerTypes] = useState<string[]>([]);
  const [isAgreePrivacy, setIsAgreePrivacy] = useState<boolean>(false);
  const [isButtonEnable, setIsButtonEnable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfileType>();

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
    checkButtonEnable();
  }, [
    gender,
    volunteerName,
    volunteerEmail,
    volunteerPhone,
    volunteerAddress,
    volunteerEducation,
    volunteerArea,
    volunteerTypes,
    isAgreePrivacy,
  ]);

  const handleVolunteerNameChange = (text: string) => {
    setVolunteerName(text);
  };

  const handleVolunteerEmailChange = (text: string) => {
    setVolunteerEmail(text);
  };

  const handleVolunteerPhoneChange = (text: string) => {
    setVolunteerPhone(text);
  };

  const handleVolunteerAddressChange = (text: string) => {
    setVolunteerAddress(text);
  };

  const handleVolunteerJobChange = (text: string) => {
    setVolunteerJob(text);
  };

  const handleVolunteerEducationChange = (text: string) => {
    setVolunteerEducation(text);
  };

  const handleVolunteerExpertiseChange = (text: string) => {
    setVolunteerExpertise(text);
  };

  const modalizeRef = React.useRef<Modalize>(null);

  const renderVolunteerApplyGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Volunteer.VolunteerGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const privacyModalizeRef = useRef<Modalize>(null);

  const handlePrivacyClick = () => {
    privacyModalizeRef.current?.open();
    setModalIsOpen(true);
  };

  const handlePrivacyClose = () => {
    privacyModalizeRef.current?.close();
    setModalIsOpen(false);
  };

  const checkButtonEnable = () => {
    if (
      gender !== '' &&
      volunteerName !== '' &&
      volunteerEmail !== '' &&
      volunteerPhone !== '' &&
      volunteerAddress !== '' &&
      volunteerEducation !== '' &&
      volunteerArea !== '' &&
      volunteerTypes.length !== 0 &&
      isAgreePrivacy
    ) {
      setIsButtonEnable(true);
      return;
    }
    setIsButtonEnable(false);
  };

  const sendVolunteerApply = async () => {
    const formData = new FormData();
    const birthSplit = birthToJotform.split('/');
    const chineseNumbers = ['一', '二', '三', '四', '五', '六', '七'];
    formData.append('submission[4]', volunteerName);
    formData.append('submission[6]', gender);
    formData.append('submission[7][year]', birthSplit[0]);
    formData.append('submission[7][month]', birthSplit[1]);
    formData.append('submission[7][day]', birthSplit[2]);
    formData.append('submission[8]', volunteerEmail);
    formData.append(
      'submission[9][full]',
      volunteerPhone.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3'),
    );
    formData.append('submission[11][addr_line1]', volunteerAddress);
    formData.append('submission[12]', volunteerJob);
    formData.append('submission[13]', volunteerEducation);
    formData.append('submission[15]', volunteerExpertise);
    formData.append('submission[16]', volunteerArea);
    for (const value of Object.values(volunteerTypes)) {
      formData.append('submission[17][]', value);
    }
    for (const key in volunteerServiceTime) {
      if (volunteerServiceTime[key] === 1) {
        formData.append(
          `submission[18][${key.substring(1, 2) === 'A' ? '0' : '1'}][]`,
          chineseNumbers[parseInt(key) - 1],
        );
      }
    }
    formData.append('submission[21]', 'Accepted');
    formData.append('submission[24]', 'App');

    const volunteerApplyData = {
      userId: userProfile?.userUID,
      志工姓名: volunteerName,
      性別: gender,
      生日: birthLabel,
      電子信箱: volunteerEmail,
      手機號碼: volunteerPhone,
      聯絡地址: volunteerAddress,
      職業: volunteerJob,
      學歷: volunteerEducation,
      專長: volunteerExpertise,
      可服務地區: volunteerArea,
      希望擔任志工種類: volunteerTypes.toString(),
      週一上午: volunteerServiceTime['1A'] === 1 ? 'v' : '',
      週一下午: volunteerServiceTime['1P'] === 1 ? 'v' : '',
      週二上午: volunteerServiceTime['2A'] === 1 ? 'v' : '',
      週二下午: volunteerServiceTime['2P'] === 1 ? 'v' : '',
      週三上午: volunteerServiceTime['3A'] === 1 ? 'v' : '',
      週三下午: volunteerServiceTime['3P'] === 1 ? 'v' : '',
      週四上午: volunteerServiceTime['4A'] === 1 ? 'v' : '',
      週四下午: volunteerServiceTime['4P'] === 1 ? 'v' : '',
      週五上午: volunteerServiceTime['5A'] === 1 ? 'v' : '',
      週五下午: volunteerServiceTime['5P'] === 1 ? 'v' : '',
      週六上午: volunteerServiceTime['6A'] === 1 ? 'v' : '',
      週六下午: volunteerServiceTime['6P'] === 1 ? 'v' : '',
      週日上午: volunteerServiceTime['7A'] === 1 ? 'v' : '',
      週日下午: volunteerServiceTime['7P'] === 1 ? 'v' : '',
    };

    setIsLoading(true);
    VolunteerApplyToJotform(formData);
    await DataShareService.sendVolunteerApply(volunteerApplyData).finally(() =>
      setIsLoading(false),
    );

    navigation.navigate('Volunteer', {
      originEntry: 'VolunteerApply',
      data: volunteerApplyData,
    });
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="#EBF1F9"
        barStyle="dark-content"
        translucent={false}
      />

      <View style={Styles.headerContainer}>
        <View style={Styles.headerGoBack}>{renderVolunteerApplyGoBack()}</View>
        <Text style={Styles.headerTitle}>志工申請</Text>
      </View>
      <ScrollView style={Styles.scrollView}>
        <View style={Styles.scrollViewContainer}>
          <View style={Styles.contentTitleContainer}>
            <Text
              style={Styles.contentTitleText}
            >{`『付出，帶來快樂！』\n每個人都因為「愛」而聚集在這裡！\n看到重症孩子們願望成真時的笑臉，是我們繼續向前的最大動力！`}</Text>
          </View>
          <Text style={Styles.contentSubTitleText}>基本資料</Text>
          <View style={Styles.fieldContainer}>
            <View style={Styles.fieldHeaderContainer}>
              <Text style={Styles.fieldHeaderText}>志工姓名</Text>
              <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
            </View>
            <TextInput
              placeholder="請輸入志工姓名"
              style={Styles.fieldTextInputStyle}
              onChangeText={handleVolunteerNameChange}
            />
          </View>
          <View style={Styles.fieldContainer}>
            <View style={Styles.fieldHeaderContainer}>
              <Text style={Styles.fieldHeaderText}>性別</Text>
              <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
            </View>
            <View style={Styles.genderOptionContainer}>
              <View style={Styles.genderOption}>
                <RadioButton.Android
                  value="M"
                  status={gender === '男' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('男')}
                  color="#00BAB3"
                  uncheckedColor="#00BAB3"
                />
                <Text>男</Text>
              </View>
              <View style={Styles.genderOption}>
                <RadioButton.Android
                  value="F"
                  status={gender === '女' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('女')}
                  color="#00BAB3"
                  uncheckedColor="#00BAB3"
                />
                <Text>女</Text>
              </View>
            </View>
          </View>
          <View style={Styles.fieldContainer}>
            <View style={Styles.fieldHeaderContainer}>
              <Text style={Styles.fieldHeaderText}>生日</Text>
            </View>
            <View style={Styles.birthdaySelectionContainer}>
              <TouchableOpacity
                onPress={() => modalizeRef.current?.open()}
                style={Styles.birthdaySelectionButton}
              >
                <View style={Styles.birthdaySelectionButtonTextContainer}>
                  <Text style={Styles.birthdaySelectionButtonText}>
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
              <Text style={Styles.fieldHeaderText}>電子信箱</Text>
              <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
            </View>
            <TextInput
              placeholder="請輸入電子信箱"
              style={Styles.fieldTextInputStyle}
              onChangeText={handleVolunteerEmailChange}
            />
          </View>
          <View style={Styles.fieldContainer}>
            <View style={Styles.fieldHeaderContainer}>
              <Text style={Styles.fieldHeaderText}>手機號碼</Text>
              <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
            </View>
            <TextInput
              placeholder="請輸入手機號碼"
              style={Styles.fieldTextInputStyle}
              onChangeText={handleVolunteerPhoneChange}
            />
          </View>
          <View style={Styles.fieldContainer}>
            <View style={Styles.fieldHeaderContainer}>
              <Text style={Styles.fieldHeaderText}>聯絡地址</Text>
              <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
            </View>
            <TextInput
              placeholder="請輸入聯絡地址"
              style={Styles.fieldTextInputStyle}
              onChangeText={handleVolunteerAddressChange}
            />
          </View>
          <View style={Styles.fieldContainer}>
            <View style={Styles.fieldHeaderContainer}>
              <Text style={Styles.fieldHeaderText}>職業</Text>
            </View>
            <TextInput
              placeholder="請輸入名稱及擔任職務"
              style={Styles.fieldTextInputStyle}
              onChangeText={handleVolunteerJobChange}
            />
          </View>
          <View style={Styles.fieldContainer}>
            <View style={Styles.fieldHeaderContainer}>
              <Text style={Styles.fieldHeaderText}>學歷</Text>
              <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
            </View>
            <TextInput
              placeholder="請輸入最高學歷及科系"
              style={Styles.fieldTextInputStyle}
              onChangeText={handleVolunteerEducationChange}
            />
          </View>
          <View style={Styles.fieldContainer}>
            <View style={Styles.fieldHeaderContainer}>
              <Text style={Styles.fieldHeaderText}>專長</Text>
            </View>
            <TextInput
              placeholder="請輸入您的專長"
              style={Styles.fieldTextInputStyle}
              onChangeText={handleVolunteerExpertiseChange}
            />
          </View>
          <View style={Styles.separator} />
          <Text style={Styles.contentSubTitleText}>服務範圍</Text>
          <View style={Styles.fieldContainer}>
            <View style={Styles.fieldHeaderContainer}>
              <Text style={Styles.fieldHeaderText}>可服務地區</Text>
              <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
            </View>
            <View>
              <View style={Styles.selectionContainer}>
                <RadioButton.Android
                  value="北"
                  status={
                    volunteerArea ===
                    '北區（台北、新北、基隆、桃園、新竹、宜蘭）'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    setVolunteerArea(
                      '北區（台北、新北、基隆、桃園、新竹、宜蘭）',
                    );
                  }}
                  color="#00BAB3"
                  uncheckedColor="#00BAB3"
                />
                <Text>北區（台北、新北、基隆、桃園、新竹、宜蘭）</Text>
              </View>
              <View style={Styles.selectionContainer}>
                <RadioButton.Android
                  value="中"
                  status={
                    volunteerArea === '中區（苗栗、台中、彰化、南投、雲林）'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    setVolunteerArea('中區（苗栗、台中、彰化、南投、雲林）');
                  }}
                  color="#00BAB3"
                  uncheckedColor="#00BAB3"
                />
                <Text>中區（苗栗、台中、彰化、南投、雲林）</Text>
              </View>
              <View style={Styles.selectionContainer}>
                <RadioButton.Android
                  value="南"
                  status={
                    volunteerArea === '南區（嘉義、台南、高雄、屏東）'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    setVolunteerArea('南區（嘉義、台南、高雄、屏東）');
                  }}
                  color="#00BAB3"
                  uncheckedColor="#00BAB3"
                />
                <Text>南區（嘉義、台南、高雄、屏東）</Text>
              </View>
              <View style={Styles.selectionContainer}>
                <RadioButton.Android
                  value="東"
                  status={
                    volunteerArea === '東區（花蓮、台東）'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    setVolunteerArea('東區（花蓮、台東）');
                  }}
                  color="#00BAB3"
                  uncheckedColor="#00BAB3"
                />
                <Text>東區（花蓮、台東）</Text>
              </View>
            </View>
          </View>

          <View style={Styles.fieldContainer}>
            <View style={Styles.fieldHeaderContainer}>
              <Text style={Styles.fieldHeaderText}>希望擔任志工種類</Text>
              <Text style={Styles.fieldHeaderRequiredText}>
                (必填) （可複選）
              </Text>
            </View>

            <View>
              <View style={Styles.selectionContainer}>
                <View style={Styles.volunteerTypeSelectionContainer}>
                  <WishCheckBox
                    tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                    value={volunteerTypes.includes(
                      '個案志工：需通過志工訓練，可配合進行院訪、家訪工作',
                    )}
                    onValueChange={() => {
                      volunteerTypes.includes(
                        '個案志工：需通過志工訓練，可配合進行院訪、家訪工作',
                      )
                        ? setVolunteerTypes(
                            volunteerTypes.filter(
                              item =>
                                item !==
                                '個案志工：需通過志工訓練，可配合進行院訪、家訪工作',
                            ),
                          )
                        : setVolunteerTypes([
                            ...volunteerTypes,
                            '個案志工：需通過志工訓練，可配合進行院訪、家訪工作',
                          ]);
                    }}
                  />
                </View>

                <Text style={Styles.volunteerTypeTitle}>個案志工</Text>
              </View>
              <Text style={Styles.volunteerTypeContent}>
                需通過志工訓練，可配合進行院訪、家訪工作
              </Text>
            </View>

            <View>
              <View style={Styles.selectionContainer}>
                <View style={Styles.volunteerTypeSelectionContainer}>
                  <WishCheckBox
                    tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                    value={volunteerTypes.includes(
                      '活動志工：協助各項活動之進行',
                    )}
                    onValueChange={() => {
                      volunteerTypes.includes('活動志工：協助各項活動之進行')
                        ? setVolunteerTypes(
                            volunteerTypes.filter(
                              item => item !== '活動志工：協助各項活動之進行',
                            ),
                          )
                        : setVolunteerTypes([
                            ...volunteerTypes,
                            '活動志工：協助各項活動之進行',
                          ]);
                    }}
                  />
                </View>
                <Text style={Styles.volunteerTypeTitle}>活動志工</Text>
              </View>
              <Text style={Styles.volunteerTypeContent}>
                協助各項活動之進行
              </Text>
            </View>

            <View>
              <View style={Styles.selectionContainer}>
                <View style={Styles.volunteerTypeSelectionContainer}>
                  <WishCheckBox
                    tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                    value={volunteerTypes.includes(
                      '會務志工：協助辦公室各項事務性工作之進行',
                    )}
                    onValueChange={() => {
                      volunteerTypes.includes(
                        '會務志工：協助辦公室各項事務性工作之進行',
                      )
                        ? setVolunteerTypes(
                            volunteerTypes.filter(
                              item =>
                                item !==
                                '會務志工：協助辦公室各項事務性工作之進行',
                            ),
                          )
                        : setVolunteerTypes([
                            ...volunteerTypes,
                            '會務志工：協助辦公室各項事務性工作之進行',
                          ]);
                    }}
                  />
                </View>

                <Text style={Styles.volunteerTypeTitle}>會務志工</Text>
              </View>
              <Text style={Styles.volunteerTypeContent}>
                協助辦公室各項事務性工作之進行
              </Text>
            </View>
          </View>

          <View style={Styles.fieldHeaderContainer}>
            <Text style={Styles.fieldHeaderText}>可以擔任志工時間</Text>
            <Text style={Styles.fieldHeaderRequiredText}>（可複選）</Text>
          </View>
          <View
            onLayout={event => {
              const { width } = event.nativeEvent.layout;
              setServiceTimeLayoutWidth(width);
            }}
            style={Styles.volunteerServiceTimeContainer}
          >
            <View style={{ width: serviceTimeLayoutWidth / 8 }}>
              <View style={Styles.serviceTimeHeader}>
                <Text style={Styles.emptyBlock}></Text>
              </View>
              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <Text style={Styles.volunteerServiceTimeText}>上午</Text>
              </View>
              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <Text style={Styles.volunteerServiceTimeText}>下午</Text>
              </View>
            </View>

            <View style={{ width: serviceTimeLayoutWidth / 8 }}>
              <View style={Styles.serviceTimeHeader}>
                <Text style={Styles.volunteerServiceTimeText}>週一</Text>
              </View>

              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['1A'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['1A'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '1A': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '1A': 1,
                        });
                  }}
                />
              </View>

              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['1P'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['1P'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '1P': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '1P': 1,
                        });
                  }}
                />
              </View>
            </View>

            <View style={{ width: serviceTimeLayoutWidth / 8 }}>
              <View style={Styles.serviceTimeHeader}>
                <Text style={Styles.volunteerServiceTimeText}>週二</Text>
              </View>

              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['2A'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['2A'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '2A': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '2A': 1,
                        });
                  }}
                />
              </View>
              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['2P'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['2P'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '2P': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '2P': 1,
                        });
                  }}
                />
              </View>
            </View>

            <View style={{ width: serviceTimeLayoutWidth / 8 }}>
              <View style={Styles.serviceTimeHeader}>
                <Text style={Styles.volunteerServiceTimeText}>週三</Text>
              </View>

              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['3A'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['3A'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '3A': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '3A': 1,
                        });
                  }}
                />
              </View>
              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['3P'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['3P'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '3P': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '3P': 1,
                        });
                  }}
                />
              </View>
            </View>

            <View style={{ width: serviceTimeLayoutWidth / 8 }}>
              <View style={Styles.serviceTimeHeader}>
                <Text style={Styles.volunteerServiceTimeText}>週四</Text>
              </View>

              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['4A'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['4A'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '4A': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '4A': 1,
                        });
                  }}
                />
              </View>
              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['4P'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['4P'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '4P': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '4P': 1,
                        });
                  }}
                />
              </View>
            </View>

            <View style={{ width: serviceTimeLayoutWidth / 8 }}>
              <View style={Styles.serviceTimeHeader}>
                <Text style={Styles.volunteerServiceTimeText}>週五</Text>
              </View>

              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['5A'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['5A'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '5A': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '5A': 1,
                        });
                  }}
                />
              </View>
              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['5P'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['5P'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '5P': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '5P': 1,
                        });
                  }}
                />
              </View>
            </View>

            <View style={{ width: serviceTimeLayoutWidth / 8 }}>
              <View style={Styles.serviceTimeHeader}>
                <Text style={Styles.volunteerServiceTimeText}>週六</Text>
              </View>

              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['6A'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['6A'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '6A': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '6A': 1,
                        });
                  }}
                />
              </View>
              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['6P'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['6P'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '6P': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '6P': 1,
                        });
                  }}
                />
              </View>
            </View>

            <View style={{ width: serviceTimeLayoutWidth / 8 - 2 }}>
              <View style={Styles.serviceTimeHeader}>
                <Text style={Styles.volunteerServiceTimeText}>週日</Text>
              </View>

              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['7A'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['7A'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '7A': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '7A': 1,
                        });
                  }}
                />
              </View>

              <View style={Styles.volunteerServiceTimeBlockContainer}>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={volunteerServiceTime['7P'] === 1}
                  onValueChange={() => {
                    volunteerServiceTime['7P'] === 1
                      ? setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '7P': 0,
                        })
                      : setVolunteerServiceTime({
                          ...volunteerServiceTime,
                          '7P': 1,
                        });
                  }}
                />
              </View>
            </View>
          </View>

          <View style={Styles.separator} />
          <Text style={Styles.contentSubTitleText}>其他</Text>

          <View style={Styles.fieldContainer}>
            <View style={Styles.fieldHeaderContainer}>
              <Text style={Styles.fieldHeaderText}>個資聲明</Text>
              <Text style={Styles.fieldHeaderRequiredText}>(必填)</Text>
            </View>

            <View style={Styles.selectionContainer}>
              <View>
                <WishCheckBox
                  tintColors={{ true: '#00BAB3', false: '#00BAB3' }}
                  value={isAgreePrivacy}
                  onValueChange={() => {
                    setIsAgreePrivacy(!isAgreePrivacy);
                  }}
                />
              </View>

              <View style={Styles.privateInfoContainer}>
                <Text style={Styles.privateText1}>我已閱讀</Text>
                <TouchableOpacity onPress={handlePrivacyClick}>
                  <Text style={Styles.privateText2}> 個資聲明 </Text>
                </TouchableOpacity>
                <Text style={Styles.privateText3}>並同意該條款</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={sendVolunteerApply}
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
      </ScrollView>

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
          checkButtonEnable();
          modalizeRef.current?.close();
        }}
      >
        <View style={Styles.selectDateHeader}>
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
        <View style={Styles.dateSelectionContainer}>
          <DatePicker
            mode="date"
            date={date}
            onDateChange={date => setDate(date)}
            locale="zh-TW"
            androidVariant="nativeAndroid"
            fadeToColor="#0057B8"
            textColor="#000000"
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
      {isLoading ? <LoadingModal /> : null}
    </SafeAreaView>
  );
}
