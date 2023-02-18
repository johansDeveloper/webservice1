import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpQueryEncoderService } from '../core/service/http/http-query-encoder.service';
import { HttpRequestService } from '../core/service/http/http-service.service';

import { environment } from './../../environments/environment';

import 'rxjs/Rx';

@Injectable()
export class StoryService {

  constructor(
    private http: HttpRequestService,
    ) { }

  public createStory(storyData): Observable<any> {

    return this.http
      .post(`${environment.api.dev}/api/stories`, storyData, true)
      .map((response: any) => response.json())
      .catch(this.handleAuthError);
  } 

  public getStories(): Observable<any> {
    let url = `${environment.api.dev}/api/stories`;
    return this.http.get(url,'', false).map(response => response.json());
  }

  public getStoryById(storyId: any): Observable<any> {
    let url = `${environment.api.dev}/api/stories/${storyId}`;
    return this.http.get(url, '', true ).map(response => response.json());
  }

  public deleteStory(id) {
    return this.http
      .delete(`${environment.api.dev}/api/stories/${id}`)
      .map(response => response);
  }

  public updateStory(id: number, data): Observable<any> {
    return this.http
      .put(`${environment.api.dev}/api/stories/${id}`, data)
      .map(response => response);
  }
  
  private handleAuthError(error: Response): Observable<any> {
    return Observable.throw(error);
  }
}
