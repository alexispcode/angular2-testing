import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/user.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  private url = 'http://localhost:3000/users';

  constructor(private http: Http) { }

  getUsers(): Observable<User[]> {
    return this.http
               .get(this.url)
               .map((response: Response) => response.json())
  }
}
