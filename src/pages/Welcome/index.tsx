import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { RootStackParamList } from 'types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { welcome_data, WelcomeDataType } from 'shared/welcome.data';
import Styles from './index.style';
import AppIntroSlider from 'react-native-app-intro-slider';

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Welcome'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

export default function WelcomePage({ navigation }: PageRouterProps) {
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const renderSignInOrSingUp = () => {
    return (
      <View style={Styles.signInOrSingUpContainer}>
        <TouchableOpacity
          style={Styles.signInOrSingUpButton}
          onPress={handleButtonClick}
        >
          <Text style={Styles.signInOrSingUpButtonText}>註冊/登入</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }: { item: WelcomeDataType }) => {
    return (
      <SafeAreaView style={Styles.safeArea}>
        <ImageBackground
          source={item.image}
          style={[Styles.introBackgroundImageStyle]}
        >
          <Text style={[Styles.introText, { color: item.fontColor }]}>
            {item.text}
          </Text>
        </ImageBackground>
      </SafeAreaView>
    );
  };

  const handleButtonClick = () => {
    navigation.navigate('Registration', {});
  };

  return (
    <>
      <AppIntroSlider
        renderItem={renderItem}
        data={welcome_data}
        showNextButton={false}
        showSkipButton={true}
        bottomButton
        renderSkipButton={renderSignInOrSingUp}
        renderDoneButton={renderSignInOrSingUp}
      />
    </>
  );
}
