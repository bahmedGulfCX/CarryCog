import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RefreshHeaderService } from '../shared/refresh-header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = {
    Email: '',
    Password: ''
  }
  loadAPI: Promise<any>;
  constructor(public service: UserService, private _headerService:RefreshHeaderService, private router: Router,private toaster:ToastrService) { 
  
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
    this.router.navigateByUrl('/Home');
  }
 

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
     (res: any) => {
        localStorage.setItem('userName',res.FirstName+' '+res.LastName);
        localStorage.setItem('userID',res.Id);
        localStorage.setItem('token', res.Token);
        console.log(this.service.userObject);
        this._headerService.onRefreshHeader();
        this.router.navigateByUrl('/Home');
      },
      err => {
        if (err.status == 400){
         this.toaster.error(err.error.message, 'Activation failed.');
         console.log(err.error.message);
        }
        else{
        this.toaster.error('Incorrect username or password.', 'Authentication failed.');
        console.log(err);
        }
      }     
    );
  }
}
