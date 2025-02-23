import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { FilesActions } from './files.actions';
import { selectAll, selectCurrentData, selectCurrent } from './files.selector';
import { DataModel } from '../../models/data.model';
import { Observable } from 'rxjs';
import { FileDataModel } from '../../models/file-data.model';
import { FilterDataModel } from '../../models/filter-data.model';

@Injectable()
export class FilesFacade {

  current$: Observable<FileDataModel | null>;
  currentData$: Observable<DataModel[]>;
  allFiles$: Observable<FileDataModel[]>;

  constructor(private store: Store) {
    this.current$ = this.store.select(selectCurrent);
    this.currentData$ = this.store.select(selectCurrentData);
    this.allFiles$ = this.store.select(selectAll);
  }

  add(name: string, data: DataModel[]): void {
    this.store.dispatch(FilesActions.add({ name, data }));
  }

  updateFilters(id: number, filters: FilterDataModel): void {
    this.store.dispatch(FilesActions.updateFilters({ id, filters }));
  }

  selectCurrent(id: number): void {
    this.store.dispatch(FilesActions.setCurrentFile({ id }));
  }

  delete(id: number): void {
    this.store.dispatch(FilesActions.deleteById({ id }));
  }

  deleteAll(): void {
    this.store.dispatch(FilesActions.deleteAll());
  }
}
