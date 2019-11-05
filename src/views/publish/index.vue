<template>
  <div class="container-publish">
    <el-card>
      <!-- 发布文章的面包屑组件 -->
      <div slot="header">
        <my-mb>{{$route.query.id?'修改文章':'发布文章'}}</my-mb>
      </div>
      <!-- 表单 -->
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input style="width:400px" v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本由于比较复杂，element没有提供关于富文本的东西，可以用第三方的插件 -->
          <quill-editor :options="editorOption" v-model="article.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="article.cover.type" @change="clearimg">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 下面放的是封装添加图片的组件 -->
          <div class="myimages" v-if="article.cover.type===3">
            <my-images v-model="article.cover.images[0]"></my-images>
            <my-images v-model="article.cover.images[1]"></my-images>
            <my-images v-model="article.cover.images[2]"></my-images>
          </div>
          <div class="myimages" v-if="article.cover.type===1">
            <my-images v-model="article.cover.images[0]"></my-images>
          </div>
        </el-form-item>
        <!-- 频道组件 -->
        <el-form-item label="频道：">
          <!-- 封面下面是一个封装组件 -->
          <my-channel v-model="article.channel_id"></my-channel>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item v-if="!$route.query.id">
          <el-button type="success" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button type="success" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  watch: {
    '$route.query.id': function () {
      const imgId = this.$route.query.id
      // 判断如果有id说明处于编辑状态
      if (imgId) {
      // 发送请求把数据渲染到页面上
        this.getarticle(imgId)
      } else {
        this.article = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  // 当地址栏有id的时候说明处于编辑状态中，需要在组件初始化的时候，获取id，然后获取文章信息在渲染到页面上
  // 当重新点击发布文章，需要重置页面

  created () {
    const imgId = this.$route.query.id
    // console.log(imgId)
    // 判断如果有id说明处于编辑状态
    if (imgId) {
      // 发送请求把数据渲染到页面上
      this.getarticle(imgId)
      // 需要改变三个地方 面包屑的文字，发表文章按钮，请求的内容
    } else {
      this.article = {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    // 点击按钮组的时候清除原有的图片
    clearimg () {
      this.article.cover.images = []
    },
    async getarticle (id) {
      const { data: { data } } = await this.$http({
        url: `articles/${id}`,
        method: 'get'
      })
      // console.log(data)
      // 把获得的数据给article，然后数据改变视图变化,在article数据中会多出了一个id属性
      this.article = data
    },
    async submit (draft) {
      await this.$http({
        url: `articles?draft=${draft}`,
        method: 'post',
        data: this.article
      })
      this.$message.success(draft ? '存入草稿成功' : '发布成功')
      this.$router.push('/content')
    },
    // 当处于编辑状态的时候
    async edit (draft) {
      await this.$http({
        url: `articles/${this.article.id}`,
        params: { draft: `${draft}` },
        method: 'put',
        data: this.article
      })
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/content')
    }
  },
  data () {
    return {
      article: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 这是配置富文本框的配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
