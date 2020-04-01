<template>
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "my-channel",
  props: ["value"],
  data() {
    return {
      // 频道ID
      channelId: null,
      // 频道下拉选项
      channelOptions: []
    };
  },
  created() {
    this.getChannelOptions();
  },
  methods: {
    // 获取频道下拉选项数据
    async getChannelOptions() {
      const {
        data: { data }
      } = await this.$http.get("channels");
      // this.channelOptions = [{id:'频道ID',name:'频道名称'},...]
      this.channelOptions = data.channels;
    },
    // 选择频道
    changeChannel(value) {
      if (value === "") value = null;
      // 把 value 数据提交给父组件，让父组件给 reqParams.channel_id赋值。
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped lang='less'></style>