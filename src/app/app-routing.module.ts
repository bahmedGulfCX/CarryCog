import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent }          from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { MypostsComponent } from './myposts/myposts.component';
import { UpdatepostComponent } from './updatepost/updatepost.component';
import { ActivateuserComponent } from './activateuser/activateuser.component';


const routes: Routes = [
  {path:'', component: HomeComponent },
  {path:'Home', component: HomeComponent},
  {path:'createpost', component: CreatepostComponent},
  {path:'login', component: LoginComponent},
  {path:'verifyemail', component: VerifyemailComponent},
  {path:'resetpassword/:ID', component: ResetPasswordComponent},
  {path:'changepassword', component: ChangepasswordComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'myposts',component: MypostsComponent},
  {path:'updatepost', component: UpdatepostComponent},
  {path:'activateuser/:Email',component: ActivateuserComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
