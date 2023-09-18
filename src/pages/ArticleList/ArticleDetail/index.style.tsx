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
  stickyHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  stickyHeaderTitle: { marginBottom: 24 },
  stickyHeaderFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: statusBarHeight! + 10,
    paddingHorizontal: 16,
  },
});

export default Styles;
