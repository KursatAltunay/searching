import { Component, OnInit } from '@angular/core';
import { HomeService } from '@store/home/services/home.service';
import { HomeModel } from '@store/home/models/home-model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  data: HomeModel[];
  viewData: HomeModel[];

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.homeService.getHomeResult().subscribe(result => {
      this.data = result;
      this.viewData = [...this.data];
      console.log(this.data);
    });
  }

  onKeydown(event): void {
    const searchText = event.target.value.toLowerCase();
    this.viewData = this.data.filter(x => x.name.toLowerCase().includes(searchText));
  }

}
