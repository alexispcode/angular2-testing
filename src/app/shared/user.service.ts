import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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

  editUser(user: User): Observable<User> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.url}/${user.id}`;

    return this.http
               .put(url, JSON.stringify(user), { headers })
               .map((response: Response) => response.json())
  }

  getUser(id: string): Observable<User> {
    const url = `${this.url}/${id}`;
    return this.http
                .get(url)
                .map((response: Response) => response.json())
  }
}
