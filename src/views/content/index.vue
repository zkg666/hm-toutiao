<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <my-mb>内容管理</my-mb>
      </div>
      <!-- 表单元素 -->
      <el-form size="small" label-width="80px">
        <!-- 状态单选框系列 -->
        <el-form-item label="状态">
          <el-radio-group v-model="content.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <!-- <el-radio :label="4">已删除</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <!-- 频道框 -->
        <el-form-item label="频道:">
          <el-select placeholder="请选择" v-model="content.channel_id" clearable>
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期框 -->
        <el-form-item label="日期:">
          <el-date-picker
            v-model="datearr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changedate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选 -->
    <el-card style="margin-top:20px" class="ecard">
      <div slot="header">
        <span>根据筛选条件共查询到{{allpages}}条结果</span>
      </div>
      <el-table :data="articles">
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <el-image
              style="width:100px;height:100px;border:1px solid #ddd"
              :src="scope.row.cover.images[0]"
              fit="contain"
            >
              <div slot="error" class="image-slot">
                <img src="../../assets/error.gif" alt width="100px" height="100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status==1">待审核</el-tag>
            <el-tag v-if="scope.row.status==2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status==3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status==4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="allpages"
        :page-size="content.per_page"
        :current-page="content.page"
        @current-change="changepage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channels: [],
      datearr: [],
      articles: [],
      allpages: 0
    }
  },
  methods: {
    // 点击编辑按钮时跳转页面，是带参数的跳转页面
    // 带参数跳转需要用到query方式的传参，不能是params传参，query不会改变路径，params传参会改变路径
    edit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 点击删除，也需要传入id值
    // 由于在传入的id值超出了js的数字安全最大值，所以在axios在把json字符串转化为js对象的时候，出现了误
    // 差，在进行大数字计算的时候也会出现误差，所以需要一个插件
    del (id) {
      // 可以设置一个提示框
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http({
          url: `articles/${id}`,
          method: 'delete'
        })
        this.getarticles()
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
    },
    changedate (datearr) {
      if (datearr) {
        // console.log(datearr)
        this.content.begin_pubdate = datearr[0]
        this.content.end_pubdate = datearr[1]
      } else {
        this.content.begin_pubdate = null
        this.content.end_pubdate = null
      }
    },
    // 获取频道的信息
    async getchannels () {
      const { data: { data } } = await this.$http({
        url: 'channels',
        method: 'get'
      })
      this.channels = data.channels
    },
    // 获取文章信息
    async getarticles () {
      const { data: { data } } = await this.$http({
        url: 'articles',
        method: 'get',
        params: this.content
      })
      // console.log(data)
      this.articles = data.results
      this.allpages = data.total_count
    },
    // 当页码改变的时候
    changepage (newpage) {
      this.content.page = newpage
      this.getarticles()
    },
    // 点击删选时的事件
    search () {
      // 当添加了清除频道选项时，会默认的将channel_id这个值赋值为""空字符串，但是请求接口的时候，不能为空字符串，需要设为null
      if (this.content.channel_id === '') {
        this.content.channel_id = null
      }
      // 删选之后重回第一页
      this.content.page = 1
      // 重新调用插口
      this.getarticles()
    }
  },
  created () {
    this.getchannels()
    this.getarticles()
  }
}
</script>

<style scoped lang='less'>
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
