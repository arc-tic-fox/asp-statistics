import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileDataModel } from '../../models/file-data.model';

interface AspStore {
  files: FileDataModel[];
}

export const selectFilesState =
  createFeatureSelector<AspStore>('asp-statistics-store');

export const selectCurrentData =
  createSelector(selectFilesState, (state: { files: FileDataModel[] }): FileDataModel[] =>
    (state.files.filter(item => item.isCurrent)));

export const selectAll =
  createSelector(selectFilesState, (state: { files: FileDataModel[] }): FileDataModel[] => state.files);
