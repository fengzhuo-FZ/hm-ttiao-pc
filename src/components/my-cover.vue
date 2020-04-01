<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog()">
      <img src="../assets/default.png" />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="720px">
      <!-- tab组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 切换按钮 -->
          <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 素材列表 -->
          <div class="img_list">
            <div class="img_item" v-for="item in images" :key="item.id">
              <img :src="item.url" />
            </div>
          </div>
          <!-- 分页组件 -->
          <el-pagination
            background
            layout="prev, pager, next"
            hide-on-single-page
            @current-change="changePager"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            :total="total"
          >></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">上传图片内容</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "my-cover",
  data() {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 当前tabs组件激活的选项卡的name属性的值
      activeName: "image",
      // 筛选条件对象
      reqParams: {
        // 列表类型（全部，收藏）
        collect: false,
        page: 1,
        per_page: 8
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0
    };
  },
  methods: {
    // 打开对话框
    openDialog() {
      this.dialogVisible = true;
      // 只有用户打开了对话框，才有选择素材的需求，再去加载数据才是合理的。
      // 而且每次打开对话框，都可以拿到最新的素材数据。
      this.getImages();
    },
    // 全部 收藏
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    },
    // 分页函数
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
// 图片按钮
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
// 素材列表
.img_list {
  margin-top: 15px;
  .img_item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>