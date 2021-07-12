import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Map} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';


@Component({
  selector: 'app-base-map',
  templateUrl: './base-map.component.html',
  styleUrls: ['./base-map.component.scss']
})
export class BaseMapComponent implements OnInit, AfterViewInit {

  map: any;
  vectorSource = new VectorSource();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.generateMap();
    });
  }

  generateMap(){
    this.map = new Map({
      target: 'map-container',
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ]
    });
  }


}
