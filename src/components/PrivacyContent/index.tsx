import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import ImageProvider from 'assets';
import Styles from './index.style';

const PrivacyContent = () => {
  return (
    <View>
      <View style={Styles.privacyContentContainer}>
        <Text style={Styles.privacyBlockTitle}>隱私權保護政策</Text>
        <Text style={Styles.privacyBlockContent}>
          親愛的朋友，感謝您蒞臨本網站，本網站是由「中華民國喜願協會」(下稱喜願協會)所經營，我們非常重視用戶的隱私權並予以保護，為了幫助您了解您的權益，請您詳細閱讀以下資訊，以了解本網站如何蒐集、應用及保護您所提供的用戶個人資料。當您提供個人資料予本網站，我們將視為您已經同意本網站隱私權保護聲明之內容。
        </Text>
        <Text style={Styles.privacyBlockTitle}>非個人資料的蒐集</Text>
        <Text style={Styles.privacyBlockContent}>
          喜願協會的網站管理會自動從您的瀏覽器上，接收並紀錄伺服器數值，包括互聯網協定位置(IP
          Address)，cookie中的資料以及您要求取用的網頁記錄，但相關資料並不會向第三者透漏。
        </Text>
        <Text style={Styles.privacyBlockTitle}>個人資料</Text>
        <Text style={Styles.privacyBlockContent}>
          為了提供您更佳的服務，方便與您連絡，當您參與本網站所提供的活動時，我們會要求您提供個人資料，包括登入名稱、密碼、姓名、性別、電子信箱及聯絡電話等等。而本會將透過電子信箱或是電話聯絡您，並提供您本會的最新資訊，但我們不會在未獲得用戶同意下向第三者出售、出借、交換您的個人資料。惟為配合司法機關偵查犯罪或行政機關職務調查所需，我們基於公益考量，將配合提供相關資料。
        </Text>

        <Text style={Styles.privacyBlockTitle}>安全保護</Text>
        <Text style={Styles.privacyBlockContent}>
          為防止未授權的登入、保持數據的安全性以及確保資料得到正確的運用，本會將盡力以合理的技術和程序去保障及維護本網站收集的資料安全性。
        </Text>

        <Text style={Styles.privacyBlockTitle}>維護資料的正確性</Text>
        <Text style={Styles.privacyBlockContent}>
          本會將主動不定時更新錯誤或過時的個人資料，以維持本會管理運作。
        </Text>

        <Text style={Styles.privacyBlockTitle}>用戶識別功能</Text>
        <Text style={Styles.privacyBlockContent}>
          Cookie是網站伺服器用來和使用者瀏覽器進行溝通的一種技術，從主機電腦傳送到您的瀏覽器並保存在電腦硬中的少量資料，當中包括獨特的識別資料。如您不希望本網站存取您的cookie資料，可以改變您的瀏覽器設置，拒絕所有傳送。
        </Text>

        <Text style={Styles.privacyBlockTitle}>隱私條例的更改</Text>
        <Text style={Styles.privacyBlockContent}>
          喜願協會會不定時的修訂本政策，如果本會在使用個人資料的規定上作出重大修改，我們會在網頁上公布新修正之內容，供您閱覽。
          查詢與建議
          如您有任何疑問或建議，歡迎來信至mawtpe@ms24.hinet.net與我們連絡，我們將盡速為您處理。
        </Text>

        <Text style={Styles.privacyBlockTitle}>
          MAKE-A-WISH® TAIWAN - PRIVACY POLICY
        </Text>
        <Text style={Styles.privacyBlockContent}>
          Dear friends, thanks for coming to our website. This website is
          managed by Make-A-Wish Taiwan. We emphasis the privacy of our users
          and will protect it, for helping you to understand your rights, please
          read detailed the below information.When you provide your individual
          information to this website, we think that you agree to the terms of
          this Privacy Policy of this website.
        </Text>

        <Text style={Styles.privacyBlockTitle}>
          Non-Personal Information Collected Automatically
        </Text>
        <Text style={Styles.privacyBlockContent}>
          Make-A-Wish® Taiwan automatically receives and records information on
          our server logs from your browser, including your IP address, cookie
          information, and the page you request. But these statistics are not
          shared with third-parties and do not include no personally identifying
          information
        </Text>

        <Text style={Styles.privacyBlockTitle}>Personal Information</Text>
        <Text style={Styles.privacyBlockContent}>
          In order to respond to your enquiries or manage future interactive
          user functions it may be necessary to ask for personal information
          such as your name, address, e-mail address and telephone number. We
          may use this information to respond to your requests or to contact you
          via mail, e-mail or phone to inform you of new products, services or
          promotions that we offer. However, unless compelled by applicable
          legislation, we will not sale、lend and exchange your personal data to
          a third party without your permission, except as necessary to process
          your enquiry or fulfill your requests. However, considering the public
          interest, we will provide your personal data and other relevant
          information as requested to the judicial and/or administrative
          authorities, in order to cooperate with the investigations performed
          by such authorities.
        </Text>

        <Text style={Styles.privacyBlockTitle}>Security</Text>
        <Text style={Styles.privacyBlockContent}>
          Please note that, although no system of technology is completely
          infallible, Make-A-Wish® Taiwan has endeavored to take appropriate
          measures to prevent risks of unauthorized access to or improper use of
          your personal information.
        </Text>

        <Text style={Styles.privacyBlockTitle}>Accuracy of Collected Data</Text>
        <Text style={Styles.privacyBlockContent}>
          Make-A-Wish® Taiwan will, on its own initiative or at your request,
          update or erase any erroneous or outdated personal data retained in
          connection with the operation of this Site.
        </Text>

        <Text style={Styles.privacyBlockTitle}>Visitor Identification</Text>
        <Text style={Styles.privacyBlockContent}>
          From time to time 'cookies' may be placed on your computer to allow us
          to identify you. This allows us to personalize the site for the user
          and view how and when specific users visit the site, helping us to
          improve the site. The use of cookies is an industry standard. Cookies
          are stored on your computer and used only to view information on your
          hard drive that was put there by a cookie from this Site. If you do
          not wish to receive cookies you may set your web browser to prevent
          them.
        </Text>

        <Text style={Styles.privacyBlockTitle}>
          Changes to this Privacy Policy
        </Text>
        <Text style={Styles.privacyBlockContent}>
          Make-A-Wish Taiwan will update this policy irregularly. If we make
          significant revision on rules of using the personal information, we
          will announce the revision on our website for your reference.
        </Text>

        <Text style={Styles.privacyBlockTitle}>Questions and suggestions</Text>
        <Text style={Styles.privacyBlockContent}>
          If you have questions or suggestions, please contact us at
          mawtpe@ms24.hinet.net .We will deal with it for you as soon as
          possible
        </Text>
      </View>
    </View>
  );
};

export default PrivacyContent;

export const PrivacyHeader = (handlePrivacyClose: () => void) => {
  return (
    <View style={Styles.privacyContentHeader}>
      <Text style={Styles.privacyContentHeaderTitle}>個資聲明 & 隱私政策</Text>
      <TouchableOpacity
        style={Styles.closePrivacyButton}
        onPress={handlePrivacyClose}
      >
        <Image
          source={ImageProvider.WishMap.ClosePrivacyIcon}
          style={Styles.closePrivacyIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
