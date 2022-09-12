<template>
  <div>
    <!-- <el-table :data="listData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" />
    </el-table> -->
    <el-table-ts :data="listData" :columns="columns" :pagination="{}" />
    <el-form-plus :options="options" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: [
        {
          name: '刘小凡',
          sex: '男',
          age: 18,
          address: '江苏省 南京市',
          desc: {
            height: 180
          }
        },
        {
          name: '张如霞',
          sex: '女',
          age: 16,
          address: '江苏省 南京市',
          desc: {
            height: 160
          }
        }
      ],
      columns: [
        { label: '姓名', prop: 'name', editable: true },
        { label: '性别', prop: 'sex' },
        { label: '年龄', prop: 'age' },
        { label: '地址', prop: 'address' },
        { label: '描述', prop: 'desc.height' }
      ],
      options: [
        {
          type: 'Input',
          field: 'input',
          // 初始值
          value: 'input初始值'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
