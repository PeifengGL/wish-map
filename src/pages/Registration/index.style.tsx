import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  guestButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  guestButtonText: {
    color: '#0057B8',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
  },
  guestButtonArrow: {},
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: '#0057B8',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    position: 'relative',
    height: 70,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  inputLabel: {
    position: 'absolute',
    top: -12,
    left: 11,
    padding: 5,
    fontSize: 12,
    fontWeight: '700',
    color: '#0057B8',
    backgroundColor: 'white',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    zIndex: 100,
  },
  inputLabelError: {
    color: '#F23A3C',
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 4,
    borderColor: '#0057B899',
    borderWidth: 1,
    borderRadius: 12,
  },
  inputFocused: {
    borderColor: '#0057B8',
    borderWidth: 2,
    marginTop: -1,
  },
  inputError: {
    borderColor: '#F23A3C',
    borderWidth: 2,
    marginTop: -1,
  },
  inputButton: {
    position: 'absolute',
    right: 32,
    bottom: 26,
  },
  inputErrorMessage: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F23A3C',
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  confirmContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 40,
  },
  confirm: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: '#1A1A1A',
  },
  link: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    marginHorizontal: 1,
    color: '#0057B8',
  },
  button: {
    backgroundColor: '#0057B8',
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 40,
    padding: 14,
  },
  buttonDisabled: {
    backgroundColor: '#ECECEC',
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 40,
    padding: 14,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#909090',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 40,
  },
  loginText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: '#6F6F6F',
  },
  welcomeText: {
    fontSize: 36,
    lineHeight: 44,
    color: '#FF585D',
    fontWeight: '800',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 144,
    marginBottom: 40,
  },
  welcomeImage: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  loadingText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#75787B',
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Lato',
    letterSpacing: 0.25,
    marginBottom: 30,
  },
});

export default Styles;
