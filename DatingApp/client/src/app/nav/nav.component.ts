import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  // loggedIn: boolean = false;
  currentUser$: Observable<User | null>;

  constructor(private accountService: AccountService) {
    this.currentUser$ = this.accountService.currentUser$;
   }

  ngOnInit(): void { }

  login(){
    this.accountService.login(this.model)
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log('Failed to login', error);
    }, () => {
      console.log('Login complete ✨')
    });
  }

  logout(){
    this.accountService.logout();
  }

}
