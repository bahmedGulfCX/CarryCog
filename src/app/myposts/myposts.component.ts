import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { Router } from '@angular/router';
import * as data from '../JsonData/FilteredCities.json';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {
  
  postResults;
  post;
  loadAPI: Promise<any>;
  constructor(private router:Router, public _homeService:HomeService) {   
   }

  ngOnInit(): void {
    this.loadMyPosts();
  }
  
  loadMyPosts(): void{
    this._homeService.getAllPostsForUser(localStorage.getItem('userID')).subscribe((data)=>{
      console.log(data);
      this.postResults = data;
    });    
  }
  onPostEdit(postID){
    
    this._homeService.updatePostForUser(postID).subscribe((data)=>{
      this._homeService.EditPostModel.setValue(data);      
    });   
    
    
    this.router.navigateByUrl('/updatepost');
  }
}
