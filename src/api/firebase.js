import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export function onUserStateChanged(callback) {
  try {
    onAuthStateChanged(auth, (user) => callback(user));
  } catch (error) {
    const { code, message } = error;
    console.error(code, message);
  }
}

export async function login() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    const { code, message } = error;
    console.error(code, message);
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return null;
  } catch (error) {
    const { code, message } = error;
    console.error(code, message);
  }
}
