import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

// 用于md到html的转换，同时配置好代码高亮样式
marked.use(
  {
    mangle: false,
  },
  {
    headerIds: false,
  },
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

// 唯一的store，用于记录文件的内容信息、当前所在文件等
export const useStore = defineStore(
  "store",
  () => {
    const showMenu = ref(true);

    const createId = () => {
      const s = new Date();
      return s.getTime();
    };

    //当前文章id与文章列表
    const currentId = ref(createId());
    const articleList = ref([
      {
        id: currentId.value,
        content: "Untitled\n---\n",
      },
    ]);

    // 选择当前文章
    const selectArticle = (id) => {
      currentId.value = id;
    };

    // 新增文章
    const addNewArticle = () => {
      const newArticle = {
        id: createId(),
        content: "Untitled\n---",
      };
      articleList.value.push(newArticle);
      currentId.value = newArticle.id;
    };

    // 删除文章
    const deleteArticle = (id) => {
      const index = articleList.value.findIndex((item) => item.id === id);
      if (id === currentId.value) {
        if (index === articleList.value.length - 1) {
          currentId.value = articleList.value.at(index - 1).id;
        } else {
          currentId.value = articleList.value.at(index + 1).id;
        }
      }
      articleList.value.splice(index, 1);
    };

    // 输入文本，修改文章的content
    const contentChange = (text) => {
      const article = articleList.value.find(
        (item) => item.id === currentId.value
      );
      article.content = text;
    };

    //获取当前文章内容文本
    const rawContent = computed(() => {
      const currentArticle = articleList.value.find(
        (item) => item.id === currentId.value
      );
      return currentArticle.content;
    });

    // 渲染文本，.md --》 html
    const previewContent = computed(() => {
      return marked.parse(rawContent.value);
    });

    //模板引用，用在其他地方，方便同步滚动
    const previewer = ref(null);
    const inputer = ref(null);

    return {
      showMenu,
      currentId,
      articleList,
      selectArticle,
      addNewArticle,
      deleteArticle,
      contentChange,
      rawContent,
      previewContent,
      inputer,
      previewer,
    };
  },
  {
    // localstorage：使用piniaPluginPersistedstate插件
    persist: {
      paths: ["articleList", "currentId"],
    },
  }
);
