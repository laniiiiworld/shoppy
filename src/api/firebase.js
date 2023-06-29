import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function onUserStateChanged(callback) {
  try {
    onAuthStateChanged(auth, async (user) => {
      const updatedUser = user ? await adminUser(user) : null;
      callback(updatedUser);
    });
  } catch (error) {
    const { code, message } = error;
    console.error(code, message);
  }
}

export function login() {
  try {
    signInWithPopup(auth, provider);
  } catch (error) {
    const { code, message } = error;
    console.error(code, message);
  }
}

export function logout() {
  try {
    signOut(auth);
  } catch (error) {
    const { code, message } = error;
    console.error(code, message);
  }
}

async function adminUser(user) {
  const snapshot = await get(ref(database, 'admins'));
  if (snapshot.exists()) {
    const admins = snapshot.val();
    return { ...user, isAdmin: admins.includes(user.uid) };
  } else {
    console.log('No data available');
  }
  return user;
}
