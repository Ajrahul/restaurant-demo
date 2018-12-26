import { Component, OnInit } from '@angular/core';
import { dataStore } from '../data-store/source';
import { ListService } from '../services/list.service'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../app.component.css']
})
export class ListComponent implements OnInit {
  public restaurantData: any;
  public filterItemOntemp: string;
  public selectedOption;

  constructor(private listService: ListService) {  }

  ngOnInit() {
    this.listService.currentFilterOpt.subscribe((data) => {
      const tempData = new dataStore();
      this.filterData(data, tempData);
    });
  }

  getRattingsColor(avgRating) {
    let color = 'greenLabel';
    if (Number(avgRating) < 3) {
      color = 'orangeLabel';
    }
    return color;
  }

  Isveg(value) {
    return value ? 'Veg' : 'Non-Veg';
  }

  // filter data
  filterData(filterOn, data) {
    const filterOnData = data;
    this.restaurantData = [];
    if (filterOn && filterOn !== 'undefined') {
      // if filter on only restaurant
      if (filterOn.restaurantId && filterOn.is_veg === null) {
        this.restaurantData = filterOnData['data'].filter((item) => item.id === filterOn.restaurantId);
      }

      // if filter on only food type (veg/non-veg)
      if (filterOn.is_veg !== null && filterOn.restaurantId === null) {
        filterOnData['data'].forEach((data) => {
          const items = data.menu.items.filter(item => (item.isVeg === filterOn.is_veg));
          data.menu.items = items;
          this.restaurantData.push(data);
        });
      }

      // if, filter by restaurant and food-type
      if (filterOn.is_veg !== null && filterOn.restaurantId !== null) {
        filterOnData['data'].forEach((data) => {
          if (data.id === filterOn.restaurantId) {
            const items = data.menu.items.filter(item => (item.isVeg === filterOn.is_veg));
            data.menu.items = items;
            this.restaurantData.push(data);
          }
        });
      }

    } else {
      this.restaurantData = filterOnData['data'];
    }
  }

  isAvailableInStock(value) {
    return value ? 'greenDot' : 'redDot'
  }

  validateData(data) {
    return (data && data instanceof Array) ? data : []
  }
  
}
