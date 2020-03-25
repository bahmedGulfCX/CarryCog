import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ScriptService } from '../shared/script.service';


@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  submitted = false;
  fromCity:string;
  toCity:string;
  
  loadAPI: Promise<any>;
  constructor(private _scriptLoader:ScriptService, public _homeService:HomeService,private toastr:ToastrService, private router:Router) { 
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
  });
  }
  
  ngOnInit(): void {
    this._homeService.CreatePostModel.reset();
   
  }
  


  public loadScript() {        
    var isFound = false;
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
     console.log(this.fromCity);
}
ToCityChange(toCity: string){
  this.toCity = toCity;
     console.log(this.toCity);   
}
  onSubmit() {
    this.submitted = true;
   
    var result =this._homeService.createPost(this.fromCity,this.toCity);
    result.subscribe(
      (res: any) => {
         if (res.succeeded) {
          this._homeService.CreatePostModel.reset();
          this.toastr.success('Post has been created and waiting for Admins approval.', 'Waiting For Approvals');
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

  // onSubmitWithForm(form: NgForm) {
  //   var result =this._homeService.createPostWithForm(form.value);
  //   result.subscribe(
  //     (res: any) => {
  //        if (res.succeeded) {
  //         this._homeService.CreatePostModel.reset();
  //         this.toastr.success('Post has been created and waiting for Admins approval.', 'Waiting For Approvals');
  //         this.router.navigateByUrl("/Home");
  //       } else {
  //         console.log(res.errors);
  //         this.toastr.error(res.errors, 'Error');
  //       }
  //     },
  //     err => {       
  //       this.toastr.error(err.error.errors, 'Error');
  //     }
  //   );
  // }

}
