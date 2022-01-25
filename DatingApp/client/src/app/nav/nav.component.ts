import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  // loggedIn: boolean = false;
  currentUser$: Observable<User | null>;

  constructor
  ( private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService)
    {
      this.currentUser$ = this.accountService.currentUser$;
    }

  ngOnInit(): void {

  }

  login(){
    this.accountService.login(this.model)
    .subscribe(response => {
      this.router.navigateByUrl('/members');
      console.log(response);
    });
  }

  logout(){
    this.router.navigateByUrl('');
    this.accountService.logout();
  }

}
