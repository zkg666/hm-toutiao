<template>
  <div class="container-image">
    <!-- 外面的盒子按钮，点击出现对话框 -->
    <div class="btn" @click="open">
      <img :src="value||defalut" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible">
      <!-- 这里放的是素材库/上传图片组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="images">
          <!-- 这里放收藏的图片素材 -->
          <!-- 按钮 -->
          <el-radio-group v-model="content.collect" size="small" @change="changeimg">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 下面放的是图片素材们 -->
          <div class="images" style="margin-top:20px">
            <div
              class="image_item"
              v-for="item in images"
              :key="item.id"
              style="margin-right:15px;margin-bottom:15px"
              @click="settrue(item.url)"
              :class="{select:selectPublicImages==item.url}"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 这里放的是分页器 -->
          <div class="footer">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="content.per_page"
              :current-page="content.page"
              @current-change="changepage"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传文件的组件放在这里 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            name="image"
            :headers="header"
          >
            <img v-if="selectUploadImages" :src="selectUploadImages" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="trueimages">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local.js'
// 引入默认图片,才能被解析
import defalutimg from '@/assets/default.png'
export default {
  // 接受父组件传过来的值
  props: ['value'],
  data () {
    return {
      defalut: defalutimg,
      dialogVisible: false,
      activeName: 'images',
      content: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      header: { Authorization: `Bearer ${local.getuser().token}` },
      selectPublicImages: null,
      selectUploadImages: null
    }
  },
  methods: {
    // 需要把地址传出去，用到双向绑定
    trueimages () {
      // 判断用户是否选中了素材列表或者是上传图片成功，如果没有选择提示选择，否则消失
      if (this.activeName === 'images') {
        if (this.selectPublicImages === null) {
          this.$message.error('请选择素材图片')
        } else {
          // 获取图片地址，将地址赋值到页面上
          // this.defalut = this.selectPublicImages
          // 点击确定的时候，隐藏对话框
          this.dialogVisible = false
          // 将数据从子组件中传递到父组件中
          this.$emit('input', this.selectPublicImages)
        }
      } else if (this.activeName === 'upload') {
        if (this.selectUploadImages === null) {
          this.$message.error('请上传图片')
        } else {
          // this.defalut = this.selectUploadImages
          this.dialogVisible = false
          this.$emit('input', this.selectUploadImages)
        }
      }
    },
    // 点击图片给图片加上一个属性唯一值，在去判断点击的这个图片的唯一值和他本身的是否相同，相同则显示样式，否则不显示
    settrue (url) {
      this.selectPublicImages = url
    },
    // 素材上传成功后后执行的函数
    handleAvatarSuccess (response) {
      this.selectUploadImages = response.data.url
      this.$message.success('上传成功')
    },
    async getimages () {
      const { data: { data } } = await this.$http({
        url: 'user/images',
        method: 'get',
        params: this.content
      })
      this.images = data.results
      this.total = data.total_count
    },
    open () {
      this.dialogVisible = true
      //  点击open的时候发送请求
      this.getimages()
      // 点击时把选中的样式清除
      this.selectPublicImages = null
      this.selectUploadImages = null
      // 点击时处于素材库中
      this.activeName = 'images'
    },
    changepage (newpage) {
      this.content.page = newpage
      this.getimages()
    },
    // 全部收藏按钮
    changeimg () {
      this.page = 1
      this.getimages()
    }
  }
}
</script>

<style scoped lang='less'>
.container-image {
  display: inline-block;
  margin-right: 20px;
  .btn {
    height: 160px;
    width: 160px;
    border: 1px dashed #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
// 对话框中的图片样式
.avatar-uploader {
  width: 178px;
  margin: 0 auto;
}
.image_item {
  width: 160px;
  height: 120px;
  display: inline-block;
  border: 1px solid #ccc;
  position: relative;
  &.select::after {
    content: "";
    display: block;
    width: 160px;
    height: 120px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat center /
      50px 50px;
  }
  img {
    height: 100%;
    width: 100%;
  }
  .icons {
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 100%;
    background-color: #000;
    opacity: 0.5;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
.footer {
  text-align: center;
}
</style>
