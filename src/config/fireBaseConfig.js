import firebase from "firebase";

// Подключение к бд. Вынести в отдельный файл
var firebaseConfig = {
  apiKey: "AIzaSyDbc4M7aYHRHYld9BJMLkC1dtNyKJYao9g",
  authDomain: "my-todo-test-8b80f.firebaseapp.com",
  databaseURL: "https://my-todo-test-8b80f.firebaseio.com",
  projectId: "my-todo-test-8b80f",
  storageBucket: "my-todo-test-8b80f.appspot.com",
  messagingSenderId: "829712376402",
  appId: "1:829712376402:web:756c66df592485b734758b"
};

// Инициализация firebase
firebase.initializeApp(firebaseConfig);

//Вынести в отдельный файл
export const db = firebase.firestore();
