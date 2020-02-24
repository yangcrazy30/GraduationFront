<template>
  <div class="box">
    <div class="head">
      <span style="font-size:10px;">{{ Time }}</span>
    </div>
    <div class="content">
      <span>{{ Content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Time: String,
    Content: String
  }
};
</script>

<style scoped>
.head {
  padding: 5px;
}

span {
  font-size: 15px;
  margin: 5px 5px;
}

.content {
  font-size: 24px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 10px;
}
.box {
  border-radius: 10px;
  width: 25%;
  height: auto;
  min-height: 100px;
  margin: 10px 5px;
  display: flex;
  flex-direction: column;
}
</style>
