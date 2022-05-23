import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient ) { }

  postDetail(data: any){
    return this.http.post<any>("http://localhost:3000/roofingClients/", data);
  }

  getDetail(){
    return this.http.get<any>("http://localhost:3000/roofingClients/");
  }

  putDetail(data:any, id: number){
    return this.http.put<any>("http://localhost:3000/roofingClients/" + id, data);
  }

  deleteDetail(id:number){
    return this.http.delete<any>("http://localhost:3000/roofingClients/" + id);
  }

  postEquip( data: any){
    return this.http.post<any>("http://localhost:3000/equipmentClients/", data);
  }

  getEquip(){
      return this.http.get<any>("http://localhost:3000/equipmentClients/");
  }

  putEquip(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/equipmentClients/" + id, data);
  }

  deleteEquip(id:number){
    return this.http.delete<any>("http://localhost:3000/equipmentClients/" + id);
  }
}
