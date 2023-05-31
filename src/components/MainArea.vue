<script setup>
import NavBars from "./NavBars.vue";
import InputArea from "./InputArea.vue";
import PreviewArea from "./PreviewArea.vue";
</script>

<template>
  <main class="main">
    <nav class="nav">
      <NavBars />
    </nav>
    <section class="section">
      <PreviewArea />
      <InputArea />
    </section>
  </main>
</template>

<style scoped lang="less">
.main {
  width: 100%;

  .section {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
  }
}
</style>
