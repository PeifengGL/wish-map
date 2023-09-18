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
  toastContainer: {
    backgroundColor: 'rgba(50, 47, 53, 0.9)',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,
    paddingHorizontal: 16,
    borderLeftColor: 'rgba(50, 47, 53, 0.9)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  toastText: { fontSize: 15, color: '#fff', marginVertical: 12 },
  goBackButton: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  changePasswordContainer: {
    marginHorizontal: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  changePasswordTitle: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: '#0057B8',
    marginBottom: 8,
  },
  changePasswordInputContainer: { width: '100%', marginTop: 16 },
  changePasswordInput: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
  },
  inputFieldLabel: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    left: 16,
    top: -8,
  },
  inputFieldLabelText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Lato',
    marginHorizontal: 6,
  },
  inputFieldError: {
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
