import { Component, OnInit } from '@angular/core';
import { Project } from './project';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  newProject: Project = new Project();

  constructor(private service: ProjectsService) { }

  ngOnInit(): void {

    this.service.getProjects()
      .subscribe(
        (response) => {
          this.projects = response;
        },
        (error) => {
          console.log(error)
        }
      )

  }

  onSave() {
    this.service.createProject(this.newProject)
      .subscribe(
        (response) => {
          let createdProject: Project = response;
          this.projects.push(createdProject);
        },
        (error) => {
          console.log(error)
        }
      )
  }



}
