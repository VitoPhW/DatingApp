import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'members', //localhost:4200/members
    component:MemberListComponent
  },
  {
    path: 'members/:id', //localhost:4200/members/4
    component: MemberDetailComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: 'masseges',
    component: MessagesComponent
  },
  {
    path: '**', // non-existing-rout
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
