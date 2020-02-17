const functions = require('firebase-functions');
const admin = require('firebase-admin');
const pw = require('../src/pw');

admin.initializeApp();
const cors = require('cors')({ origin: true, });

exports.sendPriceAlert = functions.https.onRequest((req, res)  => {




    const payload = {
        notification: {
            title: 'Bitcoin tracker alert!',
            body: 'Bitcoin price is down by 5% in 2 hours'
        }
    };

    return admin.messaging().sendToDevice(deviceTokens, payload);
});

exports.suscribeToTopic = functions.https.onCall((data, context) => {
    console.log(data)
    if(!data.shouldSuscribe){
     admin.messaging().subscribeToTopic(data.token, data.topic)
        .then(response => {
            console.log('all good my man, se suscribio')
        })
        .catch(err =>{
            console.log(err, 'error')
        })
    } else {
        admin.messaging().unsubscribeFromTopic(data.token, data.topic)
            .then(response => {

            })
            .catch(err =>{

            })
    }
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
