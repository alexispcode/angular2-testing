import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserListComponent } from './user-list.component';
import { usersMock } from '../shared/user.mock';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement.query(By.css('.user-list'));
    element = debug.nativeElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have same length of mocked users when users is populated', () => {
    component.users = usersMock;
    fixture.detectChanges();
    expect(element.children.length).toBe(usersMock.length);
  });

  it('should display users name', () => {
    component.users = usersMock;
    fixture.detectChanges();
    const item = element.querySelector('.list-group-item');
    expect(item.textContent).toContain(usersMock[0].name);
  });
});
