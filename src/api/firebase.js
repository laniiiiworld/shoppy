import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

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

export async function getProducts() {
  const snapshot = await get(ref(database, 'products'));
  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  } else {
    console.log('No data available');
  }
  return [];
}

export async function addNewProduct(product, image) {
  const id = uuidv4();
  return set(ref(database, `products/${id}`), {
    id,
    ...product,
    image,
    price: parseInt(product.price),
    options: product.options.split(','),
  });
}

export async function onInitCart(userId, callback) {
  try {
    callback(await getCarts(userId));
  } catch (error) {
    const { code, message } = error;
    console.error(code, message);
  }
}

export async function getCarts(userId) {
  const snapshot = await get(ref(database, `carts/${userId}`));
  if (snapshot.exists()) {
    const products = Object.values(snapshot.val());
    return Object.values(products);
  } else {
    console.log('No data available');
  }
  return [];
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}${product.option}`), { ...product });
}

export async function removeFromCart(userId, productId, option) {
  return remove(ref(database, `carts/${userId}/${productId}${option}`));
}
