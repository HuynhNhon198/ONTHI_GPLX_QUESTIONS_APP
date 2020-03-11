import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment.prod';

import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { CategoryComponent, DialogAddCate } from './category/category.component';
import { ExamsComponent } from './exams/exams.component';
import { ExamComponent } from './exam/exam.component';
import { AddExamComponent } from './add-exam/add-exam.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ExamsComponent,
    DialogAddCate,
    ExamComponent,
    AddExamComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    ReactiveFormsModule, FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule
  ],
  entryComponents: [DialogAddCate],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
