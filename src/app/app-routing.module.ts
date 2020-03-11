import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ExamComponent } from './exam/exam.component';

export const routes: Routes = [
  {
    path: '',
    component: CategoryComponent
  },
  {
    path: 'exam/:id',
    component: ExamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
