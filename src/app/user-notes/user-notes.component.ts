import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

import { UserService } from '../shared/user.service';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.less']
})
export class UserNotesComponent implements OnInit {
  @Input() note: Note;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => this.onChangeIdParam(param));
  }

  saveNote(): void {
    this.userService.saveNote(this.note);
  }

  private onChangeIdParam(param): void {
    const userID = Number((param.has('id') && param.get('id')));
    this.userService.getNote(userID).then(note => this.note = note);
  }
}
