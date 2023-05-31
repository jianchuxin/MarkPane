<script setup>
import { useStore } from "@/stores";
const store = useStore();
</script>

<template>
  <div class="aside-menu">
    <!-- logo -->
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="logo" class="logo" />
    </div>

    <!-- file list -->
    <ul class="files">
      <li>
        <span>undefined1111111111111</span>
        <button class="delete-btn"><i class="fa fa-solid fa-xmark"></i></button>
      </li>
      <li>
        <span>undefined</span>
        <button class="delete-btn"><i class="fa fa-solid fa-xmark"></i></button>
      </li>
      <li class="current">
        <span>undefined</span>
        <button class="delete-btn"><i class="fa fa-solid fa-xmark"></i></button>
      </li>
    </ul>

    <!-- actions -->
    <ul class="actions">
      <li>
        <button class="add-one-btn">
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
  width: 22rem;
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
