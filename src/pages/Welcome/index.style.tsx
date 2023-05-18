import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  introBackgroundImageStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  introText: {
    fontSize: 18,
    position: 'absolute',
    bottom: '22%',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  signInOrSingUpContainer: {
    marginTop: 5,
    marginBottom: 25,
  },
  signInOrSingUpButton: {
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#0057B8',
  },
  signInOrSingUpButtonText: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
export default Styles;
