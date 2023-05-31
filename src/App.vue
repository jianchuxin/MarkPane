<script setup>
import AsideMenu from "@/components/AsideMenu.vue";
import MainArea from "./components/MainArea.vue";
</script>

<template>
  <AsideMenu />
  <MainArea />
</template>

<style lang="less">
/* SPACING SYSTEM (px) 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
FONT SIZE SYSTEM (px) 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62
/ 74 / 86 / 98 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-size: 67.5%;
  font-family: Microsoft Yahei, "PingHei", "Helvetica Neue", "Helvetica",
    "STHeitiSC-Light", "Arial", sans-serif;
  line-height: 1;
  overflow: hidden;
  height: 100%;
  background-color: #e0e0e0;
}

#app {
  display: flex;
  height: 100%;
}

*::-webkit-scrollbar {
  display: block;
  width: 5px;
  background: #fafafa;
}
*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #e0e0e0;
}
*::-webkit-scrollbar-thumb:hover {
  background: #bdbdbd;
}
</style>
