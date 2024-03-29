import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  capsuleButtonContainer: {
    backgroundColor: '#ECECEC',
    width: '100%',
    alignItems: 'center',
    borderRadius: 40,
    borderColor: '#00BAB399',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  capsuleButtonText: {
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 6,
  },
  capsuleButtonCancelIcon: {
    marginLeft: 8,
  },
  capsuleView: {
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Styles;
