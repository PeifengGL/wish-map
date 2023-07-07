import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ToastAndroid,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { SettingStackParamList } from 'types/router';
import FocusAwareStatusBar from 'util/StatusBarAdapter';
import ImageProvider from 'assets';
import { Subscription } from 'rxjs';
import DataShareService from 'service';
import { UserProfileType } from 'types/profile';
import Styles from './index.style';
import WishRadioButton from 'components/WishRadioButton';

type PageRouterProps = {
  route: RouteProp<SettingStackParamList, 'Fqa'>;
  navigation: NativeStackNavigationProp<SettingStackParamList, 'Fqa'>;
};

export default function FqaPage({ navigation }: PageRouterProps) {
  const renderDeleteAccountReasonGoBack = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ImageProvider.Profile.ProfileGoBackIcon} />
      </TouchableOpacity>
    );
  };

  const renderFqaContent = (title: string, content: string) => {
    return (
      <View
        style={{
          borderColor: '#0057B880',
          borderWidth: 1,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 8,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            marginVertical: 12,
            color: '#0057B8',
            fontSize: 16,
            fontFamily: 'Lato',
            fontWeight: '500',
          }}
        >
          {title}
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: '#CCCCCC',
            width: '100%',
            marginVertical: 8,
          }}
        />

        <Text
          style={{
            color: '#2D2D2D',
            fontSize: 12,
            fontFamily: 'Lato',
            fontWeight: '400',
          }}
        >
          {content}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <FocusAwareStatusBar
        backgroundColor="#EBF1F9"
        barStyle="dark-content"
        translucent={false}
      />

      <View style={Styles.headerContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginVertical: 16,
          }}
        >
          <View style={{ position: 'absolute', left: 0, top: 0 }}>
            {renderDeleteAccountReasonGoBack()}
          </View>

          <Text
            style={{
              marginBottom: 14,
              marginTop: 10,
              color: '#75787B',
              fontSize: 16,
              fontWeight: '500',
              fontFamily: 'Lato',
            }}
          >
            常見問題
          </Text>
          <View />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          {renderFqaContent(
            'Q1. 喜願的服務內容為何',
            '喜願協會為台灣地區3歲以上，未滿18歲的重症病童實現心中最大的願望，期待藉由夢想實現的過程，讓重症病童獲得更多快樂、希望與勇氣，創造翻轉生命的力量！經由喜願協助實現願望的孩子，我們稱之為「喜願兒」。',
          )}
          {renderFqaContent(
            'Q2. 「喜願兒」和「喜憨兒」一樣嗎？',
            '「喜願兒」和「喜憨兒」是不一樣的。\n・喜願兒：在喜願協會協助下，完成其最大心願之3歲以上未滿18歲之重症病童，稱為「喜願兒」。\n・喜憨兒：經由「喜憨兒基金會」培養其具備專長的心智障礙者。',
          )}
          {renderFqaContent(
            'Q3. 誰可以向喜願協會申請願望？',
            '凡居住在台灣地區，年紀為3歲以上未滿18歲的重症病童，並且未曾接受過國內外任何圓夢團體或單位協助圓夢事宜者，皆可向喜願協會提出申請。',
          )}
          {renderFqaContent(
            'Q4. 如何申請願望（轉介）？',
            '舉凡重症病童本人、家長、醫院工作人員等，均可向本會提出轉介申請。',
          )}
          {renderFqaContent(
            'Q5. 一個孩子可以申請協助幾個願望',
            '每位符合「喜願重症疾病標準」的病童，都只有「一次」由喜願協會協助圓夢的機會。我們看到許多圓夢之後的喜願兒對於追求夢想更加有信心且積極，往往在完成治療，身體恢復健康之後，可以靠自己的力量去達成更多願望。',
          )}
          {renderFqaContent(
            'Q6. 願望有限制嗎？',
            '喜願協會為台灣地區3歲以上，未滿願望是充滿想像力和創意的，每位病童的願望都是獨特且珍貴。圓夢的執行需優先考量病童的身心狀況，以安全和舒適為前提；同時亦須顧及符合社會資源運用之原則。\n部分心願仍會受限於病童的療程，與身體狀況不足以負荷其願望執行，或者病童的心願涉及專業醫療部分（例如：移植配對、疾病快點好..等）、危險物品的使用、金錢或有價資產的提供、或違反法律規定等，協會則無法協助其實現願望。\n願望是充滿想像力和創意的，每位病童的願望都是獨特且珍貴。圓夢的執行需優先考量病童的身心狀況，以安全和舒適為前提；同時亦須顧及符合社會資源運用之原則。\n部分心願仍會受限於病童的療程，與身體狀況不足以負荷其願望執行，或者病童的心願涉及專業醫療部分（例如：移植配對、疾病快點好..等）、危險物品的使用、金錢或有價資產的提供、或違反法律規定等，協會則無法協助其實現願望。\n每一個願望皆經過縝密的個案訪視、研討會議，詳細討論每一個心願細節與病童之間的關聯，依據病童所表達的願望期待，來設計個別化圓夢計畫。',
          )}
          {renderFqaContent(
            'Q7. 家庭需要支付圓夢費用嗎？',
            '喜願協會將負擔喜願兒及父母、手足之圓夢相關費用，喜願家庭無須支付任何費用。但心願為出國之願望者，若參與的手足已滿18歲，其機票、護照、簽證與住宿、國內大眾運輸交通等費用需由家人自行負擔。',
          )}
          {renderFqaContent(
            'Q8. 家庭的經濟狀況是否影響孩子能圓夢？',
            '喜願協會所服務的對象，不分種族、宗教、政治立場、信仰、性別或經濟狀況。只要重症病童有想要完成的願望，我們都將予以協助。\n當然，我們基於社會資源運用之適當性來衡量，鼓勵家長若能力可及，則自行完成病童的願望，讓喜願協助病童完成家人無法協助之願望。',
          )}
          {renderFqaContent(
            'Q9. 喜願協會的資金來源為何？',
            '喜願協會的資金來自個人、企業或社團組織的捐款。在社會大眾的愛心捐贈下，協會盡可能地減少貨品購置與服務需求方面的支出，節省每一筆開銷，謹慎地運用每一筆捐款，將大部分的款項運作於實現更多重症病童願望的圓夢基金。',
          )}
          {renderFqaContent(
            'Q10. 我可以向喜願協會申請金錢援助或急難助金等相關服務嗎？',
            '很抱歉，喜願協會沒有提供相關服務。',
          )}
          {renderFqaContent(
            'Q11. 我可以如何協助重症病童圓夢？',
            '感謝您的溫暖支持，邀請您隨喜行善，一同為更多重症病童實現心中最大願望！\n一、您可以加入喜願志工服務：（志工分為以下三種服務方式）\n(a) 會務志工：每週至少一次撥出固定服務時間，協助辦公室行政上的工作。\n(b) 活動志工：協助支援宣導、專案、募款活動進行。\n(c) 個案志工：醫院關懷探訪、個案之院訪或家訪、圓夢活動執行等。須接受喜願志工訓練後方可參與。\n請參考官網之「贊助喜願-加入志工」。\n二、隨喜捐款或物資捐贈：\n請參考官網之「贊助喜願-隨喜捐款」或「贊助喜願-捐贈物資」。\n三、您可以贊助指定個案：\n喜願的圓夢工作是終年無休、持續進行的，您可以至喜願網站「贊助喜願-贊助願望」了解近期確定願望的名單，並依您方便的形式行善。例如：贊助某個案執行所需之全部或部分費用、捐贈購物禮券或其他物品、提供免費場地或服務等。若您有意認領或贊助個案圓夢事宜，請與我們聯絡（02）2718-2656。\n四、您可以協助喜願宣導：\n我們歡迎更多人成為喜願的朋友，支持重症病童圓夢。您可以協助分享【喜願官方平台】予更多人；分享喜願理念與服務，或安排我們到 貴公司或團體舉辦分享會，我們將不勝感激！\n* 喜願Facebook粉絲專頁：\nhttps://www.facebook.com/mawtaiwan/\n* 喜願Line@生活圈：https://page.line.me/abl8492w?openQrModal=true\n宣導聯繫電話：（02）2718-2656',
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
