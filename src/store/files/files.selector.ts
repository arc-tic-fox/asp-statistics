import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FILES_STORE } from './files.store';
import { FileDataModel } from '../../models/FileDataModel';


export const selectFilesState =
  createFeatureSelector<ReadonlyArray<FileDataModel>>(FILES_STORE);

export const selectCurrentData =
  createSelector(selectFilesState, (files: readonly FileDataModel[]): FileDataModel[] =>
    (files.filter(item => item.isCurrent)));

export const selectAll =
  createSelector(selectFilesState, (files: readonly FileDataModel[]): FileDataModel[] => ([...files]));
