import { Component, EventEmitter, Output } from '@angular/core';
import { Checkbox, CheckboxChangeEvent } from 'primeng/checkbox';
import { InputNumber, InputNumberInputEvent } from 'primeng/inputnumber';
import { FilterDataModel } from '../../models/filter-data.model';

@Component({
  selector: 'asp-chart-data-filter',
  imports: [
    Checkbox,
    InputNumber,
  ],
  templateUrl: './chart-data-filter.component.html',
  styleUrl: './chart-data-filter.component.less'
})
export class ChartDataFilterComponent {

  data: FilterDataModel = { isSort: false, lessThan: null, moreThan: null };

  @Output() changedFilters = new EventEmitter<FilterDataModel>()

  onSortCheckbox(event: CheckboxChangeEvent): void {
    this.data.isSort = event.checked;
    this.changedFilters.emit(this.data);
  }

  onLessThan(event: InputNumberInputEvent): void {
    this.data.lessThan = event.value ? +event.value : null;
    this.changedFilters.emit(this.data);
  }

  onMoreThan(event: InputNumberInputEvent): void {
    this.data.moreThan = event.value ? +event.value : null;
    this.changedFilters.emit(this.data);
  }
}
