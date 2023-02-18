import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


import { StoryService } from '../story.service';
import { Story } from '../../core/model/story';



@Component({
  selector: 'edit-story',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [StoryService]
})
export class EditComponent implements OnInit {

  private backUrlParams: Object = {};


  private submitted: boolean = false;
  private storyId;
  private story;

  private titleFormatCtrl: FormControl;
  private bodyFormCtrl: FormControl;
  
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
    this.route.params
    .subscribe((params) => this.storyId = params['id']);
    this.fetchStoryById(this.storyId) 
  }

  private initFormCtrl(story) {
    this.titleFormatCtrl = new FormControl(story.title, [Validators.required]);
    this.bodyFormCtrl = new FormControl(story.body, [Validators.required]);
  }


   private initForm(): void {
    this.form = this.formBuilder.group({
      title: this.titleFormatCtrl,
      body: this.bodyFormCtrl,
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

  private fetchStoryById(id) {
    this.service
      .getStoryById(id).subscribe((response) => {
        this.story = response
        this.initFormCtrl(this.story)
        this.initForm();
      });
  }

  private submit(): void {

    this.submitted = !this.submitted;
    let formData: any = Object.assign({}, this.form.value);
    
    this.service
      .updateStory(this.storyId,formData)
      .subscribe((response) => {
       this.router.navigate([`/story-list`]); 
      }, (error) => {
        this.submitted = !this.submitted;
    
      });
  }
};


