import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDxZYnasGcJfFe9I19AeC6oRLuSlkbcEso",
    authDomain: "app-noticias-48056.firebaseapp.com",
    projectId: "app-noticias-48056",
    storageBucket: "app-noticias-48056.appspot.com",
    messagingSenderId: "50331672324",
    appId: "1:50331672324:web:e4f4e2f87f5bc4ee18fa51"
});

const db = firebase.firestore();

export {db};