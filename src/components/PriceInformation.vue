<template>
    <div>
        <transition name="fade" mode="out-in">
            <p key="1" v-if="!priceLoaded" class="loading">
                Waiting for the last trade on BITSTAMP
            </p>
            <p v-else>
                Current <b>BTC</b> price => $<b>{{ currentPrice }}</b>
            </p>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "PriceInformation",
        data() {
            return {
                priceLoaded: false,
                currentPrice: "",
            };
        },
        created() {
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
        }
    }
</script>

<style scoped>
    .loading:after {
        content: '';
        animation: dots 2s linear infinite;
    }
    @keyframes dots {
        0%, 20% {
            content: '.';}
        40% {
            content: '..';}
        60% {
            content: '...';}
        80%, 100% {
            content: '..';}
    }
</style>