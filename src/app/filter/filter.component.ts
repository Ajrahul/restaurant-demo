import { Component, OnInit } from '@angular/core';
import { dataStore } from '../data-store/source';
import { ListService } from '../services/list.service'

@Component({
  selector: 'app-list-filter',
  templateUrl: './filter.component.html'
})
export class ListFilterComponent implements OnInit {

  private allData = new dataStore();
  public restaurantData = this.allData['data'];
  public restaurantname = 'Restaurant Name';
  public vegnonveg = 'Veg/Non-veg';
  public cuisine = 'Cuisine';
  public avgCosts:any = 'AVG Cost for 2';

  public filterOptions = {
    restName: [],
    cuisines: [],
    avgCosts: [],
  };

  public selectedDropdownValues = {
    restaurantId: null,
    is_veg: null,
    cuisine: null,
    avgCost: null
  }

  constructor(private listService: ListService) {  }

  ngOnInit() {
    console.log('list filter component');
    this.getRestaurantNames();
  }

  getRestaurantNames() {
    this.restaurantData.forEach((data) => {
      this.filterOptions.restName.push({ id: data.id, name: data.name });
    });
  }

  getCuisinesById(data) {
    this.filterOptions.avgCosts = [];
    this.restaurantData.forEach((restData) => {
      if (restData.id === data.id) {
        this.selectedDropdownValues.restaurantId = data.id;
        this.restaurantname = data.name;
        this.filterOptions.cuisines = restData.cuisines;
        this.avgCosts = restData.avgCost;
      }
    })
  }

  filterListData() {
    this.listService.updateFilter(this.selectedDropdownValues);
  }

  selectCuisines(value) {
    this.selectedDropdownValues.cuisine = value;
    this.cuisine = value;
  }

  selectAvgCost(value) {
    this.avgCosts = value;
  }

  setFoodType(value, value2) {
    this.selectedDropdownValues.is_veg = value;
    this.vegnonveg = value2;
  }

}
