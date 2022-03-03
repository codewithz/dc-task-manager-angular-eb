import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  designation: string = '';
  username: string = '';
  noOfTeamMembers: number = 0;
  totalCostOfAllProjects: number = 0;
  pendingTasks: number = 0;
  upcomingProjects: number = 0;
  projectCost: number = 0;

  currentExpenditure: number = 0;
  availableFunds: number = 0;

  clients: any = [];

  constructor() { }

  ngOnInit(): void {

    this.designation = 'Team Leader';
    this.username = 'Tom Smith';
    this.noOfTeamMembers = 65;
    this.totalCostOfAllProjects = 255;
    this.pendingTasks = 15;
    this.upcomingProjects = 3;
    this.projectCost = 2334609;
    this.currentExpenditure = 87998;
    this.availableFunds = 43534;
    this.clients = [
      'ABC Technology',
      'XYZ Infotech',
      'MNO Industries'
    ]

  }

}
