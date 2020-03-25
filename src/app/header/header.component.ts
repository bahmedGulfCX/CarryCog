import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshHeaderService } from '../shared/refresh-header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loadAPI: Promise<any>;
  constructor(private router:Router,private _headerService:RefreshHeaderService) { 
 
  }

  token: boolean = false;
  ngOnInit(): void {
    if (this._headerService.subsVar==undefined) {    
      this._headerService.subsVar = this._headerService.    
      RefreshHeader.subscribe((name:string) => {    
        this.RefreshNavBar();    
      });    
    }   
    this.RefreshNavBar();
  }

  RefreshNavBar(){
    if (localStorage.getItem('token') != null)
    this.token = true;
    else
    this.token = false;
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Home']);
    this.RefreshNavBar();
  }

}
