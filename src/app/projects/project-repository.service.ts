import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { ProjectsListRequestedAction, ProjectsListSuccessAction } from '../actions/projects-action';
import { getProjectLoaded, getProjectLoading, getProjects, RootReducerState } from '../reducers';
import { Project } from './project';
import { ProjectsService } from './projects.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectRepositoryService {

  constructor(private store: Store<RootReducerState>,
    private service: ProjectsService) { }

  getProjectsData(): Observable<Project[]> {
    const loading = this.store.select(getProjectLoading);
    const loaded = this.store.select(getProjectLoaded);
    const getProjectsData = this.store.select(getProjects);

    const loadingAndLoadedObs = combineLatest([loading, loaded]);

    loadingAndLoadedObs.subscribe(
      (data) => {
        if (!data[0] && !data[1]) {

          this.store.dispatch(new ProjectsListRequestedAction());

          this.service.getProjects()
            .subscribe(
              (response) => {
                //    this.projects = response;
                this.store.
                  dispatch(new ProjectsListSuccessAction({ data: response }))

              }
            )
        }
      }
    );

    return getProjectsData;
  }
}
