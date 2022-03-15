import { ActionReducerMap, createSelector } from '@ngrx/store';
import { projectReducer, ProjectReducerState } from './project-reducer';
import * as fromProject from './project-reducer'


export interface RootReducerState {
    projects: fromProject.ProjectReducerState,


}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    projects: fromProject.projectReducer,
}


export const getProjectState = (state: RootReducerState) => state.projects;

//Actual Selectors that components will subscribe to
export const getProjectLoaded = createSelector(getProjectState, fromProject.getLoaded);
export const getProjectLoading = createSelector(getProjectState, fromProject.getLoading);
export const getProjects = createSelector(getProjectState, fromProject.getAllProjects);

