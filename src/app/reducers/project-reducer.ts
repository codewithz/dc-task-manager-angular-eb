import { Action } from '../actions';
import { Project } from './../projects/project';
import * as projectActions from '../actions/projects-action';

export interface ProjectReducerState {
    loading: boolean,
    loaded: boolean,
    projects: Project[]
}

const initialState: ProjectReducerState = {
    loading: false,
    loaded: false,
    projects: []
}

export function projectReducer(state = initialState, action: Action) {
    switch (action.type) {
        case projectActions.PROJECTS_LIST_REQUESTED: {
            return { ...state, loading: true };
        };
        case projectActions.PROJECTS_LIST_SUCCESS: {
            const updatedProjects = state.projects.concat(action.payload.data);
            return { ...state, loading: false, loaded: true, projects: updatedProjects }
        };
        default: {
            return state;
        }

    }
}

//Selectors : Are like the observables which helps us to listen to a specific slice o a state

export const getLoading = (state: ProjectReducerState) => state.loading;
export const getLoaded = (state: ProjectReducerState) => state.loaded;
export const getAllProjects = (state: ProjectReducerState) => state.projects;