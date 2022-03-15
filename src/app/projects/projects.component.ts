import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientLocation } from '../client-location/client-location';

import { Project } from './project';
import { ProjectsService } from './projects.service';
import { ClientLocationsService } from '../client-location/client-locations.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'

import * as $ from 'jquery'
import { AlertService } from './../alert/alert.service';
import { getProjectLoaded, getProjects, RootReducerState } from '../reducers';
import { Store } from '@ngrx/store';
import { ProjectsListRequestedAction, ProjectsListSuccessAction } from './../actions/projects-action';
import { getProjectLoading } from './../reducers/index';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  showLoading: boolean = true;

  projects: Project[] = [];
  clientLocations: ClientLocation[] = [];

  newProject: Project = new Project();

  projectToBeEdited: Project = new Project();

  indexOfProjectEdited: number = 0;

  projectToBeDeleted: Project = new Project();

  indexOfProjectToBeDeleted: number = 0;

  searchBy: string = '';
  searchText: string = '';

  @ViewChild("newProjectForm") newForm: NgForm | any;
  @ViewChild("editProjectForm") editForm: NgForm | any;

  constructor(private service: ProjectsService,
    private clientLocationService: ClientLocationsService,
    private alertService: AlertService,
    private store: Store<RootReducerState>
  ) { }

  ngOnInit(): void {

    this.getProjects();
    this.getClientLocations();


  }

  getProjects() {

    let projectLoaded = false;
    let projectLoading = false;

    const loading = this.store.select(getProjectLoading);
    const loaded = this.store.select(getProjectLoaded);
    const getProjectsData = this.store.select(getProjects);

    loading.subscribe(
      (data) => {
        projectLoading = data;
      }
    )

    loaded.subscribe(
      (data) => {
        projectLoaded = data;
      }
    )


    if (!projectLoaded && !projectLoading) {

      this.store.dispatch(new ProjectsListRequestedAction());

      this.service.getProjects()
        .subscribe(
          (response) => {
            //    this.projects = response;
            this.store.
              dispatch(new ProjectsListSuccessAction({ data: response }))
            this.showLoading = false
          }
        )
    }

    getProjectsData.subscribe(
      (data) => {
        this.projects = data;
        this.showLoading = false
      }
    )


  }

  getClientLocations() {
    this.clientLocationService.getClientLocations()
      .subscribe(
        (response) => {
          this.clientLocations = response
        }
      )
  }

  onCreateProjectClicked() {
    this.newForm.resetForm();
    // This will reset the form including the validation status
  }

  onSave() {
    if (this.newForm.valid) {
      this.newProject.clientLocation = this.clientLocations.find(
        (client) => client.clientLocationID == this.newProject.clientLocationID
      )
      this.service.createProject(this.newProject)
        .subscribe(
          (response) => {
            let createdProject: Project = response;
            this.projects.push(createdProject);

            // Reset the form 
            this.newProject = new Project();
            //Showing the Toast
            this.alertService.showSuccess("Project Addition", "Success")
            // Make the JQuery Call 
            $('#newProjectCancel').trigger('click')
          },
          (error) => {
            console.log(error)
          }
        )
    }
  }

  onEditClicked(event: any, index: number) {
    this.indexOfProjectEdited = index;
    this.projectToBeEdited = { ...this.projects[index] }

  }

  onUpdate() {
    if (this.editForm.valid) {
      this.projectToBeEdited.clientLocation = this.clientLocations.find(
        (client) => client.clientLocationID == this.projectToBeEdited.clientLocationID
      )
      this.service.updateProject(this.projectToBeEdited)
        .subscribe(
          (response) => {
            this.projects[this.indexOfProjectEdited] = response;
            this.alertService.showInfo("Project Updated", "Success")
            $('#editProjectCancel').trigger('click');
          },
          (error) => {
            console.log(error)
          }
        )
    }
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
