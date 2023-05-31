import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  filterProjectContainer: {
    zIndex: 11,
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 16,
    marginTop: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderColor: '#0057B8',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  filterProjectButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
    marginHorizontal: 18,
  },
  filterProjectIcon: {
    marginRight: 5,
  },
  filterProjectText: {
    color: '#0057B8',
  },
  mapButtonBlock: {
    display: 'none',
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
    zIndex: 11,
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
    borderColor: '#0057B8',
    borderStyle: 'solid',
    borderWidth: 1,
    zIndex: 11,
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
  userCurrentLocationButton: {
    zIndex: 11,
  },
  userCurrentLocationImage: {},
  popupModal: {
    flex: 1,
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  closePopupModalButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
  },
  popupModalClickBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  popupModalContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 110,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    borderRadius: 12,
  },
  popupModalImageContainer: {
    width: '100%',
    height: 171,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  popupModalImage: {
    borderRadius: 12,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  popupModalDonateInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 12,
  },
  popupModalDonateInfoText: {
    color: '#0057B8',
  },
  popupModalProgressBarMainContainer: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  popupModalDescription: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 12,
    marginHorizontal: 8,
  },
  popupModalDonateButton: {
    backgroundColor: '#FF585D',
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  popupModalDonateButtonText: {
    color: '#FFFFFF',
  },
});

export default Styles;
