import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserService } from './shared/user.service';
import { UserItemComponent } from './user-item/user-item.component';
import { SearchUsersPipe } from './shared/search-user.pipe';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { UserNotesComponent } from './user-notes/user-notes.component';


@NgModule({
  declarations: [
    AppComponent,
    UserSearchComponent,
    UserItemComponent,
    SearchUsersPipe,
    routedComponents,
    UserNotesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
