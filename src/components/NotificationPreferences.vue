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
              permissionGranted: false
          }
        },
        methods: {
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
        created(){
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
        }
    }
</script>

<style scoped>

</style>