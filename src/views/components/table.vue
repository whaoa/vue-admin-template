<template>
  <container ref="a">
    <h2 slot="header" class="px20">数据表格</h2>

    <h3>异步请求</h3>
    <al-table :fetch="fetch" :form-model="form">
      <template #form>
        <el-form-item label="审批人" prop="input">
          <el-input v-model="form.input" placeholder="审批人" clearable />
        </el-form-item>
        <el-form-item label="活动区域" prop="select">
          <el-select v-model="form.select" placeholder="活动区域" clearable>
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </template>

      <template #form-prepend>
        <el-button type="info">前置插槽</el-button>
      </template>
      <template #form-append>
        <el-button type="info">后置插槽</el-button>
      </template>
      <template #operation>批量操作区域插槽</template>

      <el-table-column sortable="custom" fixed prop="date" label="日期" width="150" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="province" label="省份" width="120" />
      <el-table-column prop="city" label="市区" width="120" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="zip" label="邮编" width="120" />
    </al-table>

    <h3>静态数据</h3>
    <al-table :data="tableData" :show-form="false">
      <el-table-column fixed prop="date" label="日期" width="150" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="province" label="省份" width="120" />
      <el-table-column prop="city" label="市区" width="120" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="zip" label="邮编" width="120" />
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <span v-show="false">{{ scope.row.zip }}</span>
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
          <el-dropdown trigger="click">
            <el-button type="text" size="small">更多</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </al-table>

    <h3>动态设置</h3>
    <al-table ref="table" :show-form="false">
      <el-table-column fixed prop="date" label="日期" width="150" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="province" label="省份" width="120" />
      <el-table-column prop="city" label="市区" width="120" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="zip" label="邮编" width="120" />
    </al-table>
  </container>
</template>

<script>
import Container from '@/components/AlContainer';
export default {
  name: 'TableComponent',

  components: { Container },

  data () {
    return {
      form: {
        input: '',
        select: '',
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333,
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333,
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333,
        },
      ],
    };
  },

  mounted () {
    this.asyncData();
  },

  methods: {
    fetch () {
      return new Promise(resolve => setTimeout(() => resolve({ list: this.tableData }), 3000));
    },

    async asyncData () {
      this.$refs.table.setLoading(true);
      setTimeout(() => {
        this.$refs.table.setTableData(this.tableData);
        this.$refs.table.setLoading(false);
      }, 3000);
    },
  },
};
</script>
