import { createFeature, createReducer, on } from '@ngrx/store';
import { FilesActions } from './files.actions';
import { FILES_STORE } from './files.store';
import { FileDataModel } from '../../models/file-data.model';

export interface FilesStateInterface {
  [FILES_STORE]: FileDataModel[];
}

export const filesInitialState: FilesStateInterface = {
  [FILES_STORE]: [],
};

export const filesFeature = createFeature({
  name: 'asp-statistics-store',
  reducer: createReducer(
    filesInitialState,
    on(FilesActions.add,
      (state, { name, data }) => ({
        ...state,
        files: [
          { id: new Date().getTime(), name, isCurrent: true, data, uploadDate: new Date().getTime().toString() },
          ...state.files.map(item => ({ ...item, isCurrent: false })).slice(0, 4),
        ],
      }),
    ),
    on(FilesActions.setCurrentFile,
      (state, { id }) => ({
        ...state,
        files: state.files.map(item => ({...item , isCurrent: item.id === id})),
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
