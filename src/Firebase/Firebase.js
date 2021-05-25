import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC3nG6ZEAynaennTGeIFd4QXeeCHp2ZtX8",
    authDomain: "myanime-list.firebaseapp.com",
    projectId: "myanime-list",
    storageBucket: "myanime-list.appspot.com",
    messagingSenderId: "303092502342",
    appId: "1:303092502342:web:0582b3c9cd4304d6391f47",
    measurementId: "G-4W1FNT5YJM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth , storage}