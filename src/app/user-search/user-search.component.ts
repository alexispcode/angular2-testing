import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.less']
})
export class UserSearchComponent implements OnInit {
  users: User[] = [];
  searchText: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => this.users = users);
  }

  updateSearchFilter(term: string) {
    this.searchText = term;
  }
}
