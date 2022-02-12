import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}users`)
  }

  getMember(username: string) // creating a function that brings a "member" from a server
  : Observable<Member> // turning the function to one that can let you know when she is back with the "member"
  { return this.http.get<Member>(`${this.baseUrl}users/${username}`) } // ??? where from come the "member"

  updateMember(member:Member){
    return this.http.put(`${this.baseUrl}users`, member);
  }
}
