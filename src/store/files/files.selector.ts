import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileDataModel } from '../../models/file-data.model';
import { DataModel } from '../../models/data.model';

interface AspStore {
  files: FileDataModel[];
}

export const selectFilesState =
  createFeatureSelector<AspStore>('asp-statistics-store');

export const selectCurrent =
  createSelector(selectFilesState, (state: { files: FileDataModel[] }): FileDataModel | null =>
    state.files.find(item => item.isCurrent) || null);

export const selectCurrentData =
  createSelector(selectFilesState, (state: { files: FileDataModel[] }): DataModel[] =>
    (state.files.find(item => item.isCurrent)?.data || []));

export const selectAll =
  createSelector(selectFilesState, (state: { files: FileDataModel[] }): FileDataModel[] => state.files);
