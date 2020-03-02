import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRbU7xJsAXhJhpVXv9TrMWFds0d5So6nw",
    authDomain: "history-meme-generator.firebaseapp.com",
    databaseURL: "https://history-meme-generator.firebaseio.com",
    projectId: "history-meme-generator",
    storageBucket: "history-meme-generator.appspot.com",
    messagingSenderId: "760039568774",
    appId: "1:760039568774:web:d39feb2e31aa0da5f32807"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;