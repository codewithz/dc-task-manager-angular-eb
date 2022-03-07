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

  projectToBeEdited: Project = new Project();

  indexOfProjectEdited: number = 0;

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

          // Reset the form 

          this.newProject = new Project();
        },
        (error) => {
          console.log(error)
        }
      )
  }

  onEditClicked(event: any, index: number) {
    this.indexOfProjectEdited = index;
    this.projectToBeEdited = { ...this.projects[index] }

  }

  onUpdate() {
    this.service.updateProject(this.projectToBeEdited)
      .subscribe(
        (response) => {
          this.projects[this.indexOfProjectEdited] = response;
        },
        (error) => {
          console.log(error)
        }
      )
  }



}
