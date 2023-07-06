// import React, { useRef } from 'react';
// import {
//   View,
//   Animated,
//   PanResponder,
//   GestureResponderEvent,
//   PanResponderGestureState,
//   Image,
//   Text,
// } from 'react-native';
// import Styles from './index.style';
// import profilePic from 'assets/images/profile/ProfilePic.png';
// import editIcon from 'assets/images/profile/Edit.png';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// type DraggableCardProps = {};

// const DraggableCard: React.FC<DraggableCardProps> = () => {
//   // 建立用於卡片高度的 Animated.Value 物件
//   const cardHeight = useRef(new Animated.Value(616)).current;
//   // 建立用於手勢移動的 Animated.ValueXY 物件
//   const pan = useRef(new Animated.ValueXY({ x: 0, y: -12 })).current;
//   let isCardOpen = false;
//   // pan.y 現在的偏移量
//   const handlePanMove = (_: any, gestureState: { dy: number }) => {
//     let nowY;
//     if (isCardOpen) {
//       nowY = -100;
//     } else {
//       nowY = -12;
//     }
//     const panValue = nowY + gestureState.dy;
//     if (panValue < -150 || panValue > -5) {
//       return;
//     }
//     pan.setValue({ x: 0, y: panValue });
//   };

//   // 滑動手勢釋放後的處理函式
//   const handleRelease = (_: any, gestureState: { dy: number }) => {
//     // 如果手勢向上滑動超過 50，則打開卡片，向下則關閉卡片
//     if (gestureState.dy < -50) {
//       isCardOpen = true;
//       handleOpenCard();
//     } else {
//       isCardOpen = false;
//       handleCloseCard();
//     }
//   };

//   // 打開卡片的動畫
//   const handleOpenCard = () => {
//     Animated.timing(pan.y, {
//       toValue: -100,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   // 關閉卡片的動畫
//   const handleCloseCard = () => {
//     Animated.timing(pan.y, {
//       toValue: -12,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   // 建立手勢相應器
//   const panResponder = useRef(
//     PanResponder.create({
//       // 在移動時設置成可移動
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: (
//         event: GestureResponderEvent,
//         gestureState: PanResponderGestureState,
//       ) => {
//         handlePanMove(event, gestureState);
//       },

//       // 手勢釋放後的處理函式
//       onPanResponderRelease: handleRelease,
//     }),
//   ).current;

//   return (
//     <View style={{ flex: 1 }}>
//       {/* 可拖曳的卡片 */}
//       <Animated.View
//         style={[
//           {
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: cardHeight, // 使用 Animated.Value 物件設置卡片高度
//             backgroundColor: 'white',
//             borderTopLeftRadius: 16,
//             borderTopRightRadius: 16,
//             paddingHorizontal: 16,
//             paddingVertical: 8,
//             transform: [{ translateY: Animated.add(pan.y, cardHeight) }], // 使用 Animated.ValueXY 物件設置卡片的 Y 軸位移
//           },
//         ]}
//         {...panResponder.panHandlers} // 將手勢相應器的事件綁定到視圖上
//       >
//         {/* 卡片內容 */}

//         {/* 頭像 */}
//         <View style={Styles.imageContainer}>
//           <Image source={profilePic}></Image>
//         </View>

//         {/* 個人資料區，可隨著上移下移收放 */}
//         <View>
//           <Animated.ScrollView>
//             <View style={Styles.nameAndEdit}>
//               <Text style={Styles.name}>吳康仁</Text>
//               <TouchableOpacity style={Styles.editButton}>
//                 <Image source={editIcon} />
//                 <Text style={Styles.editButtonText}>編輯</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={Styles.infoArea}>
//               <Text style={Styles.infoText}>電子信箱：xxxx@gmail.com</Text>
//               <Text style={Styles.infoText}>手機號碼：0935xxxxxx</Text>
//               <Text style={Styles.infoText}>聯絡地址：xxxxxxxxxx</Text>
//             </View>
//           </Animated.ScrollView>
//         </View>
//       </Animated.View>
//     </View>
//   );
// };

// export default DraggableCard;
