import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


import { RegistrationService } from './registration.service';
import { environment } from './../../environments/environment';
import { User } from '../core/model/user';
import { Alert } from '../core/model/alert.class';
import { AlertService } from '../core/service/alert/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService, AlertService]
})
export class RegistrationComponent implements OnInit {

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
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private service: RegistrationService, ) { }

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
      .doRegistration(formData)
      .subscribe((response) => {
        debugger;
        console.log(response)

        if (response.username != "") {
          this.submitted = !this.submitted;
          let alert = new Alert();
          alert.type = 'success';
          alert.title = 'Success';
          alert.message = 'Successfully registered partner';
          this.alert.setAlert(alert);
          this.router.navigate([`/login`]);
        } else {
           alert("Something went wrong")
        }
        
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


