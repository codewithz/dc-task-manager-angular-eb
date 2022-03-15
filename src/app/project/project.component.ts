import { Component, Input, OnInit } from '@angular/core';
import { Project } from './../projects/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input("currentProject") project: Project | any;

  constructor() { }

  ngOnInit(): void {
  }

}
