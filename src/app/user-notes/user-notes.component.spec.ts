import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserNotesComponent } from './user-notes.component';
import { UserService } from '../shared/user.service';
import { firstUserMock } from '../shared/user.mock';
import { RouterStub, ActivatedRouteStub } from '../shared/testing/router.stub';

let component: UserNotesComponent;
let fixture: ComponentFixture<UserNotesComponent>;
let activatedRoute: ActivatedRouteStub;
let userService: UserService;
const expectedNote = { text: 'testing_note', user_id: firstUserMock.id };

let saveButton: HTMLButtonElement;
let inputNote: HTMLInputElement;
let spySaveNote: jasmine.Spy;
let spyGetNote: jasmine.Spy;

describe('UserNotesComponent', () => {

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule, RouterModule],
      declarations: [UserNotesComponent],
      providers: [
        UserService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  }));

  describe('when navigating to existing user', () => {

    beforeEach(async(() => {
      activatedRoute.testParamMap = { id: firstUserMock.id };
      createComponent();
    }));

    it('should call save when clicked', fakeAsync(() => {
      saveButton.dispatchEvent(new Event('click'));
      tick();
      expect(spySaveNote).toHaveBeenCalled();
      expect(spySaveNote).toHaveBeenCalledTimes(1);
    }));

    it('save button should be disabled if there are not changes', async(() => {
      expect(saveButton.disabled).toBeTruthy();
    }));

    it('save button should be enabled when the user types', async(() => {
      inputNote.value = 'text';
      inputNote.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(saveButton.disabled).toBeFalsy();
    }));

  });

  describe('when navigate with no user id', () => {
    beforeEach(async(createComponent));

    it('should have user.id === 0', () => {
      expect(component.note.user_id).toBe(0);
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(UserNotesComponent);
  component = fixture.componentInstance;
  userService = fixture.debugElement.injector.get(UserService);

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();

    saveButton = fixture.debugElement.query(By.css('#btnSaveNote')).nativeElement;
    inputNote = fixture.debugElement.query(By.css('#input-note')).nativeElement;

    spyGetNote = spyOn(userService, 'getNote').and.returnValue(firstUserMock);
    spySaveNote = spyOn(userService, 'saveNote').and.returnValue(expectedNote);
  });
}
