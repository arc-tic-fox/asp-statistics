import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DataModel } from '../../models/DataModel';
import { FILES_STORE } from './files.store';

export const FilesActions = createActionGroup({
  source: FILES_STORE,
  events: {
    'Add': props<{ name: string, data: DataModel }>(),
    'Set Current File': props<{ id: number }>(),
    'Delete By Id': props<{ id: number }>(),
    'Delete All': emptyProps(),
  },
});
