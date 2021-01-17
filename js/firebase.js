// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyD6kuenL1aIE8q6xBSDuOkdDuYyjPAOxY4",
	authDomain: "potato-website.firebaseapp.com",
	projectId: "potato-website",
	storageBucket: "potato-website.appspot.com",
	messagingSenderId: "408853772610",
	appId: "1:408853772610:web:e6d19106ce349aa5b930db",
	measurementId: "G-3EMT4FCTXY",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Initialize Cloud Firestore
var db = firebase.firestore();
