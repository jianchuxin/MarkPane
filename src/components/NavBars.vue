<script setup>
import { useStore } from "@/stores";
const store = useStore();
const toggleMenu = () => {
  store.showMenu = !store.showMenu;
};
</script>

<template>
  <nav class="nav-bars">
    <button @click="toggleMenu">hide</button>
    <div>bars</div>
  </nav>
</template>

<style scoped>
.nav-bars {
  height: 4.5rem;
  width: 100%;
  background-color: #2b8a3e;
}
</style>
