import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#EBF1F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#75787B',
    fontSize: 24,
    fontWeight: '500',
    marginVertical: 28,
  },
  headerGoBack: { position: 'absolute', left: 16 },
  scrollView: { flex: 1 },
  scrollViewContainer: { marginHorizontal: 16 },
  contentTitleContainer: {
    marginVertical: 24,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#EBF1F9',
  },
  contentTitleText: {
    color: '#0057B8',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  applyBlockTitleText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#0057B8',
    marginBottom: 16,
  },
  applyBlockItemContainer: { marginBottom: 16 },
  applyBlockItem: { marginBottom: 8 },
  inputOutline: {
    borderRadius: 12,
    borderColor: '#0057B8',
  },
  nextStepButton: {
    backgroundColor: '#0057B8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginHorizontal: 16,
    marginBottom: 36,
  },
  nextStepButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 12,
    color: '#FFFFFF',
  },
});

export default Styles;
