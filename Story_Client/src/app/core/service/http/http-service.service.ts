import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from './../../../../environments/environment';

@Injectable()
export class HttpRequestService {

  constructor(
    private http: Http,
  ) { }

  createAuthorizationHeader(headers: Headers) {

    headers.append('Content-Type', 'application/json')
    headers.append('Accept-Language', environment.lang);

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.append('Authorization', 'Bearer ' + accessToken);
    }
  }

  get(url, params: any = '', status) {
    const headers = new Headers();
    if (status == true) {
      this.createAuthorizationHeader(headers);
    }
    return this.http.get(url, {
      search: params,
      headers: headers
    });
  }

  post(url, data, status) {
    const headers = new Headers();
    if (status == true) {
      this.createAuthorizationHeader(headers);
    }
    return this.http.post(url, data, {
      headers: headers
    });
  }

  put(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    });
  }

  delete(url) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }

  patch(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.patch(url, data, {
      headers: headers
    });
  }



}
