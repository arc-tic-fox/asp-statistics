import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadFileComponent } from '../components/upload-file/upload-file.component';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { DataModel } from '../models/data.model';
import { FilesTableComponent } from '../components/files-table/files-table.component';
import { Button } from 'primeng/button';
import { FilesFacade } from '../store/files';
import { FileDataModel } from '../models/file-data.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UploadFileComponent, PieChartComponent, BarChartComponent, FilesTableComponent, Button],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {

  constructor(private filesFacade: FilesFacade) { }

  data: DataModel[] | null = null;
  dataSignal: WritableSignal<DataModel[]> = signal([]);

  ngOnInit(): void {
    this.filesFacade.current$
      .pipe(
        map((items: FileDataModel[]) => items.length ? items[0] : null)
      )
      .subscribe(items => {
        this.data = items?.data ? [...items.data] : null;
        // this.dataSignal.set()
      });
  }

  deleteAll(): void {
    this.filesFacade.deleteAll();
  }
}
