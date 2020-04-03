<template>
  <div class="container">组件A {{str}}</div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
  data() {
    return {
      str: ""
    };
  },
  created() {
    // 使用事件总线绑定事件
    eventBus.$on("b2a", data => {
      // data触发事件时候的传参
      this.str = data;
    });
  }
};
</script>

<style scoped lang='less'></style>