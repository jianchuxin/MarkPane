<script setup>
import { useStore } from "@/stores/index";
const store = useStore();

const selectArticle = (id) => {
  console.log("选择文章id:", id);
  store.selectArticle(id);
};

const deleteArticle = (id) => {
  console.log("删除文章id:", id);
  store.deleteArticle(id);
};

const addNewArticle = () => {
  console.log("添加一篇新文章");
  console.log("currentId", store.currentId);
  store.addNewArticle();
};
</script>

<template>
  <div class="aside-menu">
    <!-- logo -->
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="logo" class="logo" />
    </div>

    <!-- file list -->
    <ul class="files">
      <!-- 文章的标题为内容的第一行 -->
      <li
        v-for="article in store.articleList"
        :key="article.id"
        :class="{ current: article.id === store.currentId }"
      >
        <span @click="selectArticle(article.id)">{{
          article.content.split("\n")[0]
        }}</span>
        <button
          v-if="store.articleList.length > 1"
          class="delete-btn"
          @click="deleteArticle(article.id)"
        >
          <i class="fa fa-solid fa-xmark"></i>
        </button>
      </li>
    </ul>

    <!-- actions -->
    <ul class="actions">
      <li>
        <button class="add-one-btn" @click="addNewArticle">
          <i class="fa fa-plus"></i>
        </button>
      </li>
      <li>
        <a href="">
          <i class="fa fa-brands fa-html5"></i>
          <span>Save as .html</span>
        </a>
      </li>
      <li>
        <a href="">
          <i class="fa fa-download"></i>
          <span>Save as .md</span>
        </a>
      </li>
    </ul>

    <div class="copy-right">Copyright &copy; Chuxin Jian</div>
  </div>
</template>

<style scoped lang="less">
.aside-menu {
  position: relative;
  height: 100%;
  min-width: 22rem; // 点睛之笔
  background-color: #f5f5f5;
  box-shadow: 4px 1px 6px 0px rgba(0, 0, 0, 0.2);

  .logo {
    text-align: center;
    img {
      padding: 20px 0;
      width: 125px;
    }
  }

  .files {
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 1.3rem;
    li {
      position: relative;
      cursor: default;
      color: #9e9e9e;
      span {
        display: block;
        height: 100%;
        width: 100%;
        padding: 1.5rem;
        font-size: 1.8rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &:hover {
        background-color: #eeeeee;
        .delete-btn {
          display: inline-block;
        }
      }

      &.current {
        color: #616161;
        border-left: 6px solid #009688;
      }

      .delete-btn {
        position: absolute;
        display: none;
        top: 0;
        right: 6px;
        background-color: transparent;
        border: none;
        padding: 6px;
        height: 100%;
        &:hover {
          background-color: #ef5350;
          .fa {
            color: #fff;
          }
        }
        &:active {
          background-color: #f44336;
          .fa {
            color: #fff;
          }
        }
      }
    }
  }

  .actions {
    li {
      color: #616161;
      padding: 0 5px;
      height: 5.5rem;
      line-height: 5.5rem;
      &:hover {
        background-color: #e0e0e0;
      }
      &:active {
        background-color: #bdbdbd;
      }

      button,
      a {
        display: inline-block;
        padding: 0 5px;
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        outline: none;
        text-align: left;
        color: inherit;
        font-size: 1.6rem;
        text-decoration: none;
        &.add-one-btn {
          text-align: center;
        }
        .fa {
          display: inline-block;
          width: 2.4rem;
          font-size: 2.4rem;
          margin: 0 1.5rem;
        }
      }
    }
  }
  .copy-right {
    position: absolute;
    bottom: 10px;
    width: 100%;
    font-size: 12px;
    text-align: center;
    color: #9e9e9e;
  }
}

ul {
  list-style: none;
}
</style>
