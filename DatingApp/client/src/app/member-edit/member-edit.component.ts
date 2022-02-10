import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AccountService } from './../services/account.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../models/member';
import { User } from '../models/user';
import { MembersService } from '../services/members.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: Member;
  user: User;
  @ViewChild('editForm') editForm: NgForm

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(
    private memberService: MembersService,
    private accountService: AccountService,
    private toastr: ToastrService) {

      this.accountService.currentUser$.pipe(take(1)).subscribe( user => this.user = user as User);
    }

  ngOnInit(): void { this.loadMember(); }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => { this.member = member; });
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(()=>{
      console.log(this.member);
      this.toastr.success("Profile update successfully");
      this.editForm.reset(this.member);
    });

  }

}
