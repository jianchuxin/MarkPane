import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
  const showMenu = ref(true);

  return { showMenu };
});
