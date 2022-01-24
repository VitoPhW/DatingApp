import { AccountService } from './../services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.regiser(this.model).subscribe(
      (data) => {
        console.log(data);
        this.cancel();
      },
      error => {
        this.toastr.error(error.error, 'Register error', {progressBar: true});
        console.log(error);
      }
    )
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
