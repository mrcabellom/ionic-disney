import {Page} from 'ionic-angular';
import {Component} from 'angular2/core';
import {CanvasComponent} from '../../shared/components/canvasMap'


@Page({
  templateUrl: 'build/pages/map/map.html',
  directives: [CanvasComponent]
})
export class MapPage {}