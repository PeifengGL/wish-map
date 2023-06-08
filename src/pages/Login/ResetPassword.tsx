import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import ImageProvider from 'assets';
import Styles from './index.style';

interface ResetPasswordProps {
  handleBackToLogin: () => void;
  handleResetPassword: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  handleBackToLogin,
  handleResetPassword,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [isNewPasswordEmpty, setIsNewPasswordEmpty] = useState(true);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isNewPasswordInvalid, setIsNewPasswordInvalid] = useState(false);
  const [isNewPasswordHide, setIsNewPasswordHide] = useState(true);

  const handleNewPasswordOnChange = (text: string) => {
    setIsFormValid(false);
    setNewPassword(text);

    if (text.length > 0) {
      setIsNewPasswordEmpty(false);
    } else {
      setIsNewPasswordEmpty(true);
    }
    validateForm();
  };

  const newPasswordOnFocus = () => {
    setIsNewPasswordFocused(true);
    setIsNewPasswordInvalid(false);
  };

  const newPasswordOnBlur = () => {
    setIsNewPasswordFocused(false);
    checkNewPasswordValidity();
  };

  const checkNewPasswordValidity = () => {
    const regex = /^[a-zA-Z0-9]{8,12}$/;
    const condition = regex.test(newPassword);
    if (condition) {
      setIsNewPasswordInvalid(false);
    } else {
      setIsNewPasswordInvalid(true);
    }
    validateForm();
  };
  // newPassword

  // confirmPassword
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(true);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
    useState(false);
  const [isConfirmPasswordHide, setIsConfirmPasswordHide] = useState(true);

  const [isFormValid, setIsFormValid] = useState(false);

  const handleConfirmPasswordOnChange = (text: string) => {
    setIsFormValid(false);
    setConfirmPassword(text);
    if (text.length > 0) {
      setIsConfirmPasswordEmpty(false);
    } else {
      setIsConfirmPasswordEmpty(true);
    }
    validateForm();
  };

  const confirmPasswordOnFocus = () => {
    setIsConfirmPasswordFocused(true);
    setIsConfirmPasswordInvalid(false);
  };

  const confirmPasswordOnBlur = () => {
    setIsConfirmPasswordFocused(false);
    checkConfirmPasswordValidity();
  };

  const checkConfirmPasswordValidity = () => {
    const condition = confirmPassword === newPassword;
    if (condition) {
      setIsConfirmPasswordInvalid(false);
    } else {
      setIsConfirmPasswordInvalid(true);
    }
    validateForm();
  };

  const validateForm = () => {
    const condition =
      !isNewPasswordEmpty &&
      !isConfirmPasswordEmpty &&
      !isNewPasswordInvalid &&
      !isConfirmPasswordInvalid &&
      newPassword === confirmPassword;
    setIsFormValid(condition);
  };

  const resetPassword = () => {
    validateForm();
    if (isFormValid) {
      handleResetPassword();
    } else {
      return;
    }
  };

  return (
    <View>
      {/* 返回按鈕 */}
      <TouchableOpacity style={Styles.backButton} onPress={handleBackToLogin}>
        <Image source={ImageProvider.Login.Back} />
      </TouchableOpacity>

      {/* Title 標題 */}
      <Text style={Styles.title}>重置密碼</Text>

      {/* New Password 新密碼 */}
      <View style={Styles.inputGroup}>
        <TextInput
          style={[
            Styles.input,
            isNewPasswordFocused && Styles.inputFocused,
            isNewPasswordInvalid && Styles.inputError,
          ]}
          placeholder="請輸入新密碼"
          value={newPassword}
          onChangeText={text => handleNewPasswordOnChange(text)}
          onFocus={() => newPasswordOnFocus()}
          onBlur={() => newPasswordOnBlur()}
          onSubmitEditing={() => checkNewPasswordValidity()}
          secureTextEntry={isNewPasswordHide}
        />
        <Text
          style={[
            Styles.inputLabel,
            isNewPasswordInvalid && Styles.inputLabelError,
          ]}
        >
          新密碼
        </Text>

        {!isNewPasswordInvalid && (
          <TouchableOpacity
            style={Styles.inputButton}
            onPress={() => setIsNewPasswordHide(!isNewPasswordHide)}
          >
            <Image
              source={
                isNewPasswordHide
                  ? ImageProvider.Login.Hide
                  : ImageProvider.Login.Show
              }
            />
          </TouchableOpacity>
        )}

        {isNewPasswordInvalid && (
          <TouchableOpacity style={Styles.inputButton}>
            <Image source={ImageProvider.Login.Error}></Image>
          </TouchableOpacity>
        )}

        {isNewPasswordInvalid && (
          <Text style={Styles.inputErrorMessage}>請輸入 8 - 12 位密碼</Text>
        )}
      </View>
      {/* END - New Password 新密碼 */}

      {/* Confirm Password 確認密碼 */}
      <View style={Styles.inputGroup}>
        <TextInput
          style={[
            Styles.input,
            isConfirmPasswordFocused && Styles.inputFocused,
            isConfirmPasswordInvalid && Styles.inputError,
          ]}
          placeholder="請再次輸入與上方一致的新密碼"
          value={confirmPassword}
          onChangeText={text => handleConfirmPasswordOnChange(text)}
          onFocus={() => confirmPasswordOnFocus()}
          onBlur={() => confirmPasswordOnBlur()}
          onSubmitEditing={() => checkConfirmPasswordValidity()}
          secureTextEntry={isConfirmPasswordHide}
        />
        <Text
          style={[
            Styles.inputLabel,
            isConfirmPasswordInvalid && Styles.inputLabelError,
          ]}
        >
          再次輸入新密碼
        </Text>

        {!isConfirmPasswordInvalid && (
          <TouchableOpacity
            style={Styles.inputButton}
            onPress={() => setIsConfirmPasswordHide(!isConfirmPasswordHide)}
          >
            <Image
              source={
                isConfirmPasswordHide
                  ? ImageProvider.Login.Hide
                  : ImageProvider.Login.Show
              }
            />
          </TouchableOpacity>
        )}

        {isConfirmPasswordInvalid && (
          <TouchableOpacity style={Styles.inputButton}>
            <Image source={ImageProvider.Login.Error}></Image>
          </TouchableOpacity>
        )}

        {isConfirmPasswordInvalid && (
          <Text style={Styles.inputErrorMessage}>請檢查密碼是否輸入一致</Text>
        )}
      </View>
      {/* END - Confirm Password 確認密碼 */}

      {/* Reset Password 重置密碼 */}
      <TouchableOpacity
        style={isFormValid ? Styles.button : Styles.buttonDisabled}
        onPress={resetPassword}
        disabled={!isFormValid}
      >
        <Text
          style={isFormValid ? Styles.buttonText : Styles.buttonTextDisabled}
        >
          重置密碼
        </Text>
      </TouchableOpacity>
      {/* END - Reset Password 重置密碼 */}
    </View>
  );
};

export default ResetPassword;
