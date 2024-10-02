import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/_guards/auth.guard';
import { HomeComponent } from 'src/app/home/home.component';
import { ListsComponent } from 'src/app/lists/lists.component';
import { MemberDetailComponent } from 'src/app/members/member-detail/member-detail.component';
import { MemberListComponent } from 'src/app/members/member-list/member-list.component';
import { MessagesComponent } from 'src/app/messages/messages.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
      },
      { path: 'members/:id', component: MemberDetailComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
  { path: '**', component: MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
