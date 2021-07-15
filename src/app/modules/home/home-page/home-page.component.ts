import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HomeService} from '@store/home/services/home.service';
import {HomeModel} from '@store/home/models/home-model';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {CurrencyPipe} from '@angular/common';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {

  data: HomeModel[];
  viewData: HomeModel[];


  constructor(
    private homeService: HomeService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.homeService.getHomeResult().subscribe(result => {
      this.data = result;
      this.viewData = [...this.data];
      console.log(this.data);
      this.cdr.markForCheck();
    });
  }

  onKeydown(event): void {
    const searchText = event.target.value.toLowerCase();
    this.viewData = this.data.filter(x =>
      x.name.toLowerCase().includes(searchText) ||
      x.address.toLowerCase().includes(searchText) ||
      x.company.toLowerCase().includes(searchText));
  }

  getLongitude(id) {
    return this.data.find(x => x._id === id).longitude;
  }

  getLatitude(id) {
    return this.data.find(x => x._id === id).latitude;
  }

  getVectorSource(id) {
   return  new VectorSource({features: [new Feature(new Point([this.getLongitude(id), this.getLatitude(id)]))]});
  }
}
