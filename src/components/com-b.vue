<template>
  <div class="container">
    组件B
    <button @click="fn">B传值A</button>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
  data() {
    return {
      msg: "B组件数据"
    };
  },
  methods: {
    fn() {
      // 提交数据给A组件
      // 使用事件总线触发事件，进行传值
      eventBus.$emit("b2a", this.msg);
    }
  }
};
</script>

<style scoped lang='less'></style>