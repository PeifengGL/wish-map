import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    color: '#0057B8',
    marginVertical: 16,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  capsuleButtonContainer: { marginRight: 8 },
  contentScrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  articleCardContainer: { marginBottom: 12 },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#CCCCCC',
  },
  activeTabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2D2D2D',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: '#FFB549',
  },
  articleListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabContent: {
    flex: 1,
    flexDirection: 'row',
    width: '200%',
  },
  classScrollView: {
    marginLeft: 16,
    marginRight: 8,
    marginVertical: 30,
    height: 40,
    width: 360,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    shadowColor: '#000000',
    elevation: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginVertical: 2,
    marginHorizontal: 1,
  },
  childrenBox: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 8,
    marginRight: 8,
  },
  classText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  titleText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#0057B8',
  },
  subTitleText: {
    marginTop: 4,
    fontSize: 12,
  },
  dateText: {
    marginTop: 4,
    fontSize: 12,
    color: '#2D2D2D',
    textAlign: 'right',
  },
});

export default Styles;
