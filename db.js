
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

import
{getFirestore, collection, getDocs}
    from "https://www.gstatic.com/firebasejs/9.14.0/firebase-store.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAL7TrDzJFd7a3YCyv2JV2XOMn9VbehZ2g",
    authDomain: "pokemon-team-builder-ba2df.firebaseapp.com",
    projectId: "pokemon-team-builder-ba2df",
    storageBucket: "pokemon-team-builder-ba2df.appspot.com",
    messagingSenderId: "832965588470",
    appId: "1:832965588470:web:518352aa5d6f75b66e83d7",
    measurementId: "G-Z1T84J6TK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); // give access to the database

async function getTypes(db) {
    const typesCol = collection(db, "types");
    const typeSnapshot = await getDocs(typesCol);
    const typeList = typeSnapshot.docs.map((doc) => doc);
    
    return typeList;
}

console.log(await getTypes(db));
