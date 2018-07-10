import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
// import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: AuthHttp) { }

    getUsers(): Observable<User[]> {
      return this.authHttp
        .get(this.baseUrl + 'users')
        .map(response => <User[]>response.json())
        .catch(this.handleError);
      }

    // private jwt() {
    //   // tslint:disable-next-line:prefer-const
    //   let token = localStorage.getItem('token');
    //   if (token) {
    //     // tslint:disable-next-line:prefer-const
    //     let headers = new Headers({'Authorization': 'Bearer ' + token});
    //     headers.append('Content-type', 'application/json');
    //     return new RequestOptions({headers: headers});
    //   }
    // }

    getUser(id): Observable<User> {
      return this.authHttp
        .get(this.baseUrl + 'users/' + id)
        .map(response => <User>response.json())
        .catch(this.handleError);
    }

    updateUser (id: number, user: User) {
      return this.authHttp.put(this.baseUrl + 'users/' + id, user).catch(this.handleError);
    }

    private handleError(error: any) {
      const applicationError = error.headers.get('Application-Error');
      if (applicationError) {
        return Observable.throw(applicationError);
      }
      const serverError = error.json();
      let modelStateError = '';
      if (serverError) {
        for (const key in serverError) {
          if (serverError[key]) {
            modelStateError += serverError[key] + '\n';
          }
        }
      }
      return Observable.throw(
        modelStateError || 'Server error'
      );
    }
}
