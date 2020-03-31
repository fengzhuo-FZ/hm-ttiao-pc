<template>
  <div class="images-container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮栏 -->
      <div class="btn_box">
        <el-radio-group @change="changeCollect()" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right">添加收藏</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option" v-if="!reqParams.collect">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :style="{color:item.is_collected?'red':'#fff'}"
            ></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        current-change="changePager"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-image",
  data() {
    return {
      // 查询素材参数
      reqParams: {
        // 默认查询全局 false 收藏 true
        collect: false,
        page: 1,
        per_page: 2
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    // 切换 添加收藏 与 取消收藏
    async toggleStatus(item) {
      try {
        // 修改请求
        const {
          data: { data }
        } = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        });
        // data.collect 修改后的图片状态
        // 提示
        this.$message.success(data.collect ? "添加收藏成功" : "取消收藏成功");
        // 视图：收藏按钮颜色样式
        // item 就是渲染当前图片的，修改item即可驱动视图修改
        item.is_collected = data.collect;
      } catch (e) {
        this.$message.error("操作失败");
      }
    },
    // 切换全局与收藏
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    },
    // 切换分页
    changePager(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    // 获取素材列表
    async getImages() {
      const {
        data: { data }
      } = await this.$http.get("user/images", { params: this.reqParams });
      this.images = data.results;
      this.total = data.total_count;
    }
  }
};
</script>

<style scoped lang='less'>
// 图片列表
.img_list {
  margin-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    display: inline-block;
    position: relative;
    margin-right: 50px;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      width: 100%;
      color: #fff;
      span {
        margin: 0 30px;
      }
    }
  }
}
</style>
