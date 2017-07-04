import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserNotesComponent } from './user-notes.component';
import { UserService } from '../shared/user.service';
import { firstUserMock } from '../shared/user.mock';
import { RouterStub, ActivatedRouteStub} from '../shared/testing/router.stub';

describe('UserNotesComponent', () => {
  let component: UserNotesComponent;
  let fixture: ComponentFixture<UserNotesComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule, RouterModule],
      declarations: [UserNotesComponent],
      providers: [UserService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    activatedRoute.testParamMap = { id: firstUserMock.id };
    fixture = TestBed.createComponent(UserNotesComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

