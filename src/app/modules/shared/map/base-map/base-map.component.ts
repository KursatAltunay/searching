import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Map} from 'ol';
import {OSM} from 'ol/source';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';


@Component({
  selector: 'app-base-map',
  templateUrl: './base-map.component.html',
  styleUrls: ['./base-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseMapComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mapRef', { read: ElementRef }) mapRef: ElementRef<HTMLDivElement>;

  @Input() longitude;
  @Input() latitude;
  @Input() vectorSource;

  map: Map;

  point: Point;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const place = [this.longitude, this.latitude];
      this.generateMap(place);
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.map.setTarget(null);
  }

  generateMap(place) {
    this.point = new Point (place);
    this.map = new Map({
      target: this.mapRef.nativeElement,
      view: new View({
        projection: 'EPSG:4326',
        center: place,
        zoom: 2
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(this.point)],
          }),
        }),
      ]
    });
  }


}
