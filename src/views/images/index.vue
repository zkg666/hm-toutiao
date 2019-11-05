<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-mb>素材管理</my-mb>
      </div>
      <!-- 按钮 -->
      <el-radio-group v-model="content.collect" size="small" @change="changeimg">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" size="small" style="float:right" @click="opentell">添加素材</el-button>
      <!-- 下面放的是图片素材们 -->
      <div class="images" style="margin-top:20px">
        <div
          class="image_item"
          v-for="item in images"
          :key="item.id"
          style="margin-right:30px;margin-bottom:30px"
        >
          <img :src="item.url" alt />
          <!-- 放收藏删除按钮 -->
          <div class="icons" v-if="!content.collect">
            <span class="el-icon-sunny" :class="{red:item.is_collected}" @click="collectimg(item)"></span>
            <span class="el-icon-delete" @click="delimg(item)"></span>
          </div>
        </div>
      </div>
      <!-- 下面放的是分页器 -->
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
    </el-card>
    <!-- 这里放的是默认隐藏的对话框 -->
    <el-dialog title="温馨大提示" :visible.sync="dialogVisible" width="300px" >
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        name="image"
        :headers="header"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      content: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      header: { Authorization: `Bearer ${local.getuser().token}` }
    }
  },
  created () {
    this.getimages()
  },
  methods: {
    // 素材上传成功后后执行的函数
    handleAvatarSuccess (response) {
      this.imageUrl = response.data.url
      setTimeout(() => {
        this.dialogVisible = false
        this.content.page = 1
        this.getimages()
      }, 1000)
    },
    opentell () {
      this.dialogVisible = true
      this.imageUrl = null
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
    changepage (newpage) {
      this.content.page = newpage
      this.getimages()
    },
    // 全部收藏按钮
    changeimg (newZT) {
      this.page = 1
      this.content.collect = newZT
      this.getimages()
    },
    // 点击收藏，未收藏变收藏，收藏变未收藏
    async collectimg (item) {
      console.log(item.id)
      const { data: { data } } = await this.$http({
        url: `user/images/${item.id}`,
        method: 'put',
        data: { collect: !item.is_collected }
      })
      // 点击后，发送了请求，将想要改的数据发送到接口上，然后返回改的数据
      item.is_collected = data.collect
      if (data.collect) { this.$message.success('收藏成功') } else { this.$message.success('取消收藏成功') }
    },
    // 删除功能
    delimg (item) {
      // 可以设置一个提示框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 在这里发送请求
        await this.$http({
          url: `user/images/${item.id}`,
          method: 'delete'
        })
        this.getimages()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style scoped lang='less'>
.avatar-uploader {
    width: 178px;
    margin:0 auto;
}
.image_item {
  width: 200px;
  height: 170px;
  display: inline-block;
  border: 1px solid #ccc;
  position: relative;
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
    span {
      padding: 0 35px;
      font-size: 20px;
      color: #fff;
      font-weight: 700;
      &.red {
        color: red;
      }
    }
  }
}
.footer {
  text-align: center;
}
</style>
