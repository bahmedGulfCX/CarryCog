import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { RefreshHeaderService } from '../shared/refresh-header.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  loadAPI: Promise<any>;
  constructor(public service: UserService,private router:Router,private toastr:ToastrService,private _headerService:RefreshHeaderService) { 

  }

  ngOnInit(): void {
    this.service.formModel.reset();
  }
  
 

  onSubmit() {
    var result =this.service.register();
    result.subscribe(
      (res: any) => {
         if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('Activation code has been sent to your email. Please activate your account.', 'Registration successful');
          this._headerService.onRefreshHeader();
          this.router.navigateByUrl("/Home");
        } else {
          console.log(res.errors);
          this.toastr.error(res.errors, 'Error');
        }
      },
      err => {       
        this.toastr.error(err.error.errors, 'Error');
      }
    );
  }

}

