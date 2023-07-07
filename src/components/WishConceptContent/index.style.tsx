import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 16,
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
