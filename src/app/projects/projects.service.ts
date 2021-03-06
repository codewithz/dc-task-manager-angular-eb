import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private url: string = 'http://localhost:9090/api/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {


    // let header = this.getHeader();


    return this.http.get<Project[]>(this.url)
      .pipe(
        map(
          (data: Project[]) => {

            // for (let index = 0; index < data.length; index++) {
            //   data[index].teamSize = data[index].teamSize * 100;
            // }
            return data;
          }

        )
      )
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.url}/searchbyprojectid/${projectId}`)
  }

  createProject(project: Project): Observable<Project> {
    // let header = this.getHeader();
    return this.http.post<Project>(this.url, project);
  }

  updateProject(project: Project): Observable<Project> {
    // let header = this.getHeader();
    return this.http.put<Project>(this.url, project);
  }

  deleteProject(projectId: number): Observable<string> {
    // let header = this.getHeader();
    return this.http.delete<string>(this.url + '?ProjectID=' + projectId);
  }

  searchProject(searchBy: string, searchText: string): Observable<Project[]> {
    // let header = this.getHeader();
    return this.http.get<Project[]>(`${this.url}/search/${searchBy}/${searchText}`);
  }

  // getHeader(): HttpHeaders {
  //   let currentUser = { token: '' };
  //   let header = new HttpHeaders();
  //   header.set("Authorization", "Bearer ");

  //   if (sessionStorage.currentUser != null) {
  //     currentUser = JSON.parse(sessionStorage.currentUser);
  //     header = header.set("Authorization", "Bearer " + currentUser.token);
  //   }

  //   return header;
  // }
}
