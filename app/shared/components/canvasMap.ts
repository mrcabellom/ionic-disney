import {Component,Inject, ElementRef, ViewChild} from 'angular2/core';

@Component({
  selector: 'canvas-component',
  template: '<canvas #canvas1 id="canvas1" width="800" height="502"></canvas>',
})
export class CanvasComponent {
	@ViewChild('canvas1') myCanvas;
	private context: CanvasRenderingContext2D;
	

	ngAfterViewInit() {
	    let canvas = this.myCanvas.nativeElement;
	    this.context = canvas.getContext("2d");
	}

    private tick() {
    
	    requestAnimationFrame(()=> {
	      this.tick()
	    });
	    var ctx = this.context;
	    var img1: HTMLImageElement = new Image();
	    img1.onload = function () {
	        //draw background image
	        ctx.drawImage(img1, 0, 0);
    	    ctx.globalAlpha = 0.1;
      		ctx.beginPath();
      		ctx.arc(170, 109, 12, 0, 2 * Math.PI, false);
      		ctx.fillStyle = 'red';
      		ctx.fill(); 
	    };
    	img1.src = 'build/images/disneylandpark.png';

  	}
    
}