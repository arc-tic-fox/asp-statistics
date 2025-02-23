import { Component, OnInit } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { InputNumber } from 'primeng/inputnumber';
import { FilterDataModel } from '../../models/filter-data.model';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilesFacade } from '../../store/files';

@Component({
  selector: 'asp-chart-data-filter',
  imports: [
    Checkbox,
    InputNumber,
    InputText,
    Button,
    ReactiveFormsModule,
  ],
  templateUrl: './chart-data-filter.component.html',
  styleUrl: './chart-data-filter.component.less'
})
export class ChartDataFilterComponent implements OnInit {

  constructor(private filesFacade: FilesFacade) { }

  id: number = 0;
  data: FilterDataModel = { isSort: false, category: null, lessThan: null, moreThan: null };

  formGroup = new FormGroup({
    isSort: new FormControl(false),
    category: new FormControl(''),
    lessThanFilter: new FormControl<number | null>(null),
    moreThanFilter: new FormControl<number | null>(null),
  });

  ngOnInit(): void {
    this.filesFacade.current$
      .subscribe(items => {
      if (items) {
        this.id = items.id;
        this.data = { ...items.filters };

        this.formGroup.controls.isSort.setValue(this.data.isSort);
        this.formGroup.controls.category.setValue(this.data.category);
        this.formGroup.controls.lessThanFilter.setValue(this.data.lessThan);
        this.formGroup.controls.moreThanFilter.setValue(this.data.moreThan);
      }
    });
  }

  onSort(): void {
    this.data.isSort = this.formGroup.controls['isSort'].value || false;
    this.filesFacade.updateFilters(this.id, this.data);
  }

  onCategory(): void {
    this.data.category = this.formGroup.controls['category'].value || null;
    this.filesFacade.updateFilters(this.id, this.data);
  }

  onLessThan(): void {
    this.data.lessThan = this.formGroup.controls['lessThanFilter'].value || null;
    this.filesFacade.updateFilters(this.id, this.data);
  }

  onMoreThan(): void {
    this.data.moreThan = this.formGroup.controls['moreThanFilter'].value || null;
    this.filesFacade.updateFilters(this.id, this.data);
  }

  clear(): void {
    this.data = { isSort: false, category: null, lessThan: null, moreThan: null };
    this.formGroup.reset();

    this.filesFacade.updateFilters(this.id, this.data);
  }
}
