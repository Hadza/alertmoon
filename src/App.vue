<template>
  <div id="app">
    <h1>Hello.</h1>
    <p>
      My name is
      <a href="http://isaacosuna.com" class="link-1"><b>Isaac Osuna</b></a>
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
        this.priceLoaded = this.currentPrice !== "";
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

.link-1 {
  position: relative;
  text-decoration: none;
  display: inline-block;
  color: black;
  padding: 0 1px;
  transition: color ease 0.3s;
  cursor: pointer;
}

.link-1::before {
  content: "";
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 5%;
  left: 0;
  bottom: 0;
  background-color: #00b388;
  transition: all ease 0.3s;
}

.link-1:hover {
  color: white;
  background-color: #00b388;
  transition: ease-in 0.3s;

}
.link-1::after {
  transition: max-height 0.25s ease-in;
}
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
