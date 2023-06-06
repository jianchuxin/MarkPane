<script setup>
import AsideMenu from "@/components/AsideMenu.vue";
import MainArea from "./components/MainArea.vue";
import { useStore } from "./stores";
const store = useStore();
</script>

<template>
  <div class="app" :class="{ 'show-menu': store.showMenu }">
    <AsideMenu />
    <MainArea />
  </div>
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
  font-size: 62.5%;
  font-family: Microsoft Yahei, "PingHei", "Helvetica Neue", "Helvetica",
    "STHeitiSC-Light", "Arial", sans-serif;
  line-height: 1;
  overflow: hidden;
  height: 100%;
  background-color: #e0e0e0;
}
#app {
  height: 100%;
}

.el-message {
  font-size: 1.6rem;
}

.app {
  position: relative;
  display: flex;
  left: -22rem;
  width: 100%;
  height: 100%;
  transition: all ease 0.5s;
  &.show-menu {
    left: 0;
  }
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
