<template>
  <div>
    <transition name="fade" mode="out-in">
      <div key="1" v-if="permissionGranted">
        <p
          :style="{
            fontSize: 1.8 + 'em',
            fontWeight: 350,
            marginBlockStart: 0.1 + 'em',
            marginBlockEnd: 0.1 + 'em'
          }"
        >
          Preferences
        </p>
        <hr
          :style="{ marginBlockStart: 0.1 + 'em', marginBlockEnd: 0.1 + 'em' }"
        />
        <div class="container">
          <div class="item">
            <p>Price up <b>5%</b> in a</p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="fivePercent.allSelected"
                @change="selectAll(fivePercent)"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span :style="{ fontWeight: 380 }">Select all options</span>
              </p-check>
            </p>
            <p>
              <!--"fivePercent.tenMinutes = !fivePercent.tenMinutes"-->
              <p-check
                class="p-icon p-smooth"
                :checked="fivePercent.tenMinutes"
                @change="manageSubscription('fivePercentTenMinutes', fivePercent.tenMinutes)"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>10 minutes window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="fivePercent.thirtyMinutes"
                @change="fivePercent.thirtyMinutes = !fivePercent.thirtyMinutes"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>30 minutes window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="fivePercent.oneHour"
                @change="fivePercent.oneHour = !fivePercent.oneHour"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>1 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="fivePercent.threeHours"
                @change="fivePercent.threeHours = !fivePercent.threeHours"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>3 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="fivePercent.sixHours"
                @change="fivePercent.sixHours = !fivePercent.sixHours"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>6 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="fivePercent.twelveHours"
                @change="fivePercent.twelveHours = !fivePercent.twelveHours"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>12 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="fivePercent.oneDay"
                @change="fivePercent.oneDay = !fivePercent.oneDay"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>24 hour window</span>
              </p-check>
            </p>
          </div>
          <div class="item">
            <p>Price up <b>10%</b> in a</p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="tenPercent.allSelected"
                @change="selectAll(tenPercent)"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span :style="{ fontWeight: 380 }">Select all options</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="tenPercent.tenMinutes"
                @change="tenPercent.tenMinutes = !tenPercent.tenMinutes"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>10 minutes window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="tenPercent.thirtyMinutes"
                @change="tenPercent.thirtyMinutes = !tenPercent.thirtyMinutes"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>30 minutes window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="tenPercent.oneHour"
                @change="tenPercent.oneHour = !tenPercent.oneHour"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>1 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="tenPercent.threeHours"
                @change="tenPercent.threeHours = !tenPercent.threeHours"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>3 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="tenPercent.sixHours"
                @change="tenPercent.sixHours = !tenPercent.sixHours"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>6 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="tenPercent.twelveHours"
                @change="tenPercent.twelveHours = !tenPercent.twelveHours"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>12 hour window</span>
              </p-check>
            </p>
            <p>
              <p-check
                class="p-icon p-smooth"
                :checked="tenPercent.oneDay"
                @change="tenPercent.oneDay = !tenPercent.oneDay"
              >
                <i slot="extra" class="icon mdi mdi-check"></i>
                <span>24 hour window</span>
              </p-check>
            </p>
          </div>
        </div>
      </div>
      <div key="2" v-else>
        <p
          href="#"
          class="link-1"
          @click="askForPermission"
          :style="{ marginBlockStart: 0.1 + 'em', marginBlockEnd: 0.1 + 'em' }"
        >
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
      token: "",
      fivePercent: {
        allSelected: false,
        tenMinutes: false,
        thirtyMinutes: false,
        oneHour: false,
        threeHours: false,
        sixHours: false,
        twelveHours: false,
        oneDay: false
      },
      tenPercent: {
        allSelected: false,
        tenMinutes: false,
        thirtyMinutes: false,
        oneHour: false,
        threeHours: false,
        sixHours: false,
        twelveHours: false,
        oneDay: false
      }
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
        .ref(this.$pw.key + "/" + token)
        .set({
          token,
          uid
        })
        .then(() => {
          this.tokenRegistered = true;
        });
    },
    selectAll(option) {
      const currentSelection = option.allSelected;
      for (let key in option) {
        option[key] = !currentSelection;
      }
    },
    manageSubscription(topic, suscribe){
        fetch('https://iid.googleapis.com/iid/v1' + !suscribe ? '':':batchRemove' + '/' + this.token + '/rel/topics/' + topic, {
          method: 'POST',
          headers: new Headers({
            'Authorization': 'key=' + this.$pw.firebaseConfig.apiKey
          })
        }).then(response => {
          if (response.status < 200 || response.status >= 400) {
            console.log('Error subscribing to topic: ' + response.status + ' - ' + response.text())
          }else{
            console.log('Se suscribio wey')
          }

          console.log('Subscribed to "' + topic + '"');
        }).catch(error => {
          console.error(error);
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
label span {
  font-weight: 300;
}
.container {
  display: flex;
  justify-content: space-evenly;
}
.container .item {
  margin: 0 auto 0 0;
}
</style>
