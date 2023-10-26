import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  projectCardContainer: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  shareButtonContainer: { position: 'absolute', right: 8, bottom: 8 },
  coverImageContainer: {
    height: 171,
    justifyContent: 'center',
    alignContent: 'center',
  },
  donateInfoContainer: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  donateInfoText: { fontSize: 12, color: '#0057B8' },
  progressBarContainer: { marginVertical: 4 },
  projectInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    flexWrap: 'wrap',
  },
  projectTitleText: { fontSize: 16, fontWeight: '500', color: '#1A1A1A' },
  projectLocationContainer: { display: 'flex', flexDirection: 'row' },
  projectLocationText: { fontSize: 12, color: '#75787B' },
  projectDescriptionText: { fontSize: 12, color: '#2D2D2D' },
  donateButtonContainer: {
    marginTop: 12,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 12,
  },
});

export default Styles;
