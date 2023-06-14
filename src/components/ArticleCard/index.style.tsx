import { StyleSheet, Dimensions } from 'react-native';

const screenWidthRate = 360 / Dimensions.get('window').width;

const Styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
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
  },
  classText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  titleText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#0057B8',
  },
  subTitleText: {
    marginTop: 4,
    fontSize: 12,
  },
  dateText: {
    marginTop: 4,
    fontSize: 12,
    color: '#2D2D2D',
    textAlign: 'right',
  },
});

export default Styles;
