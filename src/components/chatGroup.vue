<template>
  <div>
    <pre v-for="(block, index) in messages" :key="index">
      <code ref="code" v-highlight class="javascript">
        {{ block }}
      </code>
    </pre>
  </div>
</template>

<script>
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css"; // 根据需要选择样式

export default {
  name: "CodeBlock",
  props: ["code"],
  data() {
    return {
      messages: [' 你好\n\nvar message = "Hello World!"'],
    };
  },
  directives: {
    highlight(el) {
      let blocks = el.querySelectorAll("pre code");
      for (let i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i]);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.code.forEach((block) => {
        hljs.highlightBlock(block);
      });
    });
  },
};
</script>
