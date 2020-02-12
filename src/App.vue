<template>
  <div id="app">
    <Description></Description>
    <PriceInformation></PriceInformation>
    <NotificationPreferences></NotificationPreferences>
  </div>
</template>

<script>
  import Description from '@/components/Description'
  import PriceInformation from '@/components/PriceInformation'
  import NotificationPreferences from '@/components/NotificationPreferences'

export default {
  name: "App",
  components:{
    Description,
    PriceInformation,
    NotificationPreferences
  },
};
</script>

<style>
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
