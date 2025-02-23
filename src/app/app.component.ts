import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadFileComponent } from '../components/upload-file/upload-file.component';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { DataModel } from '../models/data.model';
import { FilesTableComponent } from '../components/files-table/files-table.component';
import { Button } from 'primeng/button';
import { FilesFacade } from '../store/files';
import {ChartDataFilterComponent} from '../components/chart-data-filter/chart-data-filter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UploadFileComponent, PieChartComponent, BarChartComponent, FilesTableComponent, Button, ChartDataFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {

  constructor(private filesFacade: FilesFacade) { }

  data: DataModel[] | null = null;

  ngOnInit(): void {
    this.filesFacade.currentData$.subscribe(items => {
      this.data = items?.length ? [...items] : null;
    });
  }

  deleteAll(): void {
    this.filesFacade.deleteAll();
  }
}
