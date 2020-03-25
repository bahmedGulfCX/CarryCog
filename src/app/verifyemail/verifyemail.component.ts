import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyemailComponent implements OnInit {

  loadAPI: Promise<any>;
  constructor(private router:Router,public service:UserService,private toastr:ToastrService) { 

  }

  ngOnInit(): void {
    this.service.emailModel.reset();
  }

 
  onSubmit() {
    var result =this.service.verifyEmail();
    result.subscribe(
      (res: any) => {
         if (res.succeeded) {
          this.service.emailModel.reset();
          this.service.verifyEmailObject = res;
          this.toastr.success('Please update your password.', 'Email Verified');
          this.router.navigateByUrl("/resetpassword");
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
