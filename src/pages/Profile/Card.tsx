import React, { useRef } from 'react';
import {
  View,
  Animated,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

type DraggableCardProps = {};

const DraggableCard: React.FC<DraggableCardProps> = () => {
  // 建立用於卡片高度的 Animated.Value 物件
  const cardHeight = useRef(new Animated.Value(503)).current;
  // 建立用於手勢移動的 Animated.ValueXY 物件
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // 滑動手勢釋放後的處理函式
  const handleRelease = (_: any, gestureState: { dy: number }) => {
    // 如果手勢向上滑動超過 50，則打開卡片
    if (gestureState.dy < -50) {
      handleOpenCard();
      pan.setValue({ x: 0, y: -80 });
    } else {
      // 否則關閉卡片
      handleCloseCard();
      pan.setValue({ x: 0, y: 0 });
    }
  };

  // 打開卡片的動畫
  const handleOpenCard = () => {
    Animated.timing(cardHeight, {
      toValue: 566,
      duration: 300,
      useNativeDriver: false,
    }).start();
    console.log('openCard', pan.y, cardHeight);
  };

  // 關閉卡片的動畫
  const handleCloseCard = () => {
    Animated.timing(cardHeight, {
      toValue: 486,
      duration: 300,
      useNativeDriver: false,
    }).start();
    console.log('closeCard', pan.y, cardHeight);
  };

  const handlePanMove = (_: any, gestureState: { dy: number }) => {
    console.log(gestureState.dy);
    pan.setValue({ x: 0, y: gestureState.dy });
    // 6/21 做到這邊
  };

  // 建立手勢相應器
  const panResponder = useRef(
    PanResponder.create({
      // 在移動時設置成可移動
      onMoveShouldSetPanResponder: () => true,
      // 處理移動事件，將手勢的 dy 值與 pan.y 進行綁定
      onPanResponderMove: (
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        handlePanMove(event, gestureState);
      },

      // 手勢釋放後的處理函式
      onPanResponderRelease: handleRelease,
    }),
  ).current;

  return (
    <View style={{ flex: 1 }}>
      {/* 可拖曳的卡片 */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: cardHeight, // 使用 Animated.Value 物件設置卡片高度
            backgroundColor: 'white',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 8,
            transform: [{ translateY: Animated.add(pan.y, cardHeight) }], // 使用 Animated.ValueXY 物件設置卡片的 Y 軸位移
          },
        ]}
        {...panResponder.panHandlers} // 將手勢相應器的事件綁定到視圖上
      >
        {/* 卡片內容 */}
      </Animated.View>
    </View>
  );
};

export default DraggableCard;
