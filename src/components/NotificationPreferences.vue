<template>
    <div>
        <transition name="fade" mode="out-in">
            <div key="1" v-if="permissionGranted">
                <p>Testo</p>
            </div>
            <div key="2" v-else>
                <p href="#" class="link-1" @click="askForPermission"
                >Enable notifications</p>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "NotificationPreferences",
        data(){
          return {
              permissionGranted: false,
              tokenRegistered:false,
              token: ""
          }
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
            storeToken(token, uid){
                this.$db.ref(this.$key +'/'+token).set({
                    token,
                    uid
                }).then(() => {
                    console.log('Se registro wey');
                    this.tokenRegistered = true;
                });
            }
        },
        created(){
            this.askForPermission();

            this.$messaging.onMessage(function(payload) {
                console.log("Message received. ", payload);
            });

            this.$auth.signInAnonymously().catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode, ' - ', errorMessage)
            });

            this.$auth.onAuthStateChanged(user => {
                if(user){
                    if(this.permissionGranted){
                        this.storeToken(this.token, user.uid);
                    }
                }
            });
        }
    }
</script>

<style scoped>

</style>