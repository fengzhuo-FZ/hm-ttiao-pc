<template>
  <el-select @change="changeChannel" clearable v-model="channelId" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "my-channel",
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
      // 解构是针对res的，那么res的数据结构 {data:{message:'OK',data:{channels:[]}}}
      // const {data} = res 现在：data响应主体  res.data
      // const { data: { data } } = res  现在：data具体data字段对应数据，res.data.data
      const {
        data: { data }
      } = await this.$http.get("channels");
      // this.channelOptions = [{id:'频道ID',name:'频道名称'},...]
      this.channelOptions = data.channels;
    },
    // 选择频道
    changeChannel(value) {
      if (value === "") this.channelId = null;
    }
  }
};
</script>

<style scoped lang='less'></style>