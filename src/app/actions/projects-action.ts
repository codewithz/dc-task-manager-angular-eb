
import { Project } from './../projects/project';

export const PROJECTS_LIST_REQUESTED = 'PROJECTS_LIST_REQUESTED';
export const PROJECTS_LIST_SUCCESS = 'PROJECTS_LIST_SUCCESS';


export class ProjectsListRequestedAction {
    readonly type = PROJECTS_LIST_REQUESTED;
}

export class ProjectsListSuccessAction {
    readonly type = PROJECTS_LIST_SUCCESS;
    constructor(public payload?: { data: Project[] }) { }
}