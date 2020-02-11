<template>
  <div id="app">
    <h1>Hello.</h1>
    <p>
      My name is <a href="http://isaacosuna.com"><b>Isaac Osuna</b></a>
    </p>
    <p>
      I've been learning the basics of <b>VueJS</b> and I am trying to make
      <b>Bitcoin</b>
      price alert for personal use, nothing fancy, you select when should you be
      notified through a push notification.
    </p>
    <transition name="fade" mode="out-in">
      <p key="1" v-if="!priceLoaded">
        Loading last BITSTAMP BTC trade price...
      </p>
      <p v-else>
        Current <b>BTC</b> price => $<b>{{ currentPrice }}</b>
      </p>
    </transition>
    <!--    <h3>Rules</h3>
    <ul>
      <li>When price raises 5% in 1 hour</li>
      <li>When the price decreaes by %4 in 1 nounr</li>
      <li>One</li>
    </ul>-->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      priceLoaded: false,
      currentPrice: "",
      data: {}
    };
  },
  created() {
    this.$messaging
      .requestPermission()
      .then(() => this.$messaging.getToken())
      .then(token => {
        console.log(token, "hola"); // Receiver Token to use in the notification
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
      });

    this.$messaging.onMessage(function(payload) {
      console.log("Message received. ", payload);
      // ...
    });

    const event = JSON.stringify({
      event: "bts:subscribe",
      data: {
        channel: "live_trades_btcusd"
      }
    });

    this.$store.subscribe(mutation => {
      if (mutation.type === "SOCKET_ONOPEN") {
        this.$socket.send(event);
      }
    });

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "SOCKET_ONMESSAGE") {
        console.log("Receiving message", state.socket.message.data);
        const price_str = JSON.parse(state.socket.message.data).data.price_str;
        this.currentPrice = price_str ? price_str : "";
        this.priceLoaded = this.currentPrice !== "" ? true : false;
      }
    });
  }
};
</script>

<style lang="css">
/*a {
  text-decoration: none;
  color: #121314;
  position: relative;
}*/

$underlineColor: #00B388;
$underlineHeight: 5%;


p {
  font-size: 1.6em;
  font-weight: 300;
  line-height: 1.4;
}
body {
  font-family: "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: calc(10px + 0.33vw);
  -webkit-font-smoothing: antialiased;
  padding: 5vh 10vw;
  color: #121314;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
