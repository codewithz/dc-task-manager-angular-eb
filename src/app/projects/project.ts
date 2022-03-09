import { ClientLocation } from "../client-location/client-location";

export class Project {

    projectID: number = 0;
    projectName: string | null = null;
    dateOfStart: string | null = null;
    teamSize: number = 0;
    active: boolean | any;
    status: string | any;
    clientLocationID: number | any;
    clientLocation: ClientLocation | any;
}
