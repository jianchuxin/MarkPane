<script setup>
import NavBars from "./NavBars.vue";
import InputArea from "./InputArea.vue";
import PreviewArea from "./PreviewArea.vue";
import { useStore } from "@/stores";
const store = useStore();
</script>

<template>
  <main class="main" :class="{ 'show-menu': store.showMenu }">
    <NavBars />
    <section class="section">
      <InputArea />
      <PreviewArea />
    </section>
  </main>
</template>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  flex: 1 0 auto; // 点睛之笔, flex-shrink为0配合width100%，使其宽度与父组件一样
  &.show-menu {
    .section {
      padding-right: 23rem;
    }
  }
  .section {
    transition: all 0.5s;
    width: 100%;
    height: calc(100% - 4.5rem); //点睛之笔
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1rem;
  }
}
</style>
