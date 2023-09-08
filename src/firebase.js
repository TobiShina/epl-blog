import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVD_9Y9vygVNDf2TytVqoZpp9LWZxHm5Q",
  authDomain: "blog-753af.firebaseapp.com",
  projectId: "blog-753af",
  storageBucket: "blog-753af.appspot.com",
  messagingSenderId: "354706437116",
  appId: "1:354706437116:web:f53a61b46471ef5fb1b879",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
