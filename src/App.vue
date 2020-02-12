<template>
  <div id="app">
    <h1>Hello.</h1>
    <p>
      My name is
      <span href="http://isaacosuna.com" class="link-1">Isaac Osuna</span>
    </p>
    <p>
      I've been learning the basics of <b>VueJS</b> and I am trying to make
      <b>Bitcoin</b>
      price alert for personal use, nothing fancy, you select when should you be
      notified through a push notification.
    </p>
    <transition name="fade" mode="out-in">
      <p key="1" v-if="!priceLoaded">
        Waiting for the last trade on BITSTAMP...
      </p>
      <p v-else>
        Current <b>BTC</b> price => $<b>{{ currentPrice }}</b>
      </p>
    </transition>
    <transition name="fade" mode="out-in">
      <div key="1" v-if="permissionGranted">
        <p>Testo</p>
      </div>
      <div key="2" v-else>
        <a href="#" class="link-1" @click="askForPermission"
          >Enable notifications</a>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      init: false,
      permissionGranted: undefined,
      priceLoaded: false,
      currentPrice: "",
      data: {}
    };
  },
  methods: {
    sendConsole() {
      console.log("holaaa");
    },
    askForPermission() {
      this.$messaging
        .requestPermission()
        .then(() => this.$messaging.getToken())
        .then(token => {
          console.log(token, "hola");
          this.permissionGranted = true;
        })
        .catch(function(err) {
          console.log("Unable to get permission to notify.", err);
          this.permissionGranted = false;
        });
    }
  },
  created() {
    debugger;
    this.$messaging
      .requestPermission()
      .then(() => this.$messaging.getToken())
      .then(token => {
        console.log(token);
        this.permissionGranted = true;
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
        this.permissionGranted = false;
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
        const price_str = JSON.parse(state.socket.message.data).data.price_str;
        this.currentPrice = price_str ? price_str : "";
        this.priceLoaded = this.currentPrice !== "";
      }
    });
    this.init = true;
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

.wrapper {
  margin: 3em 0;
}

a,
a:visited,
a:hover,
a:active {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: relative;
  transition: 0.5s color ease;
  text-decoration: none;
  color: black;
  font-size: 1.5em;
}
a:hover {
  color: #d73444;
}

a.before:before,
a.after:after {
  content: "";
  transition: 0.5s all ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: absolute;
}
a.before:before {
  top: -0.25em;
}
a.after:after {
  bottom: -0.25em;
}
a.before:before,
a.after:after {
  height: 5px;
  height: 0.35rem;
  width: 0;
  background: #d73444;
}
a.first:after {
  left: 0;
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
