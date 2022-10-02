import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {
  readonly inspectionAPIUrl = "https://localhost:7199/api";
  readonly inspectionEndPoint = "/inspections";
  readonly inspetcionTypesEndPoint = "/inspectiontypes";
  readonly statusEndPoint = "/status";

  constructor(private http:HttpClient) { }
 
  getInspectionList(): Observable<any[]> {
    return this.http.get<any>(this.inspectionAPIUrl +this.inspectionEndPoint);
  }

  addInspection(data:any) {
    return this.http.post(this.inspectionAPIUrl + this.inspectionEndPoint, data);
  }

  updateInspection(id:number|string, data:any){
    return this.http.put(this.inspectionAPIUrl + this.inspectionEndPoint +`/${id}`, data);
  }
   
  deleteInspection(id:number|string){
    return this.http.delete(this.inspectionAPIUrl + this.inspectionEndPoint +`/${id}`);
  }

  getInspectionTypesList(): Observable<any[]> {
    return this.http.get<any>(this.inspectionAPIUrl + this.inspetcionTypesEndPoint);
  }
  
  addInspectionType(data:any) {
    return this.http.post(this.inspectionAPIUrl + this.inspetcionTypesEndPoint, data);
  }
  
  updateInspectionType(id:number|string, data:any) {
    return this.http.put(this.inspectionAPIUrl + this.inspetcionTypesEndPoint + `/${id}`, data);
  }

  deleteInspectionType (id:number|string) {
    return this.http.delete(this.inspectionAPIUrl + this.inspetcionTypesEndPoint + `/${id}`);
  }

  getStatusList(): Observable<any[]> {
    return this.http.get<any>(this.inspectionAPIUrl + this.statusEndPoint);
  }

  addStatus(data:any) {
    return this.http.post(this.inspectionAPIUrl + this.statusEndPoint, data);
  }

  updateStatus(id:number|string, data:any){
    return this.http.put(this.inspectionAPIUrl + this.statusEndPoint+`/${id}`,data);
  }

  deleteStatus(id:number|string){
    return this.http.delete(this.inspectionAPIUrl + this.statusEndPoint+ `/${id}`);
  }
}
