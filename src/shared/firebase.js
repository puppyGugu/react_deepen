import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHPPKTYa2PKrspp4Oyx-d8uwEf4FqYqwc",
    authDomain: "authex-bba7f.firebaseapp.com",
    projectId: "authex-bba7f",
    storageBucket: "authex-bba7f.appspot.com",
    messagingSenderId: "275447860865",
    appId: "1:275447860865:web:319683eb9d93c949734780",
    measurementId: "G-LTPB0HKB9H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;