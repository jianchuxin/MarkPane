<script setup>
import { useStore } from "@/stores";
import { ref, computed, onMounted } from "vue";
const store = useStore();

const inputer = ref(null);
onMounted(() => {
  store.inputer = inputer.value;
});
// 获取文件内容并显示
const rawContent = computed(() => {
  return store.rawContent;
});

// 用户输入文本，改变文件内容
const contentChange = (e) => {
  console.log("用户正在输入..");
  store.contentChange(e.target.value);
};

//同步滚动
const syncScroll = (e) => {
  store.previewer.scrollTop = e.target.scrollTop;
};
</script>

<template>
  <textarea
    class="input"
    ref="inputer"
    autofocus
    :value="rawContent"
    @input="contentChange"
    @scroll="syncScroll"
  ></textarea>
</template>

<style scoped lang="less">
textarea {
  display: block;
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
}
</style>
