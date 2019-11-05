<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <my-mb>评论管理</my-mb>
      </div>
      <!-- 下面的是table表格 -->
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- true的时候是正常状态，false是关闭状态 -->
            <span>{{scope.row.comment_status?'正常':'关闭'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="danger" v-if="scope.row.comment_status" size="small" @click="togcomment(false,scope.row.id)">关闭评论</el-button>
            <el-button type="success" v-if="!scope.row.comment_status" size="small" @click="togcomment(true,scope.row.id)">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 下面放的是分页器 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="content.per_page"
        :current-page="content.page"
        @current-change="changepage"
        style="margin-top:20px;text-align:center"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      content: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  created () {
    this.getarticles()
  },
  methods: {
    // 点击打开评论和关闭评论
    async togcomment (drag, id) {
      await this.$http({
        url: `comments/status?article_id=${id}`,
        method: 'put',
        data: { allow_comment: drag }
      })
      this.$message.success(drag ? '打开评论成功' : '关闭评论成功')
      this.getarticles()
    },
    changepage (newpage) {
      this.content.page = newpage
      this.getarticles()
    },
    // 获取文章信息
    async getarticles () {
      const { data: { data } } = await this.$http({
        url: 'articles',
        method: 'get',
        params: this.content
      })
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'></style>
