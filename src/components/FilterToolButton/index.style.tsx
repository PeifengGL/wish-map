import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  filterProjectButtonContainer: {
    borderRadius: 30,
    borderColor: '#0057B8',
    borderStyle: 'solid',
    borderWidth: 0.5,
    display: 'flex',
    alignSelf: 'center',
  },
  filterProjectButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 20,
  },
  filterProjectIcon: {
    marginRight: 5,
  },
  filterProjectText: {
    fontSize: 14,
  },
});

export default Styles;
