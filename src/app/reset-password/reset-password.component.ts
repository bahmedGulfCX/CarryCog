import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loadAPI: Promise<any>;
  constructor(private router:Router, private route: ActivatedRoute,public service:UserService,private toastr:ToastrService) { 

  }
  userID;
  customUserID;
  ngOnInit(): void {
    //this.service.ResetPasswordModel.reset();
    this.userID = this.route.snapshot.paramMap.get('ID');
    if(this.userID != null){
    this.customUserID = this.userID.split('|');
    }
  }

  
  

  onSubmit() {
    var result = this.service.resetPassword(this.customUserID[1]);
    result.subscribe(
      (res: any) => {
         if (res.succeeded) {
          this.service.ResetPasswordModel.reset();
          this.service.verifyEmailObject = res;
          this.toastr.success('Password has been updated successfully', 'Password Updated');
          this.router.navigateByUrl("/login");
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
