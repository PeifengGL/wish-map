import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  headerTitle: {
    color: '#75787B',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 28,
  },
  cancelButtonText: {
    color: '#FF585D',
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: '500',
  },
  goBackButton: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  resetPassword: {
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetPasswordTitle: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: '#0057B8',
    marginBottom: 8,
  },
  resetPasswordContainer: { width: '100%', marginTop: 16 },
  resetPasswordInputContainer: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: { flex: 1 },
  inputLabel: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    left: 16,
    top: -8,
  },
  inputLabelText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginHorizontal: 6,
  },
  inputErrorText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginHorizontal: 6,
    color: '#FF0000',
    marginTop: 6,
    marginLeft: 16,
  },
  resetPasswordButton: {
    backgroundColor: '#0057B8',
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  resetPasswordButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Lato',
    marginVertical: 14,
  },
});

export default Styles;
