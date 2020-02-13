const functions = require('firebase-functions');
const admin = require('firebase-admin');
const pw = require('../src/pw');

admin.initializeApp();

exports.sendPriceAlert = functions.https.onRequest((req, res)  => {




    const payload = {
        notification: {
            title: 'Bitcoin tracker alert!',
            body: 'Bitcoin price is down by 5% in 2 hours'
        }
    };

    return admin.messaging().sendToDevice(deviceTokens, payload);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
