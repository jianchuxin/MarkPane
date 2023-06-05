<script setup>
import { useStore } from "@/stores";
const store = useStore();
const toggleMenu = () => {
  store.showMenu = !store.showMenu;
};

const options = {
  bold: "**bold**",
  italic: "*Italic*",
  link: "[Link](http://example.com/)",
  quote: "\n>",
  code: "`code`",
  codeBlock: "\n```js\n```\n}",
  img: "![Img](http://example.com/)",
  uList: "\n-",
  header: "\n#",
  line: "\n\n---\n\n",
  table:
    "\n\n| title | title | title |\n| --- | --- | --- |\n| item | item | item |",
};

const setContent = (content, endPosition, start, end) => {
  const oldContent = store.inputer.value;
  const newContent =
    oldContent.slice(0, endPosition) + content + oldContent.slice(endPosition);
  console.log(endPosition + start, endPosition + content.length - end);
  store.inputer.focus();
  setTimeout(function () {
    store.inputer.setSelectionRange(
      endPosition + start,
      endPosition + content.length - end
    );
  }, 10);

  store.contentChange(newContent);
};

const insert = (content) => {
  console.log(content);
  const startPosition = store.inputer.selectionStart;
  const endPosition = store.inputer.selectionEnd;
  if (startPosition === endPosition) {
    switch (content) {
      case options.bold:
        setContent(content, endPosition, 2, 2);
        break;
      case options.italic:
        setContent(content, endPosition, 1, 1);
    }
  }
};

const test = () => {
  store.inputer.focus();
  store.inputer.setSelectionRange(0, 4);
};
</script>

<template>
  <nav class="nav-bars">
    <ul>
      <li>
        <button @click="toggleMenu">
          <i class="fa iconfont icon-zhedie"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.bold)">
          <i class="fa iconfont icon-bold"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.italic)">
          <i class="fa iconfont icon-italic"></i>
        </button>
      </li>
      <li>
        <button @click="test">
          <i class="fa iconfont icon-link"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.quote)">
          <i class="fa iconfont icon-quotation_marks"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.code)">
          <i class="fa iconfont icon-insert_tag_field"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.codeBlock)">
          <i class="fa iconfont icon-brackets-curly"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.img)">
          <i class="fa iconfont icon-fuwenbenbianjiqi_tupian"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.uList)">
          <i class="fa iconfont icon-liebiao"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.header)">
          <i class="fa iconfont icon-header"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.line)">
          <i class="fa iconfont icon-fuwenbenbianjiqi_xiahuaxian"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.table)">
          <i class="fa iconfont icon-biaoge"></i>
        </button>
      </li>
      <li>
        <button><i class="fa iconfont icon-github"></i></button>
      </li>
      <li>
        <button><i class="fa iconfont icon-wenhao"></i></button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="less">
.nav-bars {
  height: 4.5rem;
  width: 100%;
  background-color: #009688;
  box-shadow: 4px 3px 3px #aaa;

  ul {
    list-style: none;
    height: 4.5rem;
    display: flex;
    li {
      height: 4.5rem;
      &:first-child {
        border-right: 2px solid #00897b;
      }
      &:nth-last-child(2) {
        border-left: 2px solid #00897b;
      }
      button {
        height: 4.5rem;
        width: 4.5rem;
        border: none;
        background: none;
        outline: none;
        transition: all ease 0.3s;
        &:hover {
          background-color: #00897b;
        }
        &:active {
          background-color: #00796b;
        }

        .fa {
          color: #fff;
          font-size: 1.8rem;
        }
      }
    }
  }
}
</style>
