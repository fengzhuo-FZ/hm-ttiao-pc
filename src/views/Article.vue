<template>
  <div class="article-container">
    <!-- 筛选条件区域 -->
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果区域 -->
  </div>
</template>

<script>
import MyBread from "@/components/my-bread";
export default {
  components: { MyBread },
  name: "my-article",
  data() {
    return {
      // 筛选条件对象数据
      reqParams: {
        // 当字段的值为null的时候，这个不会发送给后台
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道下拉选项数据
      channelOptions: [{ value: 1000, label: "前端" }],
      // 时间范围 [起始日期,结束日期]
      // 当日期控件选择了日期后动态给 reqParams 中 begin_pubdate end_pubdate 赋值
      dateArr: []
    };
  },
  created() {
    // 测试获取后台数据
    // this.$http.get("articles")
    //   .then(res => console.log(res.data))
    //   .catch(() => console.log("请求失败"));
  }
};
</script>

<style scoped lang='less'></style>