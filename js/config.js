// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
  import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js'
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD_0Asa132QLOeSkpeR4FSYyQlzonxey9U",
    authDomain: "projetofirebase-9e3b0.firebaseapp.com",
    databaseURL: "https://projetofirebase-9e3b0-default-rtdb.firebaseio.com",
    projectId: "projetofirebase-9e3b0",
    storageBucket: "projetofirebase-9e3b0.appspot.com",
    messagingSenderId: "28738757028",
    appId: "1:28738757028:web:e012f75d6e43f1f3886131"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // recupera real time database
  const database = getDatabase();

  export {app,database} // exportando as instancias app e database


  
