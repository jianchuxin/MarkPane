# markPane, 一个美观简洁的 markdown 在线编辑器

### 项目介绍

项目名称：markPane。

简介：一个简洁的网页端 markdown 编辑器，可以实时预览，多文件切换，保存下载文件等。且内容可以长期保持，采用 localstorage 存储。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f78aeb4e5f1949c4881c473fd7e02e5f~tplv-k3u1fbpfcp-watermark.image?)

### 组件结构

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f570853ac1cf4478a6fce6a561121193~tplv-k3u1fbpfcp-watermark.image?)

整个界面分为 4 个区域，分别为左侧的侧边栏，右上的工具栏，右侧的输入区域和渲染区域。
以下讲述其实现过程。

### 存储结构

采用 pinia 工具存储，搭配 piniaPluginPersistedstate 插件，实现本地存储，数据具有持久性。
本项目中主要存储用户书写的文件 articleList，每个文件有唯一的 id，有一个 currentId，表示当前预览的文件的 id。

### 具体实现

#### 侧边栏 asideMenu 实现

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45a0762a44d3477a9e9f06cb3e34957d~tplv-k3u1fbpfcp-watermark.image?)
外观上 html 和 css 的实现都比较简单，logo 加上一个显示文件列表的 v-for（li），再加上几个 button。\\

