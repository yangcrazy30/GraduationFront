<template>
  <div class="box">
    <div class="cleft">
      <chatRemain
        v-for="item in userInfos"
        :key="item.id"
        :userInfo="item"
        v-on:click.native="handleChat(item)"
      ></chatRemain>
    </div>
    <div class="cright">
      <div class="chathead">
        <span>{{ currentChat.username }}</span>
      </div>
      <div class="chatarea" id="msg">
        <chatBox
          v-for="chatbox in chats"
          :Time="chatbox.time"
          :Content="chatbox.message"
          :key="chatbox.id"
          v-bind:class="select(chatbox)"
        ></chatBox>
      </div>
      <div class="foot">
        <div class="inputitem" style="flex-basis:75%">
          <el-input
            v-model="message"
            placeholder="Please Input"
            type="textarea"
          ></el-input>
        </div>
        <div class="inputitem" style="flex-basis:25%">
          <el-button type="primary" @click="sendMessage">Send</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chatRemain from "components/chatRemain";
import chatBox from "components/chatBox";
import { getCourseById } from "api/course/course";
import { getUserinfo } from "api/account/account";
import { getMessage, sendMessage, getSender } from "api/chat/chat";
export default {
  components: { chatRemain, chatBox },
  data() {
    return {
      modal: false,
      currentChat: { username: "", id: "" },
      message: "",
      chats: [],
      userInfos: []
    };
  },
  async mounted() {
    await this.getMessageSender();
    await this.receiveMessage();
  },
  methods: {
    async handleChat(item) {
      this.currentChat = item;
      await this.receiveMessage();
    },
    select: function(chatbox) {
      if (chatbox.fromId !== this.currentChat.id) {
        return {
          onleft: false,
          onright: true
        };
      } else {
        return {
          onleft: true,
          onright: false
        };
      }
    },
    async getMessageSender() {
      const res = await getSender(this.$store.state.account.id);
      this.userInfos = res.data.data;
      console.log(res);
    },
    async sendMessage() {
      if (this.message !== "") {
        this.$socket.emit("sendmessage", this.currentChat.id);
        await sendMessage(
          this.$store.state.account.id,
          this.currentChat.id,
          this.message
        );
        await this.receiveMessage();
      } else {
        this.$message({
          type: "warning",
          message: "输入为空哦"
        });
      }
    },
    async receiveMessage() {
      const res = await getMessage(
        this.currentChat.id,
        this.$store.state.account.id
      );
      this.chats = res.data.data;
      this.$nextTick(() => {
        let msg = document.getElementById("msg");
        msg.scrollTop = msg.scrollHeight;
      });
    }
  },
  sockets: {
    receivemessage: async function() {}
  }
};
</script>

<style scoped>
.box {
  height: 100%;
  display: flex;
  flex-direction: row;
}

.cleft {
  flex-basis: 20%;
  background-color: rgb(253, 253, 253);
  overflow: scroll;
}

.cright {
  flex-basis: 80%;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.chathead {
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.chatarea {
  flex: 1;
  overflow: scroll;
}

.foot {
  height: 100px;
  display: flex;
  flex-direction: row;
}

.inputitem {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.onleft {
  position: relative;
  left: 0%;
  background: rgb(171, 155, 216);
}

.onright {
  position: relative;
  left: 70%;
  background: cornflowerblue;
  color: #fff;
}
</style>
