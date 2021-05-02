const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
	apiKey: "AIzaSyCTmbIx-Ra_8n6KI_vqSycE1ZH_DW_4crE",
	authDomain: "ru-hacks-c6e40.firebaseapp.com",
	projectId: "ru-hacks-c6e40",
	storageBucket: "ru-hacks-c6e40.appspot.com",
	messagingSenderId: "630246593158",
	appId: "1:630246593158:web:7d15cd8af1157c2e7bf707",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
console.log(`Database connect... (${new Date().toLocaleTimeString()})`);

module.exports = db;
