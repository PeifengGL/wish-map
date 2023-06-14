import { Dimensions, StatusBar, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const statusBarHeight = StatusBar.currentHeight;

const Styles = StyleSheet.create({
  safeArea: { backgroundColor: '#ffffff', flex: 1 },
  image: { width: screenWidth, height: undefined, aspectRatio: 1 },
  headerButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: statusBarHeight! + 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  contentContainer: { paddingHorizontal: 16 },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  text1Style: { color: '#FF585D', fontSize: 12 },
  text2Style: { color: '#2D2D2D', fontSize: 12 },
  titleText: {
    color: '#0057B8',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 12,
  },
  subTtitleText: {
    color: '#909090',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 12,
  },

  contentText: {
    color: '#2D2D2D',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 12,
  },
  articleCardContainer: { marginBottom: 8 },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 12,
    marginBottom: 24,
  },
});

export default Styles;
