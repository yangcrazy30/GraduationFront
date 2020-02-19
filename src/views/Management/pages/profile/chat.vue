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
      <div class="chatarea">
        <Chatbox
          v-for="chatbox in chats"
          :Name="chatbox.name"
          :Time="chatbox.fmtime"
          :Content="chatbox.message"
          :key="chatbox.id"
          v-bind:class="select(chatbox)"
        ></Chatbox>
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
          <el-button type="primary" @click="">Send</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chatRemain from "components/chatRemain";
import chatBox from "components/chatBox";
export default {
  components: { chatRemain, chatBox },
  data() {
    return {
      modal: false,
      userInfos: [{ username: "ZEO", id: "1" }],
      currentChat: { username: "" },
      message: "",
      chats: []
    };
  },
  methods: {
    handleChat(userInfo) {
      this.currentChat = userInfo;
    },
    select: function(chatbox) {
      if (chatbox.type == 0) {
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
    }
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
  flex-basis: 25%;
  background-color: white;
  overflow: hidden;
}

.cright {
  flex-basis: 75%;
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
  overflow: hidden;
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
  background: #fff;
}

.onright {
  position: relative;
  left: 70%;
  background: cornflowerblue;
  color: #fff;
}
</style>
