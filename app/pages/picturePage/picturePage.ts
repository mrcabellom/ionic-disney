import {Page, Platform} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {NgZone, Inject} from 'angular2/core';


@Page({
  templateUrl: 'build/pages/picturePage/picturePage.html'
})
export class PicturePage {
    image: any;
    constructor(private _ngZone: NgZone, private platform: Platform) {

    }
   
    takepic() {
        var options = {
            destinationType: 0,
            sourceType: 1,
            encodingType: 0,
            quality:100,
            allowEdit: false,
            saveToPhotoAlbum: false
        };

        this.platform.ready().then(() => {
            Camera.getPicture(options).then((imageData) => {

                let base64Image = "data:image/jpeg;base64," + imageData;
                 this._ngZone.run(() => this.image = base64Image);
                }, (err) => {
                    alert(err);
            });       
        });
        
    }
}