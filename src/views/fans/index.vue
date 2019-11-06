<template>
  <div class="container-fans">
    <el-card>
      <!-- 发布文章的面包屑组件 -->
      <div slot="header">
        <my-mb>粉丝管理</my-mb>
      </div>
      <!-- 选项卡组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="fanslist">
          <!-- 粉丝列表 -->
          <div class="fanslist">
            <div class="fans_item" v-for="item in fanslist" :key="item.id.toString()">
              <!-- 上面的头像 -->
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>留言</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="allpages"
              :page-size="resparams.per_page"
              :current-page="resparams.page"
              @current-change="changepage"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="fansimg">
          <!-- 粉丝画像 -->
          <!-- 这里放的是echarts图表 -->
          <div ref="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// import defaultImg from '../../assets/default.png'
// 引入echarts
import echarts from 'echarts'
export default {
  created () {
    // 在这里获取粉丝数据
    this.getfanslist()
  },
  mounted () {
    const dom = this.$refs.main
    const myChart = echarts.init(dom)
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myChart.setOption(option)
  },
  data () {
    return {
      // defaultImg,
      activeName: 'fanslist',
      fanslist: [],
      resparams: {
        page: 1,
        per_page: 21
      },
      allpages: 0
    }
  },
  methods: {
    changepage (newpage) {
      this.resparams.page = newpage
      this.getfanslist()
    },
    async getfanslist () {
      const { data: { data } } = await this.$http({
        url: 'followers',
        params: this.resparams
      })
      this.fanslist = data.results
      this.allpages = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.fans_item {
  width: 150px;
  height: 190px;
  text-align: center;
  border: 1px dashed #ddd;
  padding-top: 20px;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
