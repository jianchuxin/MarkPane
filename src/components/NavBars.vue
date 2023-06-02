<script setup>
import { useStore } from "@/stores";
const store = useStore();
const toggleMenu = () => {
  store.showMenu = !store.showMenu;
};
</script>

<template>
  <nav class="nav-bars">
    <ul>
      <li>
        <button @click="toggleMenu"><i class="fa fa-bars"></i></button>
      </li>
      <li>
        <button><i class="fa fa-bold"></i></button>
      </li>
      <li>
        <button><i class="fa fa-italic"></i></button>
      </li>
      <li>
        <button><i class="fa fa-link"></i></button>
      </li>
      <li>
        <button><i class="fa fa-quote-left"></i></button>
      </li>
      <li>
        <button><i class="fa fa-code"></i></button>
      </li>
      <li>
        <button><i class="fa fa-regular fa-image"></i></button>
      </li>
      <li>
        <button><i class="fa fa-list-ul"></i></button>
      </li>
      <li>
        <button><i class="fa fa-header"></i></button>
      </li>
      <li>
        <button><i class="fa fa-underline"></i></button>
      </li>
      <li>
        <button><i class="fa fa-th"></i></button>
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
