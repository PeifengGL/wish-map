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
  classScrollViewContainer: { paddingHorizontal: 16 },
  classScrollView: {
    marginVertical: 24,
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
  volunteerApplyButtonContainer: {
    backgroundColor: '#0057B8',
    borderRadius: 50,
    position: 'absolute',
    right: 16,
    bottom: 24,
  },
  volunteerApplyButton: {
    marginHorizontal: 16,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volunteerApplyButtonText: { color: 'white', marginLeft: 4 },
  volunteerApplyDoneModalContainer: {
    height: '100%',
    backgroundColor: '#ebf1f9',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  volunteerApplyDoneModalContent1: {
    color: '#FF585D',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 50,
  },
  volunteerApplyDoneModalContent2: {
    color: '#FF585D',
    fontSize: 16,
    fontWeight: '500',
  },
  volunteerApplyDoneModalContent3: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  volunteerApplyDoneModalContent4: {
    color: '#75787B',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 24,
    marginTop: 16,
  },
  closeModalButtonContainer: {
    width: '100%',
    marginBottom: 32,
  },
  closeModalButton: {
    backgroundColor: '#0057B8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginHorizontal: 28,
  },
  closeModalButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 12,
    color: '#FFFFFF',
  },
});

export default Styles;
