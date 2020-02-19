<template>
  <div class="box">
    <div class="leftbar"></div>
    <div class="rightbar">
      <span>{{ userInfo.username }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: Object
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: row;
  height: 50px;
  background-color: rgb(243, 234, 243);
}

.leftbar {
  height: 50px;
  width: 50px;
}

.rightbar {
  height: 50px;
  flex-basis: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
