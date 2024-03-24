import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCzD_gEOnU5K9lp1fwCpJG-3ZPlVpJzNmM',
  authDomain: 'activity-log-ccea2.firebaseapp.com',
  projectId: 'activity-log-ccea2',
  storageBucket: 'activity-log-ccea2.appspot.com',
  messagingSenderId: '2461236272',
  appId: '1:2461236272:web:09abc554245d064154c1f5',
};

import { GoogleAuthProvider } from 'firebase/auth';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();

export default app;
