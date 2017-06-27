import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  By
} from '@angular/platform-browser';
import {
  NO_ERRORS_SCHEMA,
  DebugElement
} from '@angular/core';
import {
  UserSearchComponent
} from './user-search.component';
import {
  UserService
} from '../shared/user.service';
import {
  User
} from '../shared/user.model';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture < UserSearchComponent > ;
  let debug: DebugElement;
  let element: HTMLElement;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        providers: [UserService],
        declarations: [UserSearchComponent],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;

    userService = fixture.debugElement.injector.get(UserService);

    debug = fixture.debugElement.query(By.css('.user-search'));
    element = debug.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call search method when user is typing ', () => {
    spyOn(component, 'search');
    const input = fixture.debugElement.query(By.css('#search-box'));
    input.triggerEventHandler('keyup', null);
    expect(component.search).toHaveBeenCalled();
  });

  it('should render a user list element', () => {
    const userListComponent = element.querySelector('user-list');
    expect(userListComponent).toBeTruthy();
  });

  it('should load a list of users on init', () => {
    component.ngOnInit();
  });
});
