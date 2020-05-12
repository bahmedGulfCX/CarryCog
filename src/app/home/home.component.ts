import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HomeService } from '../shared/home.service';
import { Router } from '@angular/router';
import * as data from '../JsonData/FilteredCities.json';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  submitted = false;
  fromCity:string;
  toCity:string;
  fromCountry:string;
  toCountry:string;
  postType:string;
  fromCityBool:boolean = true;
  toCityBool:boolean = true;
  limitedPosts;
  postResults;
  loadAPI: Promise<any>;
  
  readonly myCutomRegex = '^[^,\n]*((,[^,\n]*){2}$)';
  constructor(private fb: FormBuilder, private router:Router,private toastr:ToastrService, public _homeService:HomeService, public datepipe: DatePipe) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
  });
   }
   
  ngOnInit(): void {
    this.loadposts();
  }

  public loadScript() {        
    var isFound = false;
    console.log('inside load script function');
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }

    if (!isFound) {
        var dynamicScripts = ["./assets/js/jquery.js","./assets/js/moment.js","./assets/js/bootstrap.js"
        ,"./assets/js/owl-carousel.js"
        ,"./assets/js/blur-area.js"
,"./assets/js/icheck.js"
,"./assets/js/gmap.js"
,"./assets/js/magnific-popup.js"
,"./assets/js/ion-range-slider.js"
,"./assets/js/sticky-kit.js"
,"./assets/js/smooth-scroll.js"
,"./assets/js/fotorama.js"
,"./assets/js/bs-datepicker.js"
,"./assets/js/typeahead.js"
,"./assets/js/quantity-selector.js"
,"./assets/js/countdown.js"
,"./assets/js/window-scroll-action.js"
,"./assets/js/fitvid.js"
,"./assets/js/youtube-bg.js"
,"./assets/js/custom.js"];

        for (var i = 0; i < dynamicScripts.length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('body')[0].appendChild(node);
        }

    }
}
fromCityChange(fromCity: string){
  this.fromCity = fromCity;
  if(this.fromCity != ''){
  if(!this.fromCity.match('^[^,\n]*((,[^,\n]*){2}$)')){
  this.fromCityBool = false;
  }
  else{
    this.fromCityBool = true;
  }
}
 
}
ToCityChange(toCity: string){
  console.log(toCity);
this.toCity = toCity;
if(this.toCity != ''){
if(!this.toCity.match('^[^,\n]*((,[^,\n]*){2}$)')){
  this.toCityBool = false;
  console.log('In if statement of toCity: '+this.toCityBool);
  console.log(this.toCity);
  }
  else{
    this.toCityBool = true;
    console.log('In Else statement of toCity: '+this.toCityBool);
    console.log(this.toCity);
  }
}  
}
SearchPostsModel = this.fb.group({
  FromCity: ['', { updateOn: "blur" }],
  ToCity: ['', { updateOn: "blur" }],
  PostType: ['Search For', Validators.required]
});
  loadposts(): void{
    this._homeService.getAllPosts().subscribe(
      (res: any) => {
         if (res.succeeded == 'True') {
           this.postResults = res.data;          
        } else {
          console.log(res.errors);
         // this.postResults = res.data;
         // this.toastr.error(res.errors, 'No Record Found!');
        }
      },
      err => {
        // if(err.message.includes('Http failure')){
        //   this.toastr.error("Server not available",'Error');
        // }
        // else{
          console.log(err.message);
        // this.toastr.error(err.message, 'Error');
        // }
      }
    );

  }
  
  LoadAllPosts(){
    this._homeService.getAllPosts().subscribe((data)=>{
      this.postResults= data;
    });    
  }
 
  onClickSearch() {
    this.submitted = true;
    this.SearchPostsModel.value.FromCity = this.fromCity;
    this.SearchPostsModel.value.ToCity = this.toCity;
    this.postType = this.SearchPostsModel.value.PostType;
    console.log(this.SearchPostsModel);
    if(this.toCity.match('^[^,\n]*((,[^,\n]*){2}$)') && this.fromCity.match('^[^,\n]*((,[^,\n]*){2}$)') && this.postType != ''){
     this._homeService.searchPosts(this.fromCity,this.toCity,this.postType).subscribe(
      (res: any) => {
         if (res.succeeded == 'True') {
           this.postResults = res.data;          
        } else {
          console.log(res.errors);
          this.postResults = res.data;
          this.toastr.error(res.errors, 'No Record Found!');
        }
      },
      err => {
        // if(err.message.includes('Http failure')){
        //   this.toastr.error("Server not available",'Error');
        // }
        // else{
          console.log(err.message);
        // this.toastr.error(err.message, 'Error');
        // }
      }
    );
  }else{
  this.loadposts();
  }
 }

  //Send post type to request service for automated message on request
  //Send fromCity and toCity to request to concatinate in message.
  onRequest(postID){
    var post = this.postResults.find(x => x.PostsID == postID);
    this._homeService.sendRequest(post);
    //this._homeService.sendRequest(post).subscribe((data)=>{
      //console.log(data);
    //});
  }

}
