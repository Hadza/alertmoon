const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
const pw = require('../src/pw');
firebase.initializeApp({
    apiKey: "AIzaSyCcpMOFhkCmdyjy53536DgvlosRrdaC8cM",
    authDomain: "bitcointracker-kkk.firebaseapp.com",
    databaseURL: "https://bitcointracker-kkk.firebaseio.com",
    projectId: "bitcointracker-kkk",
    storageBucket: "bitcointracker-kkk.appspot.com",
    messagingSenderId: "2743611449",
    appId: "1:2743611449:web:59bd2a45b2bd318d719de8",
    measurementId: "G-513N26R67B"
});
admin.initializeApp();

console.log(pw)


exports.sendPriceAlert = functions.https.onRequest((req, res)  => {

    let deviceTokens = [];
    //firebase.database().ref(pw.key+'/').on()
    firebase.database().ref(pw.key+'/').once('value').then(snapshot => {
        console.log(snapshot, 'snapshot');
        snapshot.forEach(doc => {
            deviceTokens.push(doc.val().token)
        })
        console.log(deviceTokens);
    });




    const payload = {
        notification: {
            title: 'Bitcoin tracker alert!',
            body: 'Bitcoin price is down by 5% in 2 hours'
        }
    };
    console.log(deviceTokens, 'deviceTokens')
    return admin.messaging().sendToDevice(deviceTokens, payload);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
