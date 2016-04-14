import {Page} from 'ionic-angular';
import {AttractionsPage} from '../attractions/attractions';
import {MapPage} from '../map/map';
import {CameraPage} from '../camera/camera';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tabAttractions: any = AttractionsPage;
  tabMap: any = MapPage;
  tabPicture: any = CameraPage;
 }
