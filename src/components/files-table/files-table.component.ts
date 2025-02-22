import { Component, OnInit } from '@angular/core';
import { FileDataModel } from '../../models/file-data.model';
import { FilesFacade } from '../../store/files';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'asp-files-table',
  imports: [
    TableModule,
    DatePipe,
  ],
  templateUrl: './files-table.component.html',
  styleUrl: './files-table.component.less'
})
export class FilesTableComponent implements OnInit {
  files: FileDataModel[] = [];

  constructor(private filesFacade: FilesFacade) { }

  ngOnInit(): void {
    this.filesFacade.allFiles$
      .subscribe((files: FileDataModel[]) =>  this.files = files);
  }

  selectCurrent(id: number): void {
    this.filesFacade.selectCurrent(id);
  }

  delete(id: number): void {
    this.filesFacade.delete(id);
  }
}
