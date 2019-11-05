<template>
  <el-select placeholder="请选择" :value="value" @change="fn" clearable>
    <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.getchannels()
  },
  methods: {
    // 获取频道的信息
    async getchannels () {
      const { data: { data } } = await this.$http({
        url: 'channels',
        method: 'get'
      })
      this.channels = data.channels
    },
    fn (channlid) {
      // 当添加了清除频道选项时，会默认的将channel_id这个值赋值为""空字符串，但是请求接口的时候，不能为空字符串，需要设为null
      if (channlid === '') {
        channlid = null
      }
      this.$emit('input', channlid)
    }
  }
}
</script>

<style scoped lang='less'></style>
