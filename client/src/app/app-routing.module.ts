import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/_guards/auth.guard';
import { NotFoundComponent } from 'src/app/errors/not-found/not-found.component';
import { ServerErrorComponent } from 'src/app/errors/server-error/server-error.component';
import { TestErrorComponent } from 'src/app/errors/test-error/test-error.component';
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
  { path: 'errors', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
