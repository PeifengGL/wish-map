import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
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
  name: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 28,
    color: '#1A1A1A',
  },
  editButton: {
    flexDirection: 'row',
  },
  editButtonText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: 11,
    lineHeight: 16,
    color: '#0057B8',
  },
  infoArea: {
    marginHorizontal: 5,
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
});

export default Styles;
