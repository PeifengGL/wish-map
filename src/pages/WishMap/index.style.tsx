import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapButtonBlock: {
    display:'none',
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginLeft: 16,
    marginBottom: 24,
  },
  donateButtonContainer: {
    width: 128,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0057B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  donateButton: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donateButtonImage: {
    marginRight: 6,
  },
  donateButtonText: {
    color: 'white',
  },
  applyButtonContainer: {
    width: 128,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonImage: {
    marginRight: 6,
  },
  applyButtonText: {
    color: '#0057B8',
  },
  userCurrentLocation: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 16,
    marginBottom: 24,
  },
  userCurrentLocationButton: {},
  userCurrentLocationImage: {},
});

export default Styles;
