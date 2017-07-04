import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.less']
})
export class UserNotesComponent implements OnInit {
  private note: string;
  private userId: number;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => this.onChangeIdParam(param));
  }

  saveNote() {
    this.userService.saveNote(this.userId, this.note);
  }

  private onChangeIdParam(param): void {
    this.userId = Number((param.has('id') && param.get('id')));
    this.note = this.userService.getNote(this.userId);
  }

  private reset(): void {
    this.note = '';
  }
}
