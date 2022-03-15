import { ActionReducerMap } from '@ngrx/store';
import { projectReducer, ProjectReducerState } from './project-reducer';


export interface RootReducerState {
    projects: ProjectReducerState,


}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    projects: projectReducer,
}