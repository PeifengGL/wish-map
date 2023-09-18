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
  goBackButton: {
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
  cancelButton: {
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0057B8',
    marginBottom: 24,
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Lato',
    marginVertical: 14,
    color: '#ffffff',
  },
  deleteAccountButton: {
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#FF585D',
    borderWidth: 1,
  },
  deleteAccountButtonText: {
    fontSize: 14,
    fontFamily: 'Lato',
    marginVertical: 14,
    color: '#FF585D',
  },
});

export default Styles;
