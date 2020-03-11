import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { MatInput } from '@angular/material';

interface IQuestion {
  question: string;
  img: string;
  answers: {
    answer: string;
    correct: boolean
  }[];
}

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})

export class ExamComponent implements OnInit {
  @ViewChild('answView', { static: false }) answView: ElementRef;
  @ViewChild('questionView', { static: false }) questionView: ElementRef;
  id: string;
  data: any;
  correct = false;
  answer = '';
  question: IQuestion = {
    question: '',
    img: '',
    answers: []
  };
  time: number;
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private fbSV: FirebaseService
  ) {
    this.id = route.snapshot.params.id;
    console.log(this.id);
  }

  async ngOnInit() {
    this.data = await this.fbSV.getDoc('exams', this.id);
    this.time = this.data.timer / 60;
    console.log(this.time);
  }

  async saveTime() {
    this.loading = true;
    if (this.time > 0) {
      await this.fbSV.updateDoc('exams', this.id, {
        timer: this.time * 60
      });
    }
    this.loading = false;
  }

  addAnsw() {
    if (this.answer !== '') {
      this.question.answers.push({
        answer: this.answer,
        correct: this.correct
      });
      this.answer = '';
      this.correct = false;
      setTimeout(() => this.answView.nativeElement.focus(), 0);
    }
  }
  removeAnsw(i: number) {
    this.question.answers.splice(i, 1);
  }

  async saveQuestion() {
    this.loading = true;
    const questions = this.data.questions;
    questions.push({
      question: this.question.question,
      img: this.question.img,
      answers: this.question.answers
    });
    await this.fbSV.updateDoc('exams', this.id, {
      questions
    });
    this.data.questions = questions;
    this.clearQuestion();
    this.loading = false;
  }

  clearQuestion() {
    this.question.question = '';
    this.question.img = '';
    this.question.answers = [];
    setTimeout(() => this.questionView.nativeElement.focus(), 0);
  }

}
