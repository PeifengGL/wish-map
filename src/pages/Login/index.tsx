import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootStackParamList } from 'types/router';
import Styles from './index.style';
import ImageProvider from 'assets';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import DataShareService from 'service';
import LocalStorage, { LocalStorageKeys } from 'util/LocalStorage';

import { createCustomerAccessToken, getCustomerInfo } from 'api/Login';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Login'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function Login({ navigation }: PageRouterProps) {
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

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
    const regex = /^[a-zA-Z0-9]{8,15}$/;
    const condition = regex.test(password);
    if (condition) {
      setIsPasswordInvalid(false);
    } else {
      setIsPasswordInvalid(true);
    }
    validateForm();
  };
  // password

  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = () => {
    const condition =
      !isEmailEmpty &&
      !isPasswordEmpty &&
      !isEmailInvalid &&
      !isPasswordInvalid;
    setIsFormValid(condition);
  };

  const handlePrivacyPolicy = () => {};

  const handleTerms = () => {};

  // useEffect(() => {
  //   setInterval(() => {
  //     if (isLogin) {
  //       DataShareService.setIdentityType('member');
  //     }
  //   }, 2000);
  // }, [isLogin]);

  const [isDefault, setIsDefault] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isResetPasswordDone, setIsResetPasswordDone] = useState(false);

  type UserProfileType = {
    userName: string;
    userEmail: string;
    userPhone: string;
    userAddress: string;
    userUID: string;
    userType: '' | 'member' | 'guest';
    userPassword: string;
  };

  const goToProfile = async () => {
    // const data = await getCustomerInfo(token);
    const userProfile: UserProfileType = {
      userName: '',
      userEmail: '',
      userPhone: '',
      userAddress: '',
      userUID: '',
      userType: 'member',
      userPassword: '',
    };
    LocalStorage.setData(LocalStorageKeys.UserProfileKey, userProfile).then(
      () => {
        DataShareService.setUserProfile(userProfile);
      },
    );
  };

  const handleLogin = async () => {
    if (!isFormValid) {
      return;
    }
    setIsLoginFailed(false);
    const accessToken = await createCustomerAccessToken(email, password);
    if (accessToken && accessToken.customerAccessToken !== null) {
      setAllStateFalse();
      setIsLogin(true);
      setIsLoginFailed(false);
      const token = accessToken.customerAccessToken.accessToken;
      await LocalStorage.setData(
        LocalStorageKeys.CustomerAccessTokenKey,
        token,
      );
      goToProfile();
    } else {
      console.log('登入失敗');
      setIsLoginFailed(true);
    }

    return;
  };

  const handleForgotPassword = () => {
    setAllStateFalse();
    setIsForgotPassword(true);
  };

  const backToDefault = () => {
    setAllStateFalse();
    setIsDefault(true);
  };

  const goToResetPassword = () => {
    setAllStateFalse();
    setIsResetPassword(true);
  };

  const resetPassword = () => {
    setAllStateFalse();
    setIsResetPasswordDone(true);
  };

  const setAllStateFalse = () => {
    setIsDefault(false);
    setIsLogin(false);
    setIsForgotPassword(false);
    setIsResetPassword(false);
  };

  const handleBackClick = () => {
    navigation.goBack();
  };

  return (
    <View style={Styles.container}>
      <ImageBackground
        source={ImageProvider.Login.Background}
        style={Styles.background}
        resizeMode="cover"
      >
        {/* 按下登入後，顯示 Loading spinner */}
        {isDefault ? (
          <View>
            {/* 返回按鈕 */}
            <TouchableOpacity
              style={Styles.backButton}
              onPress={handleBackClick}
            >
              <Image source={ImageProvider.Login.Back} />
            </TouchableOpacity>

            {/* Title 標題 */}
            <Text style={Styles.title}>登入 Wish Map</Text>

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
                  <Image source={ImageProvider.Login.Cancel} />
                </TouchableOpacity>
              )}

              {isEmailInvalid && (
                <TouchableOpacity style={Styles.inputButton}>
                  <Image source={ImageProvider.Login.Error}></Image>
                </TouchableOpacity>
              )}

              {isEmailInvalid && (
                <Text style={Styles.inputErrorMessage}>
                  請輸入正確的信箱格式
                </Text>
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
                placeholder="請輸入密碼"
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
                        ? ImageProvider.Login.Hide
                        : ImageProvider.Login.Show
                    }
                  />
                </TouchableOpacity>
              )}

              {isPasswordInvalid && (
                <TouchableOpacity style={Styles.inputButton}>
                  <Image source={ImageProvider.Login.Error}></Image>
                </TouchableOpacity>
              )}

              {isPasswordInvalid && (
                <Text style={Styles.inputErrorMessage}>請輸入正確的密碼</Text>
              )}
            </View>
            {/* END - Password 密碼 */}

            {isLoginFailed && (
              <Text style={Styles.loginFailedMessage}>
                電子信箱或密碼輸入錯誤，登入失敗
              </Text>
            )}

            {/* Login 登入 */}
            <TouchableOpacity
              style={isFormValid ? Styles.button : Styles.buttonDisabled}
              onPress={handleLogin}
              disabled={!isFormValid}
            >
              <Text
                style={
                  isFormValid ? Styles.buttonText : Styles.buttonTextDisabled
                }
              >
                登入
              </Text>
            </TouchableOpacity>

            {/* Forgot Password 忘記密碼 */}
            <TouchableOpacity
              style={Styles.forgotPasswordButton}
              onPress={handleForgotPassword}
            >
              <Text style={Styles.link}>忘記密碼？</Text>
            </TouchableOpacity>
          </View>
        ) : isLogin ? (
          <View>
            <Text style={Styles.welcomeText}>歡迎回來喜願 ！</Text>
            <Image
              source={ImageProvider.Login.Welcome}
              style={Styles.welcomeImage}
            />
            <Text style={Styles.loadingText}>請稍等，正在幫您跳轉至首頁</Text>
            <ActivityIndicator size="large" color="#0057B8" />
          </View>
        ) : isForgotPassword ? (
          <ForgotPassword
            handleBackToLogin={backToDefault}
            handleSendEmail={goToResetPassword}
          />
        ) : isResetPassword ? (
          <ResetPassword
            handleBackToLogin={backToDefault}
            handleResetPassword={resetPassword}
          />
        ) : isResetPasswordDone ? (
          <View>
            <Image
              source={ImageProvider.Login.Success}
              style={Styles.successImage}
            />
            <Text style={Styles.successText}>重置密碼成功 ！</Text>
            <Text style={Styles.loadingText}>請稍等，正在幫您跳轉至首頁</Text>
            <ActivityIndicator size="large" color="#0057B8" />
          </View>
        ) : (
          <View />
        )}
      </ImageBackground>
    </View>
  );
}
