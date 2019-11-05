<template>
  <div class="container-setting">
    <el-card class="box-card">
      <div slot="header">
        <my-mb>个人设置</my-mb>
      </div>
      <el-row>
        <el-col :span="12">
          <!-- 表单元素 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">
              <span>{{id}}</span>
            </el-form-item>
            <el-form-item label="手机：">
              <span>{{mobile}}</span>
            </el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" :rows="3" v-model="userInfo.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            style="text-align:center"
            :http-request="upload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 引入本地存储
import local from '@/utils/local.js'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      id: '',
      mobile: '',
      userInfo: {
        name: '',
        intro: '',
        email: ''
      },
      imageUrl: null
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    // 图片上传换为主动的方式
    async upload (res) {
      // 获取图片的文件信息
      const FILE = res.file
      // 新建一个formedata对象
      const fd = new FormData()
      fd.append('photo', FILE)
      const { data: { data } } = await this.$http({
        url: 'user/photo',
        method: 'patch',
        data: fd
      })
      // console.log(data)
      // 提示
      this.$message.success('修改头像成功')
      // 预览图片
      this.imageUrl = data.photo
      // 更改本地存储中的图片地址
      const usermsg = local.getuser()
      usermsg.photo = data.photo
      local.setuser(usermsg)
      // 将改的图片地址传给home组件，进行更改
      eventBus.$emit('tohomephoto', data.photo)
    },
    // 点击保存设置发生的
    async submit () {
      const { data: { data } } = await this.$http({
        url: 'user/profile',
        method: 'patch',
        data: this.userInfo
      })
      this.$message.success('保存设置成功')
      // 改变本地存储的信息和home组件的信息
      const usermsg = local.getuser()
      usermsg.name = data.name
      local.setuser(usermsg)
      // 将改的名字传给home组件，进行改名字
      eventBus.$emit('tohomename', data.name)
    },
    // 获取用户信息的方法
    async getUser () {
      const { data: { data } } = await this.$http({
        url: 'user/profile'
      })
      this.userInfo = data
      this.id = data.id
      this.mobile = data.mobile
      this.imageUrl = data.photo
    }
  }
}
</script>

<style scoped lang='less'></style>
