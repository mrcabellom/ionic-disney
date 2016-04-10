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
        let options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        };

        this.platform.ready().then(() => {
            navigator.camera.getPicture(options).then((imageData) => {
                let base64Image = "data:image/jpeg;base64," + imageData;
                 this._ngZone.run(() => this.image = base64Image);
                }, (err) => {
                    alert(err);
            });       
        });
        
    }
}