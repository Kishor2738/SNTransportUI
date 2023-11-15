import { environment } from "../environments/environment";

export class Appsettings {
    //public readonly API_ENDPOINT='https://localhost:44369';
    public readonly API_ENDPOINT:string='';
    
    //API_ENDPOINT_Docs Can be set to blank to point to UI domain
    //public readonly API_ENDPOINT_Docs='https://localhost:44369';
    public readonly API_ENDPOINT_Docs:string='';

    constructor() {
        this.API_ENDPOINT=environment.API_ENDPOINT;
        this.API_ENDPOINT_Docs=environment.API_ENDPOINT_Docs;
     }
}
