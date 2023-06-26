// import React, { useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from 'types/router';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Styles from './index.style';
import DraggableCard from './Card';

import background from 'assets/images/profile/Image.png';
import settings from 'assets/images/profile/settings.png';

type ProfileStackParamList = {
  Default: {};
  Edit: {};
};
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

type PageRouterProps = {
  route: RouteProp<RootStackParamList, 'Profile'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

export default function ProfilePage({ navigation }: PageRouterProps) {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="Default" component={DefaultScreen} />
        <ProfileStack.Screen name="Edit" component={EditScreen} />
      </ProfileStack.Navigator>
    </>
  );
}

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'Default'>;
};

const DefaultScreen = ({ navigation }: ProfileScreenProps) => {
  return (
    <View style={Styles.container}>
      <Image source={background} style={Styles.background} resizeMode="cover" />
      <TouchableOpacity
        style={Styles.settingsButton}
        onPress={() => navigation.navigate('Edit', {})}
      >
        <Image source={settings} />
      </TouchableOpacity>
      <View style={Styles.card}>
        <DraggableCard />
      </View>

      {/* 
      <Background>
        <ProfileCard>
          {isGuest ? (
            <Button>login/sign up</Button>

          ): (
            <Edit/>
            <Info/>
          )} 
          <DonateRecord></DonateRecord>          
        </ProfileCard>
      </Background> 
      */}
    </View>
  );
};

const EditScreen = ({ navigation }: ProfileScreenProps) => {
  return (
    <View>
      {/* <Header>
        <BackButton />
        <Title />
        <DoneButton />
      </Header>
      <Background>
        <PictureEditButton />
        <EditName />
        <EditEmail />
        <EditNumber />
        <EditAddress />

        <EditPictureModal>
          <Album />
          <Camera />
          ( isPicture &&
          <Delete />)
        </EditPictureModal>
      </Background> */}

      <Text>這是編輯資料頁面</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Default', {})}>
        <Text>Back to Default</Text>
      </TouchableOpacity>
    </View>
  );
};
