<script setup></script>

<template>
  <div class="preview">
    <textarea ref="previewer"></textarea>
  </div>
</template>

<style scoped lang="less">
.preview {
  textarea {
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
