import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
  const showMenu = ref(true);

  const createId = () => {
    const s = new Date();
    return s.getTime();
  };

  //acticle
  const currentId = ref(createId());

  const articleList = ref([
    {
      id: currentId.value,
      content: "Untitled\n---\n",
    },
    {
      id: "23131",
      content: "markPane up up\n---\n",
    },
  ]);

  // 选者当前文章
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

  return {
    showMenu,
    currentId,
    articleList,
    selectArticle,
    addNewArticle,
    deleteArticle,
    contentChange,
  };
});
