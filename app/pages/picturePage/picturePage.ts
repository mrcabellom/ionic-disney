import {Page, Platform} from 'ionic-angular';
import {NgZone, Inject} from 'angular2/core';


@Page({
  templateUrl: 'build/pages/picturePage/picturePage.html'
})
export class PicturePage {
    image: any;
    constructor(private _ngZone: NgZone, private platform: Platform) {

    }
   
    takepic() {
        this.platform.ready().then(() => {
          let options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
          };
          navigator.camera.getPicture(
            (data) => {
              let dataImage = "data:image/jpeg;base64," + data;
               this._ngZone.run(()=> this.image = dataImage);
            }, (error) => {
              alert(error);
            },options
          );
        });
    }
}