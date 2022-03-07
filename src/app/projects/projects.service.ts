import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private url: string = 'http://localhost:9090/api/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.url, project);
  }

  deleteProject(projectId: number): Observable<string> {
    return this.http.delete<string>(this.url + '?ProjectID=' + projectId);
  }
}
