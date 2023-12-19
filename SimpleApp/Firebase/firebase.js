// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM1MpTXUDCDTor2akyzjc7LsYpb4grmzw",
  authDomain: "adv-project-27403.firebaseapp.com",
  databaseURL: "https://adv-project-27403-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "adv-project-27403",
  storageBucket: "adv-project-27403.appspot.com",
  messagingSenderId: "318106730454",
  appId: "1:318106730454:web:352652ce9f24a51cae6e77",
  measurementId: "G-PVR4QS1RCS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {app}

