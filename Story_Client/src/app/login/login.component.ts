import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { environment } from 'environments/environment';

import { User } from '../core/model/user';
import { Alert } from '../core/model/alert.class';
import { AlertService } from '../core/service/alert/alert.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, AlertService]
})
export class LoginComponent implements OnInit {

  private backUrlParams: Object = {};


  private submitted: boolean = false;
 
  // Form Related Variables
 private form: FormGroup;
 private formControlArray = [];
 private userFormObject: User = new User();

 private username = new FormControl(this.userFormObject.username);
 private password = new FormControl(this.userFormObject.password);
 
 constructor(
   private formBuilder: FormBuilder,
   private route: ActivatedRoute,
   private router: Router,
   private alert: AlertService,
   private service: LoginService, ) { }

 ngOnInit() {
   this.initForm(); 
 }


  private initForm(): void {
   this.form = this.formBuilder.group({
     username: this.username,
     password: this.password
   }, {
       validator: (control: FormControl) => {
        
       }
     });
 }

 // Form Submitssion
 private onSubmit(): void {
    this.submit(); 
 }

 private submit(): void {

   this.submitted = !this.submitted;
   let formData: any = Object.assign({}, this.form.value);
   console.log(formData);
   
   this.service
     .doLogin(formData)
     .subscribe((response) => {
         this.submitted = !this.submitted;
         localStorage.setItem("accessToken", response.accessToken);
         let alert = new Alert();
         alert.type = 'success';
         alert.title = 'Success';
         alert.message = 'Successfully registered partner';
         this.alert.setAlert(alert);
         this.router.navigate([`/story-list`]);     
     }, (error) => {
       this.submitted = !this.submitted;
       let alert = new Alert();
       alert.type = 'danger';
       alert.title = '';
       alert.message = error.message;
       this.alert.setAlert(alert);
     });
 }
};


