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
              <div v-html="highlightCode(item.content)" v-highlight></div>
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
// import hljs from "highlight.js";
export default {
  name: "ChatBox",
  data() {
    return {
      messages: [
        // {
        //   role: "user",
        //   content:
        //     'JS闭包：\n\n```html\nfunction outerFunction() {\n  var message = "Hello World!"; // 私有变量\n  function innerFunction() {    // 内部函数\n    console.log(message);\n  }\n  return innerFunction;         // 返回内部函数\n}\n\nvar myFunc = outerFunction();   // 保存内部函数到myFunc变量中\nmyFunc();                       // 调用内部函数，输出"Hello World!"\n```',
        // },
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
      if (!codeBlocks) return content; // 如果没有代码块则直接返回原文本
      codeBlocks.forEach((codeBlock) => {
        // const lang = codeBlock.match(/```(\S+)/)[1]; // 获取语言类型
        const code = codeBlock; // 使用highlight.js对代码块进行高亮
        this.code = code;
        console.log(codeBlock);
        content = content.replace(
          codeBlock,
          `<pre ><code  class="javascript">${code}</code></pre>`
        ); // 替换原文本中的代码块为高亮后的HTML
      });
      console.log(content);
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

.hljs {
  font-size: 16px;
}
</style>
