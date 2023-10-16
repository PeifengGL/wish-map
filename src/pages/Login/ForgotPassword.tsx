import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import Styles from './index.style';
import ImageProvider from 'assets';
import { recoverCustomer } from 'api/Login';
import Toast from 'react-native-toast-message';

interface ForgotPassword {
  handleBackToLogin: () => void;
  handleSendEmail: () => void;
}

const ForgotPassword: React.FC<ForgotPassword> = ({
  handleBackToLogin,
  handleSendEmail,
}) => {
  const [email, setEmail] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const handleSendLink = () => {
    recoverCustomer(email).then(data => {
      if (
        data &&
        data.customerUserErrors &&
        data.customerUserErrors.length > 0
      ) {
        Toast.show({
          type: 'customToast',
          text1: data.customerUserErrors[0].message,
          position: 'bottom',
          bottomOffset: 28,
          autoHide: true,
          visibilityTime: 3000,
        });
      } else if (!data) {
        Toast.show({
          type: 'customToast',
          text1: '發生錯誤，或寄送超過上限次數',
          position: 'bottom',
          bottomOffset: 28,
          autoHide: true,
          visibilityTime: 3000,
        });
      } else {
        Toast.show({
          type: 'customToast',
          text1: '已寄送重置連結至信箱，即將跳轉至登入頁面',
          position: 'bottom',
          bottomOffset: 28,
          autoHide: true,
          visibilityTime: 3000,
        });
        setTimeout(() => {
          handleBackToLogin();
        }, 2000);
      }
    });
  };

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
  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = () => {
    const condition = !isEmailEmpty && !isEmailInvalid;
    setIsFormValid(condition);
  };

  const toastConfig = {
    customToast: ({ text1 }: any) => (
      <View style={Styles.toast}>
        <Text style={Styles.toastText}>{text1}</Text>
        <TouchableOpacity onPress={() => Toast.hide()}>
          <Image source={ImageProvider.Register.CloseToast} />
        </TouchableOpacity>
      </View>
    ),
  };

  return (
    <View>
      {/* 返回按鈕 */}
      <TouchableOpacity style={Styles.backButton} onPress={handleBackToLogin}>
        <Image source={ImageProvider.Login.Back} />
      </TouchableOpacity>

      {/* Title 標題 */}
      <Text style={Styles.title}>忘記密碼</Text>

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
          style={[Styles.inputLabel, isEmailInvalid && Styles.inputLabelError]}
        >
          電子信箱
        </Text>

        {!isEmailEmpty && !isEmailInvalid && (
          <TouchableOpacity style={Styles.inputButton} onPress={deleteEmail}>
            <Image source={ImageProvider.Login.Cancel} />
          </TouchableOpacity>
        )}

        {isEmailInvalid && (
          <TouchableOpacity style={Styles.inputButton}>
            <Image source={ImageProvider.Login.Error}></Image>
          </TouchableOpacity>
        )}

        {isEmailInvalid && (
          <Text style={Styles.inputErrorMessage}>請輸入正確的信箱格式</Text>
        )}
      </View>
      {/* END - Email 電子信箱 */}

      {/* SendEmail 寄送連結 */}
      <TouchableOpacity
        style={isFormValid ? Styles.button : Styles.buttonDisabled}
        onPress={handleSendLink}
        disabled={!isFormValid}
      >
        <Text
          style={isFormValid ? Styles.buttonText : Styles.buttonTextDisabled}
        >
          寄送重置密碼連結
        </Text>
      </TouchableOpacity>
      {/* END - SendEmail 寄送連結 */}
      <Toast config={toastConfig} />
    </View>
  );
};

export default ForgotPassword;
