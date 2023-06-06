import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Share, { ShareOptions } from 'react-native-share';
import ImageProvider from 'assets';
import { ShareButtonPropsType } from 'types/components';

const ShareButton = (props: ShareButtonPropsType) => {
  const { share_url } = props;
  const handleShareClick = () => {
    const shareOptions: ShareOptions = {
      title: '喜願Map App',
      message: '這是喜願公益的專案連結，點擊查看詳細資料。\n',
      url: share_url,
    };

    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <TouchableOpacity onPress={handleShareClick}>
      <Image source={ImageProvider.WishMap.ShareIcon} />
    </TouchableOpacity>
  );
};

export default ShareButton;
