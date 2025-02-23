import { Injectable } from '@angular/core';
import { FilterDataModel } from '../models/filter-data.model';
import { DataModel } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class FilterDataService {
  updateFilteredData(data: DataModel[], filters: FilterDataModel): DataModel[] {
    let filteredData: DataModel[];

    filteredData = filters.isSort ?
      [...data].sort((a, b) => a.value - b.value) : [...data];

    if (filters.category) {
      filteredData = filteredData.filter((item) =>
        filters.category && item.category.toLowerCase().includes(filters.category.toLowerCase()));
    }

    if (filters.lessThan) {
      filteredData = filteredData.filter((item) =>
        filters.lessThan && item.value >= filters.lessThan);
    }

    if (filters.moreThan) {
      filteredData = filteredData.filter((item) =>
        filters.moreThan && item.value <= filters.moreThan);
    }

    return filteredData;
  }
}
