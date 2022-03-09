import { Component, OnInit } from '@angular/core';
import { ClientLocation } from '../client-location/client-location';

import { Project } from './project';
import { ProjectsService } from './projects.service';
import { ClientLocationsService } from '../client-location/client-locations.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  clientLocations: ClientLocation[] = [];

  newProject: Project = new Project();

  projectToBeEdited: Project = new Project();

  indexOfProjectEdited: number = 0;

  projectToBeDeleted: Project = new Project();

  indexOfProjectToBeDeleted: number = 0;

  searchBy: string = '';
  searchText: string = '';

  constructor(private service: ProjectsService, 
    private clientLocationService: ClientLocationsService) { }

  ngOnInit(): void {

    this.service.getProjects()
      .subscribe(
        (response) => {
          this.projects = response;
        }
      )

    this.clientLocationService.getClientLocations()
      .subscribe(
        (response) => {
          this.clientLocations = response
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

  onDeleteClicked(index: number) {
    this.indexOfProjectToBeDeleted = index;
    this.projectToBeDeleted = { ...this.projects[index] }
  }

  onDeleteConfirmed() {

    this.service.deleteProject(this.projectToBeDeleted.projectID)
      .subscribe(
        (response) => {
          this.projects.splice(this.indexOfProjectToBeDeleted, 1);
        },
        (error) => { console.log(error) }
      )

  }

  onSearch() {
    this.service.searchProject(this.searchBy, this.searchText)
      .subscribe(
        (response) => {
          this.projects = response;
        },
        (error) => {
          console.log(error)
        }
      )
  }



}
