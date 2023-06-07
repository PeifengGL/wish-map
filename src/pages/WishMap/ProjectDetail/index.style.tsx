import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: '#FFFFFF' },
  donateDetailImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  donateDetailImage: {
    resizeMode: 'contain',
  },
  donateDetailInfoBlock: {
    backgroundColor: '#ffff',
    position: 'absolute',
    padding: 16,
    zIndex: 10,
  },
  donateDetailInfoBlockUnScrolling: { elevation: 5, borderRadius: 16 },
  donateDetailInfoBlockIsScrolling: {
    elevation: 0,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  donateDetailInfoBlockTitle: {
    color: '#0057B8',
    fontWeight: '500',
    fontSize: 22,
  },
  donateDetailLocationContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 9.5,
  },
  donateInfoContainer: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  donateInfoText: { fontSize: 12, color: '#0057B8' },
  donateInfoDescriptionHint: {
    fontSize: 16,
    fontWeight: '400',
    color: '#75787B',
    marginBottom: 8,
  },
  donateInfoDescription: { color: '#2D2D2D' },
  progressBarContainer: { marginVertical: 4 },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 16,
  },
  donateDetailDescriptionContainer: { marginBottom: 96 },
  donateButtonContainer: {
    position: 'absolute',
    bottom: 36,
    right: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
    paddingHorizontal: 16,
  },
  donateButtonText: {
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 14,
  },
  wishDetailImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  wishDetailContainer: {
    paddingHorizontal: 16,
    marginBottom: 96,
    elevation: 0,
  },
  wishDetailSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  wishDetailEmptyBlock: {
    height: 16,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '100%',
  },
  wishDetailImage: {
    resizeMode: 'contain',
  },
  wishDetailSubtitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFB549',
  },
  wishDetailTitle: {
    color: '#0057B8',
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 12,
  },
  wishDetailDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#2D2D2D',
    marginBottom: 12,
  },
  wishDetailSeparator: {
    marginTop: 12,
    marginBottom: 24,
  },
});

export default Styles;
