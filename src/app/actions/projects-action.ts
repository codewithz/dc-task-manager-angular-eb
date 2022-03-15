
import { Project } from './../projects/project';

export const PROJECTS_LIST_REQUESTED = 'PROJECTS_LIST_REQUESTED';
export const PROJECTS_LIST_SUCCESS = 'PROJECTS_LIST_SUCCESS';
export const PROJECT_ADDED = 'PROJECT_ADDED';


export class ProjectsListRequestedAction {
    readonly type = PROJECTS_LIST_REQUESTED;
}

export class ProjectsListSuccessAction {
    readonly type = PROJECTS_LIST_SUCCESS;
    constructor(public payload?: { data: Project[] }) { }
}

export class ProjectAddedAction {
    readonly type = PROJECT_ADDED;
    constructor(public payload?: { data: Project }) { }
}