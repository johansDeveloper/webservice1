import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


import { StoryService } from '../story.service';
import { Story } from '../../core/model/story';



@Component({
  selector: 'story-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [StoryService]
})
export class ListComponent implements OnInit {

  private backUrlParams: Object = {};
  public stories;  
   // Form Related Variables
  
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: StoryService, ) { }

  ngOnInit() {
   this.fetchStories()
  }

  private fetchStories() {
    this.service
      .getStories(
      ).subscribe((response) => {
        this.stories = response
        this.stories.forEach(element => {
          //sconsole.log(element)
          var date = new Date(element.publishedAt);
          var str = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
          element["date"] = str
          
        });
        
       console.log(this.stories) 
      });
  }

  private onClickEdit($event) {
    var id  = $event.id
    this.router.navigate([`/edit-story/` + id ]);
  }

  private onClickCreate() {
    this.router.navigate([`/create-story`]);
  }

  private onClickDelete($event) {
    this.service.deleteStory($event.id)
    .subscribe((response) => {
      this.fetchStories()
      console.log(response)
    }, (error) => {
      
    });
  }

 

  
}

