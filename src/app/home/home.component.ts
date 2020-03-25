import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { Router } from '@angular/router';
import * as data from '../JsonData/FilteredCities.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  limitedPosts;
  postResults;
  loadAPI: Promise<any>;
  constructor(private router:Router, public _homeService:HomeService) {
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


  loadposts(): void{
    this._homeService.getAllPosts().subscribe((data)=>{
      this.limitedPosts = data;  
      this.postResults = this.limitedPosts;    
    });    
  }
  
  LoadAllPosts(){
    this._homeService.getAllPosts().subscribe((data)=>{
      this.postResults= data;
    });    
  }
 
  onClickSearch() {
    console.log(this._homeService.SearchPostsModel.value.FromCity);
    console.log(this._homeService.SearchPostsModel.value.ToCity);
    console.log(this._homeService.SearchPostsModel.value.PostType);
   // this._homeService.searchPosts().subscribe((data)=>{
    //  this.postResults = data;
    //});
    
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
