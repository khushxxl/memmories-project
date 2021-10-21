// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import {
  doc,
  addDoc,
  collection,
  getFirestore,
  deleteDoc,
} from 'firebase/firestore'

import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDhSxI66Vu5muqYbHHE93L-ZJiDWB8bma4',
  authDomain: 'memmories-app.firebaseapp.com',
  projectId: 'memmories-app',
  storageBucket: 'memmories-app.appspot.com',
  messagingSenderId: '407097022107',
  appId: '1:407097022107:web:0b0d0fd4dbb2356fab583e',
  measurementId: 'G-1J9YXWJ4FJ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const storage = getStorage()

export { app, addDoc, collection, db, storage, deleteDoc }