1.  实现`折叠效果`，即点击右上菜单按钮后会自动折叠，同时右侧的内容顺滑地拓展到左边。这个效果是非常常见的，所以我单独拎出来介绍了一下，可以传送到我这篇文章看一哈：([vue3 实现顺滑可折叠侧边栏 - 掘金 (juejin.cn)](https://juejin.cn/spost/7241499876647354427))
2.  实现`添加文章`
    - 利用 new Date()，getTime()获取唯一的 id，添加到数组中，文章的标题为第一行的内容，获取方法为 content.split("\n")\[0]。
    - 标题内容过长时使用省略号代替，设置盒子的 css 属性为`{overflow:hidden;text-overflow:ellipsis}`
3.  实现`删除文章` ，采用绝对定位设置删除按钮，根据当前文章的 id 从数组中删除对应的文章。

保存文件后面再介绍

#### 实现输入区域 inputArea

将文章的内容显示在屏幕上，容易想到的是直接用 v-model 关联 store 和 template，为了方便控制我使用了 v-model 的原本实现方式，即分为:value 和@input,前者将 store 内容绑定到屏幕上，后者用户编辑时将 store 内容也更新。

#### 实现渲染区域 prewviewArea

相比 inputArea, previewArea 则更加复杂，因为需要先将 md 文本转化为 html，再将 html 内容渲染到屏幕上，这里我使用的是 v-html。其实 v-html 的使用需要特别注意 XSS 漏洞，需要对内容进行过滤，考虑到我的这个应用只是本地应用，就没有做相应的防护措施。关于 XSS，可以看我这篇文章[web 安全----防止 XSS 漏洞 - 掘金 (juejin.cn)](https://juejin.cn/post/7241447629874610213)。

实现 md 文本转 html:\
利用 marked、markedHighlight 和 highlight.js，参考了[markedjs/marked-highlight: Add code highlighting to marked (github.com)](https://github.com/markedjs/marked-highlight)\
markedjs 的作用是将 md 转换成 html 元素，例如`# merrick`，转换成`<h1></h1>`，\
转换代码块，

```cpp
int a;
cout<<"hello world!"<<endl
```

转换为，

```html
<pre><code class="hljs language-cpp"><span class="hljs-type">int</span> a;
cout&lt;&lt;<span class="hljs-string">"hello world!"</span>&lt;&lt;endl
</code></pre>
```

从上述代码中，可以看出 mardedjs 会为我们创建标签如`<h1>、<pre>、<code>`等。但是我们也注意到标签上还有 class 如`hljs language-cpp hljs-string`等，使得代码高亮，这就是 markedHighlght 和 highlight 的作用。除此之外，我们还需引入相应的代码 css 样式，有不同的主题，比如 vscode 中常用的 atom-one-dark 等。可以在[highlight.js (v11.7.0)| BootCDN ](https://www.bootcdn.cn/highlight.js/)中引入。

markedjs 的配置如下：

```js
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
```

使用:marked.prase(value)

```js
// 渲染文本，.md --》 html
const previewContent = computed(() => {
  return marked.parse(rawContent.value);
});
```

template 中绑定

```vue
<template>
  <div ref="previewer" class="preview" v-html="previewContent"></div>
</template>
```

#### 同步滚动

用户上下滚动输入区域的同时，渲染区域也会随之滚动。
因为两个组件属于兄弟组件，所以涉及到兄弟组件之间的通信。\
之前学 js 的时候，我们可以通过 dom 方法从 dom tree 上直接获取那个元素，但是在 vue 中我们改用了模板引用 ref。\
这里需要在 inputArea 中获取到 previewArea 这个元素，我这里使用的方法是将 store 作为中转站引用 previewArea，这样 inpurArea 就可以通过 store 获取到 previewArea 元素。再通过以下方法实现同步滚动：

```js
//同步滚动
const syncScroll = (e) => {
  store.previewer.scrollTop = e.target.scrollTop;
};
```

#### 数据持久存储 localstorage

使用了[piniaPluginPersistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)插件，好处是无需手写存入与获取 localstorage 的代码，非常方便，通过 path 属性可以指定需要保存的数据，代码如下所示：

```js
  {
    // localstorage：使用piniaPluginPersistedstate插件
    persist: {
      paths: ["articleList", "currentId"],
    },
  }
```

存储数据

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf40b74b7c8d41dfbddd81c2fee8977e~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="100%">

#### 工具栏功能实现

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7955bd1c28c747e5982dddf3430b9d7c~tplv-k3u1fbpfcp-watermark.image?)

工具栏主要用于快捷添加文本，例如代码块、表格等，同时还可以改变原样式，如给文本加粗、斜体、强调等。实际上就是两种类型，一种是在光标处插入新的内容，另一种是给选中的文本添加诸如加粗、链接等，实现起来需要考虑光标的位置。

1.  通过`store.inputer.selectionStart`和..selectionEnd 可以获取到当前光标的位置，当两者相等时，表示直接原地插入内容；当两者不等时，表示需要插入内容来修饰选中的内容。

2.  插入内容后，有时需要选中可编辑的文本内容，如插入一个链接后，自动选中 url 内容，方便用户快速编辑。
    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2aa37ef48153493a9939e516bff916b1~tplv-k3u1fbpfcp-watermark.image?)

这时需要我们主动设置好光标的选中方位，使用`setSelectionRange(start,end)`,需要注意的时，设置之前需要使元素聚焦 focus。了解清楚这些，就可以用代码将其实现了，分两种情况，每种情况中不同插入内容实现方式差不多。

#### 文件保存

保存为两种格式(.html)和(.md)。
使用 a 标签下载，利用 Blob 将文章内容转换为`Blob`对象，再利用`URL.createObjectURL()`为其创建 url，绑定到 href 属性上，download 属性为下载文件的名称 = title + 后缀.html/.md

```vue
<a :href="htmlDataUrl" :download="titleHtml" @mouseenter="createUrl('html')">
  <i class="fa iconfont icon-HTML-fill"></i>
  <span>Save as .html</span>
</a>
```

```js
const createUrl = (mode) => {
  if (mode === "md") {
    //下载.md文件
    const val = store.rawContent;
    const blobObj = new Blob([val]);
    const objectURL = URL.createObjectURL(blobObj);
    mdDataUrl.value = objectURL;
  } else {
    //下载.html文件
    const val = store.previewContent;
    const blobObj = new Blob([val]);
    const objectURL = URL.createObjectURL(blobObj);
    htmlDataUrl.value = objectURL;
  }
};
```

#### 文件拖动打开

拖拽事件：'drop'，当文件拖动到 inputArea 时触发，此时需要读取文件内容
通过 event.dataTransfer.files 获取拖入文件列表。
FileReader 对象：读取 dataTransfer 文件，并在读取完成后（onload）覆盖界面内容。

读取文件内容后，首先判断文件数量（至多 1 个），再判断文件类型（只能为 md 文件），若成功则覆盖 inputArea 的内容。不成功时使用 elementPlus 组件库中的 message 发出提醒。
代码实现：

```js
// 文件拖动
const dragging = (e) => {
  const fileData = e.dataTransfer.files;
  // console.log(e.dataTransfer.files);
  if (fileData.length > 1) {
    ElMessage({
      message: "请一次拖入1个文件",
      type: "warning",
    });
  } else if (fileData[0].name.slice(-3) !== ".md") {
    ElMessage({
      message: "文件类型不匹配, 应为(*.md)",
      type: "warning",
    });
  } else {
    ElMessage({
      message: "导入成功",
      type: "success",
    });
    const fileReader = new FileReader();
    fileReader.readAsText(fileData[0], "UTF-8");
    fileReader.onloadend = (e) => {
      const newContent = e.target.result;
      store.contentChange(newContent);
    };
  }
};
```

#### 项目部署

最后将整个项目部署在 github pages 上面，采用 actions 自动部署非常方便，可以看我这篇文章[项目部署--将 vue 项目部署到 github pages 上 - 掘金 (juejin.cn)](https://juejin.cn/post/7241473344469778489)，里面介绍了详细的步骤。

#### 后续可能

做完项目之后，收获还是挺大的，在 github 上面第一次实现其他人的项目还是很有挑战的，后续也会继续学习，多多实践！🦀🦀

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
