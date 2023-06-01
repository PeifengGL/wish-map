import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  filterToolContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  clearSettingText: {
    fontSize: 11,
    color: '#909090',
  },
  headerTitleText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  closeFilterIcon: {
    width: 40,
    height: 40,
  },
  filterInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#0057B8',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 12,
  },
  filterInputIcon: {
    margin: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 16,
  },
  filterAgeContainer: {},
  filterAgeTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 8,
  },
  filterAgeTitleText: {
    fontSize: 16,
    marginRight: 5,
  },
  filterAgeSubtitleText: {
    fontSize: 14,
    color: '#909090',
  },
});

export default Styles;
