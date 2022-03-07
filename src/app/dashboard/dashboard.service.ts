import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getTeamMembersSummary(){
    return [
      { region: "East", teamMembersCount: 20, totalUnavailableMembers: 4 },
      { region: "West", teamMembersCount: 15, totalUnavailableMembers: 8 },
      { region: "North", teamMembersCount: 17, totalUnavailableMembers: 1 },
      { region: "South", teamMembersCount: 15, totalUnavailableMembers: 6 },
    ]
  }
}
