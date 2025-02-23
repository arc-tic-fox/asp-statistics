import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DataModel } from '../../models/data.model';
import { FILES_STORE } from './files.store';
import { FilterDataModel } from '../../models/filter-data.model';

export const FilesActions = createActionGroup({
  source: FILES_STORE,
  events: {
    'Add': props<{ name: string, data: DataModel[] }>(),
    'Update Filters': props<{ id: number, filters: FilterDataModel }>(),
    'Set Current File': props<{ id: number }>(),
    'Delete By Id': props<{ id: number }>(),
    'Delete All': emptyProps(),
  },
});
