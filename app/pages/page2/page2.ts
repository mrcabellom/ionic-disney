import {Page} from 'ionic-angular';
import {Component} from 'angular2/core';
import {CanvasComponent} from '../../shared/components/canvasMap'


@Page({
  templateUrl: 'build/pages/page2/page2.html',
  directives: [CanvasComponent]
})
export class Page2 {}