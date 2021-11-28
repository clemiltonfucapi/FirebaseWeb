// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
  import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js'
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt5K4u72Yn3wiOidQUytOsgxFpklGERIk",
  authDomain: "feiticosfirebase.firebaseapp.com",
  databaseURL: "https://feiticosfirebase-default-rtdb.firebaseio.com",
  projectId: "feiticosfirebase",
  storageBucket: "feiticosfirebase.appspot.com",
  messagingSenderId: "480393444763",
  appId: "1:480393444763:web:fd1043f5e7b9dd2a67f53e"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // recupera real time database
  const database = getDatabase();

  export {app,database} // exportando as instancias app e database


  
