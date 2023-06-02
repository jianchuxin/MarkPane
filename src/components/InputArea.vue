<script setup>
import { useStore } from "@/stores";
import { computed } from "vue";
const store = useStore();

// 获取文件内容并显示
const rawContent = computed(() => {
  const currentArticle = store.articleList.find(
    (item) => item.id === store.currentId
  );
  return currentArticle.content;
});

// 用户输入文本，改变文件内容
const contentChange = (e) => {
  console.log("用户正在输入..");
  store.contentChange(e.target.value);
};
</script>

<template>
  <div class="input">
    <textarea autofocus :value="rawContent" @input="contentChange"></textarea>
  </div>
</template>

<style scoped lang="less">
.input {
  height: 100%;
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
}
</style>
