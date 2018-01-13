import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
 
 
@Injectable()
export class DatasService {
  private errorObserver: any;
  public error: any;
  booksUrl="/assets/datas/books.json";
  authorsUrl="/assets/datas/authors.json";

  constructor(public http: Http) {
    this.errorObserver = null;
    this.error = Observable.create(observer => {
      this.errorObserver = observer;
    });
  }

  //Fecth data from books.json
  getBooks() {
    let headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.booksUrl, options)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  //Fecth data from authors.json
  getAuthors() {
    let headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.authorsUrl, options)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  //Handling network connection errors
  private handleError(error) {
    this.errorObserver.next(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
