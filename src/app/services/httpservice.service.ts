import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { headersToString } from "selenium-webdriver/http";
@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  postWithoutHeader(url: any, uploadData: any) {
    throw new Error("Method Not Implemented ");
  }

  baseUrl = environment.apiUrl;
  token = localStorage.getItem('FundooToken');

  httpOptions = new HttpHeaders().set('token', this.token)
  constructor(private http: HttpClient) { }

  public postUser(options) {
    console.log("this.baseUrl", this.baseUrl);
    console.log("options.data", options.data);
    return this.http.post(this.baseUrl + options.url, options.data);
  }

  public post(options) {
    console.log('token', this.token)
    let url = this.baseUrl + options.url;
    console.log("baseUrl", url)
    console.log("options", options.data)
    return this.http.post(this.baseUrl + options.url, options.data, { headers: this.httpOptions });

  }
  public get(options) {
    console.log('hello rays', this.httpOptions);
    let url = this.baseUrl + options.url;
    console.log("baseUrl==", url)
    return this.http.get(this.baseUrl + options.url, { headers: this.httpOptions });
  }
  public delete(options) {
    return this.http.delete(this.baseUrl + options.url, { headers: this.httpOptions });

  }
  public put(options) {
    console.log("this.httpOptions", this.httpOptions)
    return this.http.put(this.baseUrl + options.url, { headers: this.httpOptions });

  }

  postWithHeader(url, data) {
    // console.log('data in http service--',data);
    console.log("token in httpService--", this.token);
    return this.http.post(this.baseUrl + url, data, { headers: this.httpOptions });
  }
}