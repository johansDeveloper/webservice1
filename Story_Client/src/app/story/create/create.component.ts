import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


import { StoryService } from '../story.service';
import { Story } from '../../core/model/story';



@Component({
  selector: 'create-story',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [StoryService]
})
export class CreateComponent implements OnInit {

  private backUrlParams: Object = {};


   private submitted: boolean = false;
  
   // Form Related Variables
  private form: FormGroup;
  private formControArray = [];
  private storyFormObject: Story = new Story();

  private title = new FormControl(this.storyFormObject.title);
  private body = new FormControl(this.storyFormObject.body);
  private publishedAt = new FormControl(this.storyFormObject.publishedAt);
  
  constructor(
    private formBuilder: FormBuilder,

    private route: ActivatedRoute,
    private router: Router,
    private service: StoryService, ) { }

  ngOnInit() {
    this.initForm(); 
  }


   private initForm(): void {
    this.form = this.formBuilder.group({
      title: this.title,
      body: this.body,
      publishedAt: this.publishedAt
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
    
    
    this.service
      .createStory(formData)
      .subscribe((response) => {
       this.router.navigate([`/story-list`]); 
      }, (error) => {
        this.submitted = !this.submitted;
    
      });
  }
};


