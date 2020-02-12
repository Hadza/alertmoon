import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";
import VueNativeSock from "vue-native-websocket";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";
import * as pw from "@/pw";

//firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCcpMOFhkCmdyjy53536DgvlosRrdaC8cM",
  authDomain: "bitcointracker-kkk.firebaseapp.com",
  databaseURL: "https://bitcointracker-kkk.firebaseio.com",
  projectId: "bitcointracker-kkk",
  storageBucket: "bitcointracker-kkk.appspot.com",
  messagingSenderId: "2743611449",
  appId: "1:2743611449:web:59bd2a45b2bd318d719de8",
  measurementId: "G-513N26R67B"
});

Vue.prototype.$auth = firebaseApp.auth();
Vue.prototype.$db = firebaseApp.database();
Vue.prototype.$messaging = firebaseApp.messaging();

Vue.prototype.$key = pw.key;


navigator.serviceWorker
  .register("/firebase-messaging-sw.js")
  .then(registration => {
    Vue.prototype.$messaging.useServiceWorker(registration);
  })
  .catch(err => {
    console.log(err);
  });

Vue.use(firestorePlugin);

Vue.use(VueNativeSock, "wss://ws.bitstamp.net", {
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
  store: store
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount("#app");
