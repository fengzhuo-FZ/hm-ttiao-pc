<template>
  <div class="login-container">
    <el-card class="my-card">
      <img src="../assets/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login()" type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入工具模块
import auth from "@/utils/auth";

export default {
  name: "my-login",
  data() {
    // 自定义校验规则
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("手机号格式错误"));
      }
    };
    return {
      // 登录表单数据对象
      loginForm: {
        mobile: "13766666666",
        code: "246810"
      },
      // 校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // 指定一个自定义校验函数,失去焦点后触发
          { validator: checkMobile, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { len: 6, message: "长度在6个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      // 登录前，对整体表单进行校验
      // this.$refs.loginForm  就是组件实例
      this.$refs.loginForm.validate(async valid => {
        // valid 代表整体表单是否校验成功
        if (valid) {
          // 校验成功，进行登录
          // console.log('进行登录')
          // this.$http.post('authorizations', this.loginForm).then(res => {
          //   // 登录成功
          //   // 存储用户信息 res === {data:{message:'提示信息',data:'用户信息对象'}}
          //   // res.data 是响应主体，响应主体才是后台返回的数据
          //   auth.setUser(res.data.data)
          //   // 跳转到首页
          //   this.$router.push('/')
          // }).catch(() => {
          //   // 错误提示
          //   this.$message.error('手机号或验证码错误')
          // })

          // async 和 await 修改登录请求
          // res是什么？是响应报文对象（响应结果对象），响应主体数据 res.data
          // 一下三句代码是理想情况下的代码，但是下面三句代码可能报错
          // ES语法：try{ // 可能出现异常代码片段 }catch(e){ // 捕获异常，前面try的代码片段出现异常，执行catch里面代码 }
          // catch(e) e参数：error 错误对象，exception 异常对象。
          try {
            const res = await this.$http.post("authorizations", this.loginForm);
            auth.setUser(res.data.data);
            this.$router.push("/");
          } catch (e) {
            this.$message.error("手机号或验证码错误");
          }
        }
      });
    }
  }
};
</script>

<style scoped lang='less'>
.login-container {
  position: absolute;
  left: 0;
  top: 0;
  // 让高度和宽度直接去继承窗口的大小
  width: 100%;
  height: 100%;
  //   background-color: pink;
  background: url(../assets/login_bg.jpg) no-repeat center / cover;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    img {
      display: block;
      width: 200px;
      margin: 0 auto 20px;
    }
  }
}
</style>