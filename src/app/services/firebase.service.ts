import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  setDoc,
  onSnapshot,
  addDoc,
} from '@angular/fire/firestore';
import {
  query,
  orderBy,
  DocumentChange,
  DocumentData,
  getDocs,
} from 'firebase/firestore';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  unsubUserList;

  users: User[] = [];

  constructor() {
    this.unsubUserList = this.getUserList();
  }

  getUserList(){
    const q = query(this.getUsersCollectionRef(), orderBy('lastName'));
    return onSnapshot(q, (list) => {
      this.users = [];
      list.forEach(element => {
        const user = new User(element.data())
        this.users.push(user)        
      });
      list.docChanges().forEach((change)=>{
        this.logChanges(change);
      })
    })
  }

  logChanges(change: DocumentChange<DocumentData>) {
    if (change.type === 'added') {
      console.log('New User ', change.doc.data());
    }
    if (change.type === 'modified') {
      console.log('Modified User: ', change.doc.data());
    }
    if (change.type === 'removed') {
      console.log('Removed User: ', change.doc.data());
    }
  }

  async addUser(user: any) {
    await addDoc(this.getUsersCollectionRef(), this.getCleanJson(user)).catch((err) => {
      console.log(err);
    });
  }

  getUsersCollectionRef(){
    return collection(this.firestore, 'users');
  }

  getCleanJson(user: User){
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      email: user.email,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city
    }
  }

  ngOnDestroy(): void {
    this.unsubUserList();
  }
}
