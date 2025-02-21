import { provideState } from '@ngrx/store';
import { filesFeature } from './files.reducer';
import { FilesFacade } from './files.facade';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';


export const provideFilesState = (): EnvironmentProviders => makeEnvironmentProviders([
  provideState(filesFeature),
  FilesFacade,
]);
