import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import {LoginComponent}   from './login/login.component';
import {CreateComponent}   from './story/create/create.component';
import {ListComponent}   from './story/list/list.component';
import {EditComponent}   from './story/edit/edit.component';

export const appRoutes: Routes = [{
  path: 'registration',
  component: RegistrationComponent,
},{
  path: 'login',
  component: LoginComponent
}, {
  path: 'create-story',
  component: CreateComponent
}, {
  path: 'story-list',
  component: ListComponent
},{
  path: 'edit-story/:id',
  component: EditComponent
},


];