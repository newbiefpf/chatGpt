<template>
  <div class="containerGroup">
    <div class="asideGroup">
      <el-aside width="200px">Aside</el-aside>
    </div>
    <div class="mainGroup" ref="mainGroup">
      <el-main>
        <!-- <div v-loading="isLoading" element-loading-spinner="el-icon-loading">
        Loading...
      </div> -->
        <div v-for="(item, index) in messages" :key="index">
          <div
            style="display: flex; align-items: flex-start; text-align: left"
            class="chat-box"
          >
            <div>
              <img
                :src="
                  item.role === 'assistant'
                    ? '/images/ai.png'
                    : '/images/user.png'
                "
                alt=""
                style="width: 30px; height: 30px; margin-right: 30px"
              />
              <div class="text" v-html="highlightCode(item.content)"></div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer ref="footer">
        <div class="input-box">
          <textarea
            v-model="replyMessage"
            rows="1"
            class="replyTxt"
            @input="handleChange"
            @keyup.enter="sendMessage"
          />
          <i
            v-if="!isLoading"
            class="el-icon-s-promotion iconStyle"
            @click.stop="sendMessage"
          ></i>
          <i class="el-icon-loading iconStyle" v-else></i>
        </div>
      </el-footer>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css"; // 根据需要选择样式
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript); // 注册 JavaScript 语言包
import { message } from "./cs.js";
export default {
  name: "ChatBox",
  data() {
    return {
      messages: [
        {
          role: "user",
          content: message.content,
        },
        {
          role: "assistant",
          content:
            "去美国的攻略可以大致分为以下几个步骤：\n\n1.办理签证：\n\n首先，需要办理美国签证。具体流程和申请材料可以参考美国驻华大使馆官网。在提交申请材料之前，需要预约面试时间和地点，并支付签证费用。\n\n2.购买机票：\n\n在办理签证之后，就可以开始购买机票。可以通过航空公司官网或者第三方机票代理网站进行购票比价。\n\n3.准备行程：\n\n在确定好行程之后，需要准备相应的行程材料，包括酒店预订证明、行程计划、机票预订信息等。\n\n4.了解美国文化：\n\n在前往美国之前，需要了解一些美国文化和礼仪，以便更好地适应当地生活。\n\n5.购买旅游保险：\n\n在前往美国旅游之前，建议购买旅游保险，以防意外情况发生。\n\n6.兑换货币：\n\n在前往美国之前，需要了解美国的货币和汇率，并兑换相应的货币。\n\n7.制定购物计划：\n\n除了旅游景点和美食，美国的购物也是旅游者不容错过的特色。可以提前制定购物计划，并准备好足够的购物预算。\n\n8.出发：\n\n最后，按照计划出发，开始美国之旅。",
        },
        {
          role: "user",
          content:
            'JS闭包：\n\n```js\nfunction outerFunction() {\n  var message = "Hello World!"; // 私有变量\n  function innerFunction() {    // 内部函数\n    console.log(message);\n  }\n  return innerFunction;         // 返回内部函数\n}\n\nvar myFunc = outerFunction();   // 保存内部函数到myFunc变量中\nmyFunc();                       // 调用内部函数，输出"Hello World!"\n```\n\nGo闭包：\n\n```go\nfunc outerFunc() func() {  \n    message := "Hello World!"   // 私有变量\n    innerFunc := func() {       // 内部函数\n        fmt.Println(message)    \n    }\n    return innerFunc            // 返回内部函数\n}  \n\nf := outerFunc()               // 保存内部函数到变量f中\nf()                            // 调用内部函数，输出"Hello World!"\n```',
        },
      ],
      replyMessage: "",
      isLoading: false,
      code: "",
    };
  },

  watch: {
    messages: {
      //深度监听，可监听到对象、数组的变化
      handler() {
        this.$nextTick(() => {
          this.$refs.mainGroup.scrollTop = this.$refs.mainGroup.scrollHeight;
        });
      },

      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleChange(e) {
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      if (textarea.scrollHeight >= 41) {
        this.$refs.footer.$el.style.height =
          Number(textarea.scrollHeight * 2) + "px";
      } else {
        this.$refs.footer.$el.style.height = 60 + "px";
      }
    },
    highlightCode(content) {
      const codeBlocks = content.match(/```[\s\S]*?```/g); // 匹配所有代码块
      if (!codeBlocks) {
        content = content.replace(
          content,
          `<pre>
          <code >${content}</code>
          </pre>`
        ); // 替换原文本中的代码块为高亮后的HTML
        return content; // 如果没有代码块则直接返回原文本
      }
      codeBlocks.forEach((codeBlock) => {
        var lang; // 获取语言类型

        if (codeBlock.match(/```(\S+)/)) {
          lang = codeBlock.match(/```(\S+)/)[1];
        } else {
          lang = "html"; // 获取语言类型
        }
        const result = codeBlock.replace(/```/g, "");
        const code = hljs.highlight(lang, result).value; // 使用highlight.js对代码块进行高亮
        content = content.replace(
          codeBlock,
          `<pre class="code-block-wrapper">
            <div class="code-block-header">
              <span class="code-block-header__lang">${lang}</span>
              <span class="code-block-header__copy" onclick="navigator.clipboard.writeText(event.target.parentNode.parentNode.lastElementChild.innerText);">Copy Code</span></div>
          <code class="hljs code-block-body ${lang}">${code}</code>
          </pre>`
        ); // 替换原文本中的代码块为高亮后的HTML
      });
      return content;
    },

    // 发送消息
    sendMessage() {
      if (this.replyMessage && this.replyMessage != "") {
        // 发送请求获取机器人回复
        if (!this.isLoading) {
          // 添加用户发送的消息到聊天记录
          const userMessage = {
            content: this.replyMessage,
            role: "user",
          };
          this.messages.push(userMessage);
          this.getRobotReply();
          // 清空输入框
          this.replyMessage = "";
        }
      }
    },
    //  获取机器人回复
    async getRobotReply() {
      this.isLoading = true; // 显示加载提示
      let messagesBody = this.messages.filter((item) => item.role == "user");
      const url = `http://192.168.1.1:8888/gpt`;
      debugger;
      const res = await axios.post(url, {
        messages: messagesBody,
      });
      if (res.code == 200) {
        const aiMessage = {
          content: res.data[0].message,
          role: "assistant",
        };
        this.messages.push(aiMessage);
        this.isLoading = false;
      } else {
        this.$message.error("错误");
        this.isLoading = false;
      }
    },
    //
  },
  mounted() {},
};
</script>
<style>
.containerGroup {
  margin: 0;
  display: flex;
}
.mainGroup {
  height: 100vh;
  overflow: hidden;
  overflow: auto;
  width: 100%;
  min-width: 806px;
}
.el-aside {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 100vh;
}
.chat-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 左对齐 */
  max-width: 80%;
  margin: 10px auto;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: auto;
  color: white;
  background-color: rgba(32, 33, 35, 0.5);
}

.chat-box > div {
  display: flex;
  flex-direction: center;
  justify-content: flex-start;
  /* 左对齐 */
  align-items: flex-start;
  /* margin-bottom: 30px; */
}

.input-box {
  text-align: center;
  width: 80%;
  position: relative;
  height: 50px;
}
.iconStyle {
  cursor: pointer;
  color: inherit;
  position: absolute;
  right: 200px;
  top: 8px;
  font-size: 25px;
}
.replyTxt {
  width: 85%;
  outline: none;
  border-radius: 6px;
  font-size: 16px;
  resize: none;
  height: 36px;
  color: inherit;
  line-height: 2;
  padding-right: 25px;
  margin-right: 25%;
}

.mainGroup::-webkit-scrollbar {
  width: 6px !important;
  background: #fff !important;
  border-radius: 6px;
}
.mainGroup::-webkit-scrollbar-thumb {
  background: #aaa !important;
  height: 6px !important;
  border-radius: 6px;
}
.el-main {
  margin-bottom: 60px;
  min-width: 700px;
  overflow: hidden;
}
.el-footer {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  /* 添加此行，让footer与.chat-box之间有一定距离 */
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 200px;
  background-image: linear-gradient(
    180deg,
    rgba(53, 55, 64, 0),
    #353740 58.85%
  );
}

.loading {
  margin-bottom: 5px;
}

.el-textarea__inner {
  height: 40px;
  line-height: 40px;
  border: none;
  outline: none;
  font-size: 16px;
  resize: none;
  color: inherit;
}
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 0em 1em;
}
.hljs {
  font-size: 16px;
}
.code-block-wrapper {
  background: #1e1e1e;
  position: relative;
  padding-top: -24px;
}
.code-block-header {
  position: absolute;
  top: 5px;
  right: 0;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #b3b3b3;
}
.code-block-header__copy {
  cursor: pointer;
  margin-left: 0.5rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.text {
  font-size: 16px;
  font-weight: bold;
}
</style>
