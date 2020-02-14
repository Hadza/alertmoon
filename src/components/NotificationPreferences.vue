<template>
  <div>
    <transition name="fade" mode="out-in">
      <div key="1" v-if="permissionGranted">
        <p :style="{fontSize: 1.8+'em', fontWeight:350, marginBlockStart: 0.1+'em', marginBlockEnd:0.1+'em'}">Preferences</p>
        <hr :style="{marginBlockStart:0.1+'em', marginBlockEnd:0.1+'em'}">
        <div class="container">
          <div class="item">
            <p>Price up <b>5%</b> in a</p>
            <p>
              <p-check class="p-icon p-smooth" color="success-o">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span :style="{fontWeight:380}">Select all options</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>10 minutes window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>30 minutes window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>1 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>3 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>6 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>12 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>24 hour window</span>
              </p-check>
            </p>
          </div>
          <div class="item">
          <p>Price up <b>10%</b> in a</p>
            <p>
              <p-check class="p-icon p-smooth" color="success-o">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span :style="{fontWeight:380}">Select all options</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth" color="success-o">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>10 minutes window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth" color="success-o">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>30 minutes window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth" color="success-o">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>1 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth" color="success-o">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>3 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth" color="success-o">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>6 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth" color="success-o">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>12 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check class="p-icon p-smooth" color="success-o">
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>24 hour window</span>
              </p-check>
            </p>
          </div>
        </div>
      </div>
      <div key="2" v-else >
        <p href="#" class="link-1" @click="askForPermission" :style="{marginBlockStart: 0.1+'em', marginBlockEnd:0.1+'em'}">
          Enable notifications
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "NotificationPreferences",
  data() {
    return {
      permissionGranted: false,
      tokenRegistered: false,
      token: ""
    };
  },
  methods: {
    askForPermission() {
      this.$messaging
        .requestPermission()
        .then(() => this.$messaging.getToken())
        .then(token => {
          console.log(token);
          this.token = token;
          this.permissionGranted = true;
        })
        .catch(function(err) {
          console.log("Unable to get permission to notify.", err);
          this.permissionGranted = false;
        });
    },
    storeToken(token, uid) {
      this.$db
        .ref(this.$key + "/" + token)
        .set({
          token,
          uid
        })
        .then(() => {
          console.log("Se registro wey");
          this.tokenRegistered = true;
        });
    }
  },
  created() {
    this.askForPermission();

    this.$messaging.onMessage(function(payload) {
      console.log("Message received. ", payload);
    });

    this.$auth.signInAnonymously().catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, " - ", errorMessage);
    });

    this.$auth.onAuthStateChanged(user => {
      if (user) {
        if (this.permissionGranted) {
          this.storeToken(this.token, user.uid);
        }
      }
    });
  }
};
</script>

<style scoped>
label span{
  font-weight:300;
}
  .container {
    display:flex;
    justify-content: space-evenly;
  }
  .container .item {
    margin: 0 auto 0 0;
  }
</style>
