import { initializeApp } from 'firebase/app';
import {REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET, REACT_APP_FIREBASE_SENDER_ID, REACT_APP_FIREBASE_APP_ID} from "@env"
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
// export default app;
const auth = getAuth(app);
export default auth;

