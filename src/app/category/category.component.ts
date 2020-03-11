import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  data = [];
  constructor(
    private fbSV: FirebaseService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  async ngOnInit() {
    this.data = await this.fbSV.getCol('categories');
    console.log(this.data);
  }

  async addExam(ind: number) {
    this.data[ind].loading = true;
    const cate = this.data[ind];
    const exams = cate.exams || [];
    const id = (new Date()).getTime().toString();
    exams.push(id);
    await this.fbSV.setDoc('exams', id, {
      questions: [],
      timer: 20 * 60,
      name: 'ĐỀ SỐ ' + exams.length,
      type: cate.refer,
      cate: cate.name
    });
    await this.fbSV.updateDoc('categories', cate.id, {
      exams
    });
    this.data[ind].loading = false;
    window.open('/exam/' + id, '_blank');
    this.data[ind].exams = exams;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddCate, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

@Component({
  selector: 'app-dialog-add',
  templateUrl: 'add.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogAddCate {

  constructor(
    public dialogRef: MatDialogRef<DialogAddCate>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
