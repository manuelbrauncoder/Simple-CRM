import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-97b47","appId":"1:812903546322:web:598f4bd39c22a74ac45c0b","storageBucket":"simple-crm-97b47.appspot.com","apiKey":"AIzaSyA7aznOK1pVBVkr9UXcXdRUBoG3wffpHD4","authDomain":"simple-crm-97b47.firebaseapp.com","messagingSenderId":"812903546322"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
