import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from './../projects/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input("currentProject") project: Project | any;
  @Input("index") index: number = 0;

  @Output("editClick") editClick = new EventEmitter();
  @Output("deleteClick") deleteClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onEditClick(event: any, index: number) {
    this.editClick.emit({ event, index })
  }

  onDeleteClick(event: any, index: number) {
    this.deleteClick.emit({ event, index })
  }

}
