// Welcome Page Image
import welcome_bg1 from 'assets/images/welcome/welcome_bg1.png';
import welcome_bg2 from 'assets/images/welcome/welcome_bg2.png';
import welcome_bg3 from 'assets/images/welcome/welcome_bg3.png';

// Tabs Icon
import WishMap from 'assets/images/tabsIcon/Home.png';
import Volunteer from 'assets/images/tabsIcon/Volunteer.png';
import Article from 'assets/images/tabsIcon/Article.png';
import Profile from 'assets/images/tabsIcon/Profile.png';

// WishMap Page Image
import Dream_Donate_Icon from 'assets/images/wishmap/Heart.png';
import Dream_Apply_Icon from 'assets/images/wishmap/DreamApply.png';
import Map_Mark_Icon from 'assets/images/wishmap/StarMark.png';
import Map_Mark_Selected_Icon from 'assets/images/wishmap/StarMark_selected.png';
import User_Current_Location_Icon from 'assets/images/wishmap/UserCurrentLocation.png'

const ImageProvider = {
  Welcome: {
    welcome_bg1: welcome_bg1,
    welcome_bg2: welcome_bg2,
    welcome_bg3: welcome_bg3,
  },
  Tabs: {
    WishMap: WishMap,
    Volunteer: Volunteer,
    Article: Article,
    Profile: Profile,
  },
  WishMap: {
    DreamDonateButton: Dream_Donate_Icon,
    DreamApplyButton: Dream_Apply_Icon,
    MapMarkIcon: Map_Mark_Icon,
    MapMarkSelectedIcon: Map_Mark_Selected_Icon,
    UserCurrentLocationIcon: User_Current_Location_Icon,
  },
};

export default ImageProvider;
