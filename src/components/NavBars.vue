<script setup>
import { useStore } from "@/stores";
const store = useStore();

// 控制菜单折叠
const toggleMenu = () => {
  store.showMenu = !store.showMenu;
};

// github图标和提问跳转链接
const openLink = (url) => {
  window.open(url, "_blank");
};

// 工具栏编辑功能选项
const options = {
  bold: "**bold**",
  italic: "*Italic*",
  link: "[Link](http://example.com/)",
  quote: "\n>",
  code: "`code`",
  codeBlock: "\n```js\n```\n",
  img: "![Img](http://example.com/)",
  uList: "\n-",
  header: "\n#",
  line: "\n\n---\n\n",
  table:
    "\n\n| title | title | title |\n| --- | --- | --- |\n| item | item | item |",
};

//快捷插入内容，里面不包含页面内容
const setContent = (content, endPosition, start, end) => {
  const oldContent = store.inputer.value;
  const newContent =
    oldContent.slice(0, endPosition) + content + oldContent.slice(endPosition);
  store.inputer.focus();
  setTimeout(function () {
    store.inputer.setSelectionRange(
      endPosition + start,
      endPosition + content.length - end
    );
  }, 10);
  store.contentChange(newContent);
};

//插入内容，并包裹页面内容
const updateContent = (startPosition, endPosition, content, left, right) => {
  const oldContent = store.inputer.value;
  const leftPart = content.slice(0, left);
  const middlePart = oldContent.slice(startPosition, endPosition);
  const rightPart = content.slice(-right);
  console.log(leftPart, ",", middlePart, ",", rightPart);
  console.log(content);
  const newContent =
    oldContent.slice(0, startPosition) +
    leftPart +
    middlePart +
    rightPart +
    oldContent.slice(endPosition);
  store.inputer.focus();
  setTimeout(function () {
    store.inputer.setSelectionRange(startPosition + left, endPosition + left);
  }, 10);
  store.contentChange(newContent);
};

// 工具栏功能函数
const insert = (content) => {
  console.log(content);
  const startPosition = store.inputer.selectionStart;
  const endPosition = store.inputer.selectionEnd;
  if (startPosition === endPosition) {
    switch (content) {
      case options.bold: //**bold**
        setContent(content, endPosition, 2, 2);
        break;
      case options.italic:
        setContent(content, endPosition, 1, 1);
        break;
      case options.link:
        setContent(content, endPosition, 7, 1);
        break;
      case options.code:
        setContent(content, endPosition, 1, 1);
        break;
      case options.codeBlock:
        setContent(content, endPosition, 4, 5);
        break;
      case options.img:
        setContent(content, endPosition, 7, 1);
        break;
      case options.table:
        setContent(content, endPosition, 4, 61);
        break;
      default:
        setContent(content, endPosition, content.length, 0);
    }
  } else {
    switch (content) {
      case options.bold:
        updateContent(startPosition, endPosition, content, 2, 2);
        break;
      case options.italic:
        updateContent(startPosition, endPosition, content, 1, 1);
        break;
      case options.code:
        updateContent(startPosition, endPosition, content, 1, 1);
        break;
      case options.link:
        updateContent(startPosition, endPosition, content, 1, 22);
        break;
      case options.img:
        updateContent(startPosition, endPosition, content, 2, 22);
        break;
      default:
        break;
    }
  }
};

//
</script>

<template>
  <nav class="nav-bars">
    <ul>
      <li>
        <button @click="toggleMenu">
          <i class="fa iconfont icon-hanbaocaidan"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.bold)">
          <i class="fa iconfont icon-bold1"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.italic)">
          <i class="fa iconfont icon-italic1"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.link)">
          <i class="fa iconfont icon-link1"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.quote)">
          <i class="fa iconfont icon-quote"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.code)">
          <i class="fa iconfont icon-code"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.codeBlock)">
          <i class="fa iconfont icon-brackets-curly1"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.img)">
          <i class="fa iconfont icon-image"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.uList)">
          <i class="fa iconfont icon-unorderedList"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.header)">
          <i class="fa iconfont icon-title"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.line)">
          <i class="fa iconfont icon-hr"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.table)">
          <i class="fa iconfont icon-table"></i>
        </button>
      </li>
      <li>
        <button @click="openLink('https://github.com/jianchuxin/MarkPane')">
          <i class="fa iconfont icon-github"></i>
        </button>
      </li>
      <li>
        <button
          @click="openLink('https://github.com/jianchuxin/MarkPane/issues')"
        >
          <i class="fa iconfont icon-question"></i>
        </button>
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
          font-size: 2.4rem;
        }
      }
    }
  }
}
</style>
