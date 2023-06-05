<script setup>
import { useStore } from "@/stores";
const store = useStore();
const toggleMenu = () => {
  store.showMenu = !store.showMenu;
};

const options = {
  bold: "**bold**",
  italic: "Italic",
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
        <button @click="toggleMenu"><i class="fa fa-bars"></i></button>
      </li>
      <li>
        <button @click="insert(options.bold)">
          <i class="fa fa-bold"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.italic)">
          <i class="fa fa-italic"></i>
        </button>
      </li>
      <li>
        <button @click="test">
          <i class="fa fa-link"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.quote)">
          <i class="fa fa-quote-left"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.code)">
          <i class="fa fa-code"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.codeBlock)">
          <i class="fa fa-regular fa-brackets-curly"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.img)">
          <i class="fa fa-regular fa-image"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.uList)">
          <i class="fa fa-list-ul"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.header)">
          <i class="fa fa-header"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.line)">
          <i class="fa fa-underline"></i>
        </button>
      </li>
      <li>
        <button @click="insert(options.table)"><i class="fa fa-th"></i></button>
      </li>
      <li>
        <button><i class="fa fa-brands fa-github"></i></button>
      </li>
      <li>
        <button><i class="fa fa-question"></i></button>
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
