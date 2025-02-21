import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadFileComponent } from '../components/upload-file/upload-file.component';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { DataModel } from '../models/data.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UploadFileComponent, PieChartComponent, BarChartComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

  data: DataModel[] = [
    { category: 'A', value: 30 },
    { category: 'B', value: 70 },
    { category: 'C', value: 50 },
    { category: 'D', value: 90 },
    { category: 'E', value: 20 },
  ];
}
