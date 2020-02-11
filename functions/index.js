const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendPriceAlert = async () => {
    let deviceTokens = [];
    const db = admin.firestore.Firestore.collection('users');

    db.get()
        .then(querySnapshot =>{
            querySnapshot.forEach((doc) => {
                deviceTokens.push(doc.data().token)
            });
            return undefined
        })
        .catch(err => {
            console.log('No funciono esta madre', err)
        });
    const payload = {
        notification: {
            title: 'Bitcoin tracker alert!',
            body: 'Bitcoin price is down by 5% in 2 hours'
        }
    };

    const response = await admin.messaging().sendToDevice(deviceTokens, payload);
    return response;
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
