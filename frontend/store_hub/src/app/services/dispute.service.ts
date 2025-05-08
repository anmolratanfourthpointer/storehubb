import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisputeService {
  private baseUrl = 'http://localhost:5000';


  constructor(private http: HttpClient) { }


  addDispute(disputeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/tabaledata/add`, disputeData);
  }


  getDispute(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/tabaledata`);
  }

  uploadForm(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
   
  editDispute(updatedDispute:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}/admin/edit/dispute`, updatedDispute);
  }

}



