import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { FilesActions } from './files.actions';
import { selectAll, selectCurrentData } from './files.selector';
import { DataModel } from '../../models/data.model';
import { Observable } from 'rxjs';
import { FileDataModel } from '../../models/file-data.model';

@Injectable()
export class FilesFacade {

  current$: Observable<FileDataModel[]>;
  allFiles$: Observable<FileDataModel[]>;

  constructor(private readonly store: Store) {
    this.current$ = this.store.select(selectCurrentData);
    this.allFiles$ = this.store.select(selectAll);
  }

  add(name: string, data: DataModel): void {
    this.store.dispatch(FilesActions.add({ name, data }));
  }

  delete(id: number): void {
    this.store.dispatch(FilesActions.deleteById({ id }));
  }

  deleteAll(): void {
    this.store.dispatch(FilesActions.deleteAll());
  }
}
