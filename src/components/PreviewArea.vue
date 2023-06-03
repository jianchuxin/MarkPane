<script setup>
import { useStore } from "@/stores";
import { computed } from "vue";
const store = useStore();
const previewContent = computed(() => {
  return store.previewContent;
});
</script>

<template>
  <div class="preview">
    <div ref="previewer" v-html="previewContent"></div>
  </div>
</template>

<style lang="less">
@import url("@/assets/themes/vue/vue.less");
.preview {
  div {
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
    transition: all ease 0.3s;
    word-wrap: break-word;
  }
}
</style>
