import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    if (this.members.length) { return of(this.members) }
    return this.http.get<Member[]>(`${this.baseUrl}users`).pipe(tap(members => this.members = members)
    )
  }

  getMember(username: string) // creating a function that brings a "member" from a server
    : Observable<Member> // turning the function to one that can let you know when she is back with the "member"
  {
    const member = this.members.find(x => x.username == username);
    if (member) { return of(member); }

    return this.http.get<Member>(`${this.baseUrl}users/${username}`) // ??? where from come the "member"
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseUrl}users`, member).pipe(
      tap(_ => {
        const index = this.members.findIndex(x => x.id === member.id);
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId: number) {//: Observable<any> // optional
    return this.http.put(`${this.baseUrl}users/set-main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(`${this.baseUrl}users/delete-photo/${photoId}`);
  }
}
