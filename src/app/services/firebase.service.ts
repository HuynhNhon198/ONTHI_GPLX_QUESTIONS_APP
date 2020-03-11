import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  db = firebase.firestore();
  constructor(
    private afs: AngularFirestore
  ) { }

  async getDoc(col: string, id: string) {
    const doc = await this.db.collection(col).doc(id).get();
    const data = doc.data();
    data.id = doc.id;
    return data;
  }

  async setDoc(col: string, id: string, data) {
    return await this.db.collection(col).doc(id).set(data);
  }

  async updateDoc(col: string, id: string, data) {
    return await this.db.collection(col).doc(id).update(data);
  }

  async delete(col: string, id: string) {
    return await this.db.collection(col).doc(id).delete();
  }

  async getCol(col: string, query?: { field: string; opera: firebase.firestore.WhereFilterOp; value: string }) {
    const data = [];
    const colRef = query ? this.db.collection(col).where(query.field, query.opera, query.value) : this.db.collection(col);
    const docs = await colRef.get();
    docs.forEach(doc => {
      const obj = doc.data();
      obj.id = doc.id;
      data.push(obj);
    });
    return data;
  }

}
