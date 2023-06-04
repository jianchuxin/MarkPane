<script setup>
import { useStore } from "@/stores";
import { computed, onMounted, ref } from "vue";
const store = useStore();
const previewer = ref(null);
onMounted(() => {
  store.previewer = previewer.value;
});
const previewContent = computed(() => {
  return store.previewContent;
});
</script>

<template>
  <div ref="previewer" class="preview" v-html="previewContent"></div>
</template>

<style lang="less">
@import url("@/assets/themes/vue/vue.less");
.preview {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  resize: none;
  border: none;
  background-color: #f5f5f5;
  outline: none;
  font-family: inherit;
  font-size: 1.8rem;
  color: #616161;
  box-shadow: 4px 5px 3px #aaa;
  white-space: normal;
  overflow-y: scroll;
  word-wrap: break-word;
}
</style>
