<template>
  <SubFileItem>
    <template #title>
      <Icon :iconClass="data.type">{{ data.name }}</Icon>
    </template>
    <template v-for="child in data.children">
      <FileItem :file="child" :key="child.id" v-if="!child.children">
        <Icon :iconClass="child.type"> {{ child.name }}</Icon>
      </FileItem>
      <ReSubItem v-else :key="child.id" :data="child"></ReSubItem>
    </template>
  </SubFileItem>
</template>

<script>
import SubFileItem from "./SubFileItem";
import FileItem from "./FileItem";
import Icon from "components/iconfont";
export default {
  name: "ReSubItem",
  components: {
    SubFileItem,
    FileItem,
    Icon
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    methods: {}
  },
  data() {
    return {};
  }
};
</script>

<style scoped></style>
