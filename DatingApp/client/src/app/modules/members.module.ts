import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberDetailComponent } from '../members/member-detail/member-detail.component';
import { SharedModule } from './shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component:MemberListComponent, pathMatch: 'full'},
  { path: ':username', component: MemberDetailComponent }
]

@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule,
    MemberListComponent,
    MemberDetailComponent
  ]
})
export class MembersModule { }
