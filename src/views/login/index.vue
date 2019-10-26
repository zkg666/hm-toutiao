<template>
  <div class="container">
    <!-- 登录卡片 -->
    <el-card>
      <!-- logo -->
      <img src="../../assets/logo_index.png" width="200px" alt />
      <!-- 表单 -->
      <el-form ref="form" :model="formlogin" :rules="loginrules" status-icon>
        <!-- 表单选项 label="活动名称" 表单输入框前的文字-->
        <el-form-item prop="mobile">
          <!-- 表单元素 -->
          <el-input v-model="formlogin.mobile" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 表单元素 -->
          <el-input v-model="formlogin.code" class="code" placeholder="请输入验证码"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <!-- 复选框 -->
        <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        <el-form-item>
          <!-- 点击登录的时候，要进行整体检验 -->
          <el-button type="primary" class="btn" @click="alllogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 先不用
// import focus from '../../directive/v-focus'
export default {
  data () {
    // 定义一个自定义匹配手机号的正则判断
    var logincheck = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('大兄嘚，你的手机号错了'))
      }
    }
    return {
      formlogin: {
        mobile: '',
        code: ''
      },
      loginrules: {
        // 监测哪个字段就要在哪个字段写规则，名字要相同
        mobile: [
          { required: true, message: '敢不敢输点东西', trigger: 'blur' },
          { validator: logincheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码被狗吃了吗', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码6位，懂吗？？？？？？', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    alllogin () {
      // 进行整体判断的方法,如果是组件，则$refs获取的是组件实例，如果是dom则获取的是dom元素
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 检验格式正确，然后发送请求判断数据是否正确
          this.$http({
            url: 'authorizations',
            method: 'post',
            data: this.formlogin
          }).then((res) => {
            this.$router.push('/')
          }).catch(() => {
            this.$message.error('你的手机号或者是验证码输错了，厉害了')
          })
        }
      })
    }

  }
}
</script>

<style scoped lang='less'>
// 全屏容器
.container {
  width: 100%;
  height: 100%;
  // 背景尺寸 background-size 拆分写法
  // 组合写法 background:    / 背景尺寸(width,height) 简写 cover 铺面整个容器多余看不见  contain 等比例缩放完整的显示在容器内容
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
}
// 饿了么组件 el-card 组件名称  解析成HTML  后组件根元素上默认生成一个类和组件的名称一致
.el-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    text-align: center;
    margin-bottom: 20px;
  }
}
.code {
  width: 235px;
  margin-right: 10px;
}
.btn {
  width: 100%;
  margin-top: 30px;
}
</style>
