import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import { ToastRef, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  loadAPI: Promise<any>;
  constructor(public service: UserService,private router:Router,private toastr:ToastrService) {
   }
 
  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.service.changePasswordModel.reset();
    }else{
      this.toastr.error('Please login / register first.', 'No Session Found!');
          this.router.navigateByUrl("/login");
    }
  }
  onSubmit() {
    var result =this.service.changePassword();
    result.subscribe(
      (res: any) => {
         if (res.succeeded) {
          this.service.changePasswordModel.reset();
          this.toastr.success('Password has been updated successfully.', 'Password Updated');
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
