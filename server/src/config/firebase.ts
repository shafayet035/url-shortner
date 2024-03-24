import { credential, auth } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

export const firebaseAdmin = initializeApp({
  credential: credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
});

export const firebaseAuth = auth();
