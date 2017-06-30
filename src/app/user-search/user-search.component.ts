import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.less']
})
export class UserSearchComponent implements OnInit {
  users: Observable<User[]>;
  searchText: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  updateSearchFilter(term: string) {
    this.searchText = term;
  }

  goToDetail(user: User): void {
    const url = user.id.toString();
    this.router.navigateByUrl(url);
  }
}
