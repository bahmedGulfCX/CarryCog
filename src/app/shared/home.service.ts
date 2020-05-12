import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { CreatepostComponent } from '../createpost/createpost.component';
import { UserService } from './user.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //RequestBody
  
  constructor(private fb: FormBuilder, private http: HttpClient, private userInfo:UserService) { }
  readonly BaseURI = environment.baseUrl;
  readonly myCutomRegex = '^[^,\n]*((,[^,\n]*){2}$)';

  CreatePostModel = this.fb.group({    
    FromCity: ['', { validators: [Validators.required,Validators.pattern(this.myCutomRegex)], updateOn: "blur" }],
    ToCity: ['', { validators: [Validators.required,Validators.pattern(this.myCutomRegex)], updateOn: "blur" }],
    TravelDate: [''],
    Cost: [''],
    SpaceAvailable: [''],
    Details: [''],
    PostType: [''],
    Currency: ['']
  });
  
  EditPostModel = this.fb.group({   
    PostsID: [''], 
    PostNumber: [''],
    FromCity: ['', { validators: [Validators.required,Validators.pattern(this.myCutomRegex)] }],
    ToCity: ['', { validators: [Validators.required,Validators.pattern(this.myCutomRegex)] }],
    TravelDate: ['2020-02-02'],
    Cost: ['0'],
    SpaceAvailable: [''],
    Details: [''],
    PostType: [''],
    Currency: [''],
    CurrencySymbolsId:[''],
    UserID:[''],
    FromCountry:[''],
    ToCountry:['']
  });

  ListOfCities;

  getAllPosts() {
    return this.http.get(this.BaseURI+'/posts');
  }
 
  getAllPostsForUser(userID:string) {
    return this.http.get(this.BaseURI+'/posts/getallpostforuser/'+userID);
  }
  updatePostForUser(postID){
    return this.http.get(this.BaseURI+'/posts/'+postID);
  }
  togglePostType(e){
    this.CreatePostModel.value.PostType = e.target.checked;    
  }

  createPost(FromCity:string,ToCity:string){   
    console.log(this.CreatePostModel.value);
    var body={
    FromCity: FromCity,
    ToCity: ToCity,
    TravelDate: this.CreatePostModel.value.TravelDate != null ? this.CreatePostModel.value.TravelDate : '2020-02-02',
    Cost: this.CreatePostModel.value.Cost != null ? this.CreatePostModel.value.Cost : 0,
    SpaceAvailable: this.CreatePostModel.value.SpaceAvailable,
    Details: this.CreatePostModel.value.Details,        
    PostType: this.CreatePostModel.value.PostType,
    CurrencySymbols: this.CreatePostModel.value.Currency
    }
    var userID = localStorage.getItem('userID');
    return this.http.post(this.BaseURI+'/posts/createpost/'+userID,body);
  }

  editPost(FromCity:string,ToCity:string){  

    var body={
    postID:this.EditPostModel.value.PostsID,
    FromCity: FromCity ?? this.EditPostModel.value.FromCity,
    ToCity: ToCity ?? this.EditPostModel.value.ToCity,
    TravelDate: this.EditPostModel.value.TravelDate,
    Cost: this.EditPostModel.value.Cost,
    SpaceAvailable: this.EditPostModel.value.SpaceAvailable,
    Details: this.EditPostModel.value.Details,        
    PostType: this.EditPostModel.value.PostType,
    CurrencySymbols: this.EditPostModel.value.Currency
    }
    var postID = body.postID;
    return this.http.put(this.BaseURI+'/posts/update/'+postID,body);
  }

  createPostWithForm(formData){   
    var body = formData;
    var userID = localStorage.getItem('userID');
    return this.http.post(this.BaseURI+'/posts/createpost/'+userID,body);
  }

  searchPosts(FromCity:string,ToCity:string,PostType:string){
    var body = {
      FromCity: FromCity,
      ToCity: ToCity,
      PostType: PostType
    };
    var result = this.http.post(this.BaseURI+'/posts/SearchPosts', body);    
    return result;
  }
  sendRequest(post){
    var message = null;

    if(post.PostType == 'Traveller')
    message = 'Hey, I am interested in your post, that you are traveling from '+post.FromCity+' to '+post.ToCity+'. I just wanted to order something please reply back. Thanks';
    else
    message = 'Hey, I am interested in your post, that you are looking for someone coming from '+post.FromCity+' to '+post.ToCity+'. I have free space please reply back. Thanks';

    var body = {
      FromMessage: 1,
      ToMessage: post.UserID,
      Message: message
    };
   // return this.http.post(this.BaseURI+'/Inbox/requestpost/'+post.Id);
   //if(post.PostType == "Traveller")
   console.log(body);

  }
  getListOfCurrencies(){
    return this.http.get(this.BaseURI+'/posts/getcurrencies');
  }

}
