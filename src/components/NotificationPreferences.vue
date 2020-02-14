<template>
  <div>
    <transition name="fade" mode="out-in">
      <div key="1" v-if="permissionGranted">
        <p>Preferences</p>
        <hr>
        <p>Price up <b>5%</b></p>
        <p>

          <p-check class="p-icon p-smooth" color="success-o">
            <i slot="extra" class="icon mdi mdi-check"></i>
            <span id="label">In 30 minutes window</span>
          </p-check>
        </p>


        <hr>
        <p-check class="p-icon p-curve p-jelly" color="danger">
          <i slot="extra" class="icon mdi mdi-bug"></i>
          Bug
        </p-check>

        <p>
          <p-check class="p-icon p-rotate" color="success">
            <i slot="extra" class="icon mdi mdi-check"></i>
            When price goes up 10% in a 30 minutes window.
          </p-check>
        </p>
        <p>
          <p-check class="p-icon p-rotate" color="success">
            <i slot="extra" class="icon mdi mdi-check"></i>
            When price goes up 5% in a 1 hour window.
          </p-check>
        </p>
        <p>
          <p-check class="p-icon p-rotate" color="success">
            <i slot="extra" class="icon mdi mdi-check"></i>
            When price goes up 10% in a 1 hour window.
          </p-check>
        </p>
        <p>
          <p-check class="p-icon p-rotate" color="success">
            <i slot="extra" class="icon mdi mdi-check"></i>
            When price goes up 5% in a 3 hour window.
          </p-check>
        </p>
        <p>
          <p-check class="p-icon p-rotate" color="success">
            <i slot="extra" class="icon mdi mdi-check"></i>
            When price goes up 10% in a 3 hour window.
          </p-check>
        </p>
        <p>
          <p-check class="p-icon p-rotate" color="success">
            <i slot="extra" class="icon mdi mdi-check"></i>
            When price goes up 5% in a 6 hour window.
          </p-check>
        </p>
        <p>
          <p-check class="p-icon p-rotate" color="success">
            <i slot="extra" class="icon mdi mdi-check"></i>
            When price goes up 10% in a 6 hour window.
          </p-check>
        </p>
      </div>
      <div key="2" v-else>
        <p href="#" class="link-1" @click="askForPermission">
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
</style>
