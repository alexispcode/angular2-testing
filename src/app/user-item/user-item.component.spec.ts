import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { UserItemComponent } from './user-item.component';
import { usersMock } from '../shared/user.mock';
import { User } from '../shared/user.model';

describe('UserItemComponent', () => {
  let component: UserItemComponent;
  let fixture: ComponentFixture<UserItemComponent>;
  let debug: DebugElement;
  let element: HTMLElement;
  let expectedUser: User;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement.query(By.css('.list-group-item'));
    element = debug.nativeElement;

    expectedUser = usersMock[0];
    component.user = expectedUser;
    fixture.detectChanges();
  });

  it('should display users name', () => {
    expect(element.textContent).toContain(expectedUser.name);
  });

  /** FUNCTIONAL */
  it('should raise selected when clicked', () => {
    let selectedUser: User;
    component.selected.subscribe((user: User) => selectedUser = user);

    debug.triggerEventHandler('click', null);
    expect(selectedUser).toBe(expectedUser);
  });

  it('should raise deleted when clicked', () => {
    let deletedUser: User;
    component.deleted.subscribe((user: User) => deletedUser = user);

    const deleteButton = fixture.debugElement.query(By.css('.delete-button'));
    deleteButton.triggerEventHandler('click', null);
    expect(deletedUser).toBe(expectedUser);
  });
});
