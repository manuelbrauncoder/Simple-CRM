import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  setDoc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
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
  currentUserId: string = '';

  currentUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: 0,
    email: '',
    street: '',
    zipCode: 0,
    city: '',
  };

  users: User[] = [];

  constructor() {
    this.unsubUserList = this.getUserList();
  }

  getUserList() {
    const q = query(this.getUsersCollectionRef(), orderBy('lastName'));
    return onSnapshot(q, (list) => {
      this.users = [];
      list.forEach((element) => {
        const user = this.setUserObject(element.data(), element.id);
        this.users.push(user);
      });
      list.docChanges().forEach((change) => {
        this.logChanges(change);
      });
    });
  }

  setUserObject(obj: any, id: string): User {
    return {
      id: id || '',
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      birthDate: obj.birthDate || 0,
      email: obj.email || '',
      street: obj.street || '',
      zipCode: obj.zipCode || 0,
      city: obj.city || '',
    };
  }

  /**
   * log changes in firestore
   * @param change
   */
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

  /**
   * add new user to firebase
   * @param user
   */
  async addUser(user: any) {
    await addDoc(this.getUsersCollectionRef(), this.getCleanJson(user)).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * update the edited User in firebase
   * @param user
   */
  async updateUser(user: User) {
    if (user) {
      let docRef = this.getSingleUserDocRef();
      await updateDoc(docRef, this.getCleanJson(user)).catch((err) => {
        console.log(err);
      });
    }
  }

  async deleteUser(id: string) {
    
      let docRef = doc(this.getUsersCollectionRef(), id);
      await deleteDoc(docRef).catch((err) => {
        console.log(err);
      });
    
  }

  getUserDetails() {
    return onSnapshot(this.getSingleUserDocRef(), (doc) => {
      // console.log(doc.data());
      let user = new User(doc.data());
      this.currentUser = user;
    });
  }

  /**
   *
   * @returns the firestore collection 'users'
   * for later: use parameter for collection id
   */
  getUsersCollectionRef() {
    return collection(this.firestore, 'users');
  }

  /**
   *
   * @returns the firestore collection with current User id
   */
  getSingleUserDocRef() {
    return doc(this.getUsersCollectionRef(), this.currentUserId);
  }

  getCleanJson(user: User) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      email: user.email,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,
    };
  }

  ngOnDestroy(): void {
    this.unsubUserList();
  }
}
