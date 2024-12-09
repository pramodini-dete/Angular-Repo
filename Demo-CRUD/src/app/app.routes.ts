import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './post/index/index.component';
import { CreateComponent } from './post/create/create.component';
import { EditComponent } from './post/edit/edit.component';
import { ViewComponent } from './post/view/view.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '',   redirectTo: 'index', pathMatch: 'full' },
  {path:'index',component:IndexComponent},
  {path:'create',component:CreateComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'view/:id',component:ViewComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)]
})

export class appRoutingModule { }
