import { AccountService } from './../services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.regiser(this.model).subscribe(
      (data) => {
        console.log(data);
        this.cancel();
      },
      error => console.log(error)
    )
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
