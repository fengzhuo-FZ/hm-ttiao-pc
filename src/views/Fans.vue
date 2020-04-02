<template>
  <div class="fans-container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <div class="fans_item" v-for="item in list" :key="item">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="img">2</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-fans",
  data() {
    return {
      // tabs的当前激活选项卡的name属性值
      activeName: "list",
      // 测试头像
      //   circleUrl:
      //     "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      reqParams: {
        page: 1,
        per_page: 24
      },
      list: [],
      total: 0
    };
  },
  created() {
    this.getFansList();
  },
  methods: {
    // 分页
    changePager(newPage) {
      this.reqParams.page = newPage;
      this.getFansList();
    },
    //获取素材列表
    async getFansList() {
      const {
        data: { data }
      } = await this.$http.get("followers", { params: this.reqParams });
      this.list = data.results;
      this.total = data.total_count;
    }
  }
};
</script>

<style scoped lang='less'>
.fans_list {
  .fans_item {
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    p {
      margin: 10px 0;
    }
  }
}
</style>