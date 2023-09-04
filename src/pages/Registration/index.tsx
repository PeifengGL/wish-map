import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from 'types/router';
import ImageProvider from 'assets';
import Styles from './index.style';
import DataShareService from 'service';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import PrivacyContent, { PrivacyHeader } from 'components/PrivacyContent';
import generateUUID from 'util/UUIDGenerator';
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';
import { UserProfileType } from 'types/profile';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Registration'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Registration'>;
};

export default function RegistrationPage({
  route,
  navigation,
}: PageRouterProps) {
  const dimensionsHeight = Dimensions.get('window').height;
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // username
  const [username, setUsername] = useState('');
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(true);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const privacyModalizeRef = useRef<Modalize>(null);
  const handleUsernameOnChange = (text: string) => {
    setUsername(text);

    // check to show delete button
    if (text.length > 0) {
      setIsUsernameEmpty(false);
    } else {
      setIsUsernameEmpty(true);
    }
  };
  const usernameOnFocus = () => {
    setIsUsernameFocused(true);
    setIsUsernameInvalid(false);
  };
  const usernameOnBlur = () => {
    setIsUsernameFocused(false);
    checkUsernameValidity();
  };
  const checkUsernameValidity = () => {
    // Only allows letters, numbers, and underscores. 只允許字母、數字和底線
    const regex = /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,16}$/;
    const condition1 = regex.test(username);

    // Length must be between 4 and 16 characters. 長度必須介於 4 到 16 個字元之間
    const condition2 = username.length <= 16;

    if (condition1 && condition2) {
      setIsUsernameInvalid(false);
    } else {
      setIsUsernameInvalid(true);
    }
    validateForm();
  };
  const deleteUsername = () => {
    setUsername('');
    setIsUsernameEmpty(true);
    setIsUsernameInvalid(false);
    setIsFormValid(false);
  };
  // username

  // email
  const [email, setEmail] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const handleEmailOnChange = (text: string) => {
    setEmail(text);
    // check to show delete button
    if (text.length > 0) {
      setIsEmailEmpty(false);
    } else {
      setIsEmailEmpty(true);
    }
  };
  const emailOnFocus = () => {
    setIsEmailFocused(true);
    setIsEmailInvalid(false);
  };
  const emailOnBlur = () => {
    setIsEmailFocused(false);
    checkEmailValidity();
  };
  const checkEmailValidity = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const condition = regex.test(email);
    if (condition) {
      setIsEmailInvalid(false);
    } else {
      setIsEmailInvalid(true);
    }
    validateForm();
  };
  const deleteEmail = () => {
    setEmail('');
    setIsEmailEmpty(true);
    setIsEmailInvalid(false);
    setIsFormValid(false);
  };
  // email

  // password
  const [password, setPassword] = useState('');
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  const handlePasswordOnChange = (text: string) => {
    setPassword(text);
    // check to show delete button
    if (text.length > 0) {
      setIsPasswordEmpty(false);
    } else {
      setIsPasswordEmpty(true);
    }
  };

  const passwordOnFocus = () => {
    setIsPasswordFocused(true);
    setIsPasswordInvalid(false);
  };

  const passwordOnBlur = () => {
    setIsPasswordFocused(false);
    checkPasswordValidity();
  };

  const checkPasswordValidity = () => {
    const regex = /^[a-zA-Z0-9]{8,12}$/;
    const condition = regex.test(password);
    if (condition) {
      setIsPasswordInvalid(false);
    } else {
      setIsPasswordInvalid(true);
    }
    validateForm();
  };
  // password

  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = () => {
    const condition =
      !isUsernameEmpty &&
      !isEmailEmpty &&
      !isPasswordEmpty &&
      !isUsernameInvalid &&
      !isEmailInvalid &&
      !isPasswordInvalid;
    setIsFormValid(condition);
  };

  const handleRegister = () => {
    // 在此處理註冊邏輯
    // 可以使用 username、email 和 password 狀態
    if (!isFormValid) {
      return;
    }

    setIsRegistered(true);
    const userProfile: UserProfileType = {
      userName: username,
      userEmail: email,
      userPhone: '',
      userAddress: '',
      userUID: generateUUID(),
      userType: 'member',
      userPassword: password,
    };
    console.log('userProfile', userProfile);
    LocalStorage.setData(LocalStorageKeys.UserProfileKey, userProfile).finally(
      () => {
        console.log('set user profile to local storage success');
        setTimeout(() => {}, 2000);
        DataShareService.setUserProfile(userProfile);
      },
    );
  };

  const handlePrivacyPolicy = () => {
    privacyModalizeRef.current?.open();
  };

  const handleTerms = () => {};

  const handleLogin = () => {
    navigation.navigate('Login', {});
  };

  const handleGuestClick = () => {
    const userProfile: UserProfileType = {
      userName: '',
      userEmail: '',
      userPhone: '',
      userAddress: '',
      userUID: '',
      userType: 'guest',
      userPassword: '',
    };
    console.log('userProfile', userProfile);
    LocalStorage.setData(LocalStorageKeys.UserProfileKey, userProfile).then(
      () => DataShareService.setUserProfile(userProfile),
    );
  };

  const handlePrivacyClose = () => {
    privacyModalizeRef.current?.close();
    setModalIsOpen(false);
  };

  const toastConfig = {
    customToast: ({ text1 }: any) => (
      <View
        style={{
          backgroundColor: 'rgba(50, 47, 53, 0.9)',
          width: '90%',
          alignSelf: 'center',
          borderRadius: 4,
          paddingHorizontal: 16,
          borderLeftColor: 'rgba(50, 47, 53, 0.9)',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 15, color: '#fff', marginVertical: 12 }}>
          {text1}
        </Text>
        <TouchableOpacity onPress={() => Toast.hide()}>
          <Image source={ImageProvider.Register.CloseToast} />
        </TouchableOpacity>
      </View>
    ),
  };

  useEffect(() => {
    console.log('route.params', route.params);
    if (route.params?.isDeleteAccount === true) {
      Toast.show({
        type: 'customToast',
        text1: '已永久刪除帳號',
        position: 'bottom',
        bottomOffset: 28,
        autoHide: true,
        visibilityTime: 3000,
      });
      navigation.setParams({ isDeleteAccount: false, isLogout: false });
    }

    if (route.params?.isLogout === true) {
      Toast.show({
        type: 'customToast',
        text1: '已登出帳號',
        position: 'bottom',
        bottomOffset: 28,
        autoHide: true,
        visibilityTime: 3000,
      });
      navigation.setParams({ isDeleteAccount: false, isLogout: false });
    }
  }, [route.params]);

  return (
    <View style={Styles.container}>
      <StatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
        translucent={false}
      />
      <ImageBackground
        source={ImageProvider.Register.Background}
        style={Styles.background}
        resizeMode="cover"
      >
        {/* 按下註冊後，顯示 Loading spinner */}
        {isRegistered ? (
          <View>
            <Text style={Styles.welcomeText}>歡迎加入喜願 !</Text>
            <Image
              source={ImageProvider.Register.Welcome}
              style={Styles.welcomeImage}
            />
            <Text style={Styles.loadingText}>請稍等，正在幫您跳轉至首頁</Text>
            <ActivityIndicator size="large" color="#0057B8" />
          </View>
        ) : (
          <View>
            {/* Guest 訪客 */}
            <TouchableOpacity
              onPress={handleGuestClick}
              style={Styles.guestButton}
            >
              <Text style={Styles.guestButtonText}>訪客</Text>
              <Image
                source={ImageProvider.Register.Arrow}
                style={Styles.guestButtonArrow}
              />
            </TouchableOpacity>

            {/* Title 標題 */}
            <Text style={Styles.title}>註冊 Wish Map</Text>

            {/* Username 使用者名稱 */}
            <View style={Styles.inputGroup}>
              <TextInput
                style={[
                  Styles.input,
                ]}
                placeholder="請輸入使用者名稱"
                value={username}
                onChangeText={text => handleUsernameOnChange(text)}
                onFocus={() => usernameOnFocus()}
                onBlur={() => usernameOnBlur()}
                onSubmitEditing={() => checkUsernameValidity()}
              />
              <Text
                style={[
                  Styles.inputLabel,
                  isUsernameInvalid && Styles.inputLabelError,
                ]}
              >
                使用者名稱
              </Text>

              {!isUsernameEmpty && !isUsernameInvalid && (
                <TouchableOpacity
                  style={Styles.inputButton}
                  onPress={deleteUsername}
                >
                  <Image source={ImageProvider.Register.Cancel} />
                </TouchableOpacity>
              )}

              {isUsernameInvalid && (
                <TouchableOpacity style={Styles.inputButton}>
                  <Image source={ImageProvider.Register.Error}></Image>
                </TouchableOpacity>
              )}

              {isUsernameInvalid && (
                <Text style={Styles.inputErrorMessage}>
                  請輸入 1 - 16 位名稱
                </Text>
              )}
            </View>
            {/* END - Username 使用者名稱 */}

            {/* Email 電子信箱 */}
            <View style={Styles.inputGroup}>
              <TextInput
                style={[
                  Styles.input,
                  isEmailFocused && Styles.inputFocused,
                  isEmailInvalid && Styles.inputError,
                ]}
                placeholder="請輸入電子信箱"
                value={email}
                onChangeText={text => handleEmailOnChange(text)}
                onFocus={() => emailOnFocus()}
                onBlur={() => emailOnBlur()}
                onSubmitEditing={() => checkEmailValidity()}
              />
              <Text
                style={[
                  Styles.inputLabel,
                  isEmailInvalid && Styles.inputLabelError,
                ]}
              >
                電子信箱
              </Text>

              {!isEmailEmpty && !isEmailInvalid && (
                <TouchableOpacity
                  style={Styles.inputButton}
                  onPress={deleteEmail}
                >
                  <Image source={ImageProvider.Register.Cancel} />
                </TouchableOpacity>
              )}

              {isEmailInvalid && (
                <TouchableOpacity style={Styles.inputButton}>
                  <Image source={ImageProvider.Register.Error}></Image>
                </TouchableOpacity>
              )}

              {isEmailInvalid && (
                <Text style={Styles.inputErrorMessage}>請輸入正確信箱格式</Text>
              )}
            </View>
            {/* END - Email 電子信箱 */}

            {/* Password 密碼 */}
            <View style={Styles.inputGroup}>
              <TextInput
                style={[
                  Styles.input,
                  isPasswordFocused && Styles.inputFocused,
                  isPasswordInvalid && Styles.inputError,
                ]}
                placeholder="請輸入 8 - 12 位密碼"
                value={password}
                onChangeText={text => handlePasswordOnChange(text)}
                onFocus={() => passwordOnFocus()}
                onBlur={() => passwordOnBlur()}
                onSubmitEditing={() => checkPasswordValidity()}
                secureTextEntry={isPasswordHide}
              />
              <Text
                style={[
                  Styles.inputLabel,
                  isPasswordInvalid && Styles.inputLabelError,
                ]}
              >
                密碼
              </Text>

              {!isPasswordInvalid && (
                <TouchableOpacity
                  style={Styles.inputButton}
                  onPress={() => setIsPasswordHide(!isPasswordHide)}
                >
                  <Image
                    source={
                      isPasswordHide
                        ? ImageProvider.Register.Hide
                        : ImageProvider.Register.Show
                    }
                  />
                </TouchableOpacity>
              )}

              {isPasswordInvalid && (
                <TouchableOpacity style={Styles.inputButton}>
                  <Image source={ImageProvider.Register.Error}></Image>
                </TouchableOpacity>
              )}

              {isPasswordInvalid && (
                <Text style={Styles.inputErrorMessage}>請輸入8 - 12位密碼</Text>
              )}
            </View>
            {/* END - Password 密碼 */}

            {/* PP & TOU 隱私政策和使用條款 */}
            <View style={Styles.confirmContainer}>
              <Text style={Styles.confirm}>註冊即表示您同意我們的</Text>
              <TouchableOpacity onPress={handlePrivacyPolicy}>
                <Text style={Styles.link}>隱私政策和使用條款</Text>
              </TouchableOpacity>
            </View>

            {/* Create Account 創建帳號 */}
            <TouchableOpacity
              style={isFormValid ? Styles.button : Styles.buttonDisabled}
              onPress={handleRegister}
              disabled={!isFormValid}
            >
              <Text
                style={
                  isFormValid ? Styles.buttonText : Styles.buttonTextDisabled
                }
              >
                創建帳號
              </Text>
            </TouchableOpacity>

            {/* Login 登入 */}
            <View style={Styles.loginContainer}>
              <Text style={Styles.loginText}>已經有帳號了嗎 ? </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={Styles.link}>按此登入</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
      <Portal>
        <Modalize
          ref={privacyModalizeRef}
          modalHeight={dimensionsHeight}
          onClosed={() => setModalIsOpen(false)}
          HeaderComponent={PrivacyHeader(handlePrivacyClose)}
        >
          <PrivacyContent />
        </Modalize>
      </Portal>
      <Toast config={toastConfig} />
    </View>
  );
}
