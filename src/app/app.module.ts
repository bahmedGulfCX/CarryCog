import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { EventEmitter } from 'protractor';
import { RefreshHeaderService } from './shared/refresh-header.service';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { ScriptService } from './shared/script.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MypostsComponent } from './myposts/myposts.component';
import { UpdatepostComponent } from './updatepost/updatepost.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    ChangepasswordComponent,
    VerifyemailComponent,
    ResetPasswordComponent,
    CreatepostComponent,
    MypostsComponent,
    UpdatepostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
     ToastrModule.forRoot({
       progressBar: true,
       timeOut: 10000
     }),
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
RefreshHeaderService,
ScriptService],
  bootstrap: [AppComponent]
})
export class AppModule { }
