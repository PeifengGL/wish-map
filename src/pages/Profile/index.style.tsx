import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  background: {
    width: '100%',
    aspectRatio: 1.5,
    height: undefined,
  },
  settingsButton: {
    width: 48,
    height: 48,
    top: 46,
    right: 16,
    position: 'absolute',
  },
  card: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    position: 'absolute',
    top: -36,
    left: 16,
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: 'black',
  },
  nameAndEdit: {
    alignSelf: 'stretch',
    marginTop: 37,
    paddingVertical: 17,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userNameText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: 22,
    color: '#1A1A1A',
    marginLeft: 6,
  },
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: 11,
    color: '#0057B8',
    marginLeft: 4,
  },
  infoArea: {
    borderWidth: 1,
    borderColor: '#0057B880',
    padding: 15,
    borderRadius: 12,
  },
  infoText: {
    fontFamily: 'Lato',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    marginVertical: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 24,
  },
  donateDetailImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    color: '#2D2D2D',
    fontSize: 12,
    fontFamily: 'Lato',
    fontWeight: '400',
  },
});

export default Styles;
