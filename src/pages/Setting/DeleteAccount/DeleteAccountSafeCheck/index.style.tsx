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
  deleteAccountReasonGoBackContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  content: { marginHorizontal: 16 },
  title: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: '#0057B8',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: '#75787B',
  },
  separator: {
    height: 2,
    width: '100%',
    backgroundColor: '#D9D9D9',
    marginVertical: 24,
  },
  passwordInputBlock: { width: '100%', marginTop: 16 },
  passwordInputContainer: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
  },
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
  errorText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginHorizontal: 6,
    color: '#FF0000',
    marginTop: 6,
  },
  nextStepButton: {
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  nextStepButtonText: {
    fontSize: 14,
    fontFamily: 'Lato',
    marginVertical: 14,
  },
});

export default Styles;
