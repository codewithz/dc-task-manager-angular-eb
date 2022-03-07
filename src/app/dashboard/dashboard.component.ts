import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

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

  today: any;

  clients: any = [];
  projects: any = [];
  years: any = [];
  teamMembersSummary: any = [];
  teamMembers: any = [];

  constructor(private service: DashboardService) { }

  ngOnInit(): void {

    this.today = new Date();

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
    this.projects = [
      'Project A',
      'Project B',
      'Project C',
      'Project D',
    ]

    for (let y = 2022; y >= 2010; y--) {
      this.years.push(y);
    }

    this.teamMembersSummary = this.service.getTeamMembersSummary();

    this.teamMembers = [
      {
        region: 'East',
        members: [
          { id: 1, name: 'Tom', status: 'Available' },
          { id: 2, name: 'Alex', status: 'Available' },
          { id: 3, name: 'Mike', status: 'Busy' },
          { id: 4, name: 'John', status: 'Busy' },
        ]
      },
      {
        region: 'West',
        members: [
          { id: 5, name: 'Leanord', status: 'Available' },
          { id: 6, name: 'Sheldon', status: 'Busy' },
          { id: 7, name: 'Raj', status: 'Busy' },
          { id: 8, name: 'Howard', status: 'Available' },
        ]
      },
      {
        region: 'North',
        members: [
          { id: 9, name: 'Harvey', status: 'Available' },
          { id: 10, name: 'Donna', status: 'Busy' },
          { id: 11, name: 'Mike', status: 'Busy' },
          { id: 12, name: 'Rachel', status: 'Available' },
        ]
      },
      {
        region: 'South',
        members: [
          { id: 13, name: 'Ford', status: 'Available' },
          { id: 14, name: 'Miller', status: 'Busy' },
          { id: 15, name: 'James', status: 'Busy' },
          { id: 16, name: 'Anna', status: 'Available' },
        ]
      },
    ]



  }

  onProjectChange(event: any) {
    let projectName: string = event.target.innerHTML;
    projectName = projectName.trim();
    console.log(projectName)
    if (projectName == 'Project A') {
      this.projectCost = 2334609;
      this.currentExpenditure = 87998;
      this.availableFunds = 43534;
    }
    if (projectName == 'Project B') {
      this.projectCost = 3234609;
      this.currentExpenditure = 78998;
      this.availableFunds = 40004;
    }
    if (projectName === 'Project C') {
      this.projectCost = 4634609;
      this.currentExpenditure = 74998;
      this.availableFunds = 67004;
    }
    if (projectName === 'Project D') {
      this.projectCost = 3784609;
      this.currentExpenditure = 79998;
      this.availableFunds = 123004;
    }

  }

}
