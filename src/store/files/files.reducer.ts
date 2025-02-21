import { createFeature, createReducer, on } from '@ngrx/store';
import { FilesActions } from './files.actions';
import { FILES_STORE } from './files.store';
import { FileDataModel } from '../../models/file-data.model';

export interface FilesStateInterface {
  files: FileDataModel[];
}

export const filesInitialState: FilesStateInterface = {
  files: [],
};

export const filesFeature = createFeature({
  name: FILES_STORE,
  reducer: createReducer(
    filesInitialState,
    on(FilesActions.add,
      (state, { name, data }) => ({
        ...state,
        files: [
          { id: new Date().getTime(), name, isCurrent: true, data, uploadDate: new Date().getTime().toString() },
          ...state.files.slice(0, 3),
        ],
      }),
    ),
    on(FilesActions.setCurrentFile,
      (state, { id }) => ({
        ...state,
        files: state.files.map(item => ({...item , current: item.id === id})),
      }),
    ),
    on(FilesActions.deleteById,
      (state, { id }) => ({
        ...state,
        files: state.files.filter(item => item.id !== id),
      }),
    ),
    on(FilesActions.deleteAll,
      (state) => ({
        ...state,
        files: [],
      }),
    ),
  ),
});
