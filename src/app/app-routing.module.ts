import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
 
import { HomeComponent } from './home/home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { NewBookComponent } from './new-book/new-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
 
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit/:id', component: EditBookComponent },
  { path: 'new', component: NewBookComponent },
  { path: 'book/:id', component: BookDetailsComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes) 
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}