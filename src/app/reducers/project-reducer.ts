import { Project } from './../projects/project';

export interface ProjectReducerState {
    loading: boolean,
    loaded: boolean,
    projects: Project[]
}