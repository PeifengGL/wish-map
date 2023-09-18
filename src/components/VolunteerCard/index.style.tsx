import { StyleSheet, Dimensions } from 'react-native';

const screenWidthRate = 360 / Dimensions.get('window').width;

const Styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000000',
    elevation: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginVertical: 2,
    marginHorizontal: 1,
  },
  cardContainer: {
    flexDirection: 'row',
  },
  cardImageContainer: {
    width: 118 * screenWidthRate,
    height: 118 * screenWidthRate,
    margin: 8,
  },
  cardImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  childrenBox: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 8,
    marginRight: 8,
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: '500',
    fontSize: 22,
    color: '#0057B8',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    fontSize: 12,
    color: '#4B4B4B',
    marginLeft: 4,
  },
  cardRegistrationTimeHintContainer: { marginHorizontal: 8, marginBottom: 8 },
  cardRegistrationTimeHintText: { color: '#FF585D', fontSize: 11 },
});

export default Styles;
