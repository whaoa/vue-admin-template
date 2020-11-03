<template>
  <div class="al-table">
    <el-form v-if="showForm" ref="form" class="form" :model="formModel" inline>
      <slot name="form" />
      <el-form-item v-if="showFormBtn">
        <slot name="form-prepend" />
        <el-button v-if="showFormSearch" type="primary" icon="el-icon-search" @click="getTableData">搜索</el-button>
        <el-button v-if="showFormReset" type="primary" @click="resetForm">重置</el-button>
        <slot name="form-append" />
      </el-form-item>
    </el-form>

    <div v-if="$slots.operation || showExport || showFilter" class="operation flex">
      <div class="flex-1">
        <slot name="operation" />
      </div>
      <div v-if="showExport || showFilter">
        <el-button v-if="showFilter" type="primary" icon="el-icon-s-operation" circle />
        <el-button v-if="showExport" type="primary" icon="el-icon-download" circle @click="exportTableData" />
      </div>
    </div>

    <el-table
      ref="table"
      v-loading="loading"
      class="table"
      :data="list"
      border
      v-bind="$attrs"
      v-on="$listeners"
      @sort-change="getTableData({ sort: $event })"
    >
      <slot />
    </el-table>

    <div v-if="showPage">
      <el-pagination
        background
        :total="page.total"
        :page-size.sync="page.size"
        :page-sizes="[10, 20, 30, 40, 50]"
        :current-page.sync="page.current"
        layout="total, prev, pager, next, jumper, sizes"
        @size-change="getTableData({ size: $event })"
        @current-change="getTableData({ page: $event })"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlTable',

  props: {
    showForm: {
      type: Boolean,
      default: true,
    },

    showFormBtn: {
      type: Boolean,
      default: true,
    },

    showFormSearch: {
      type: Boolean,
      default: true,
    },

    showFormReset: {
      type: Boolean,
      default: true,
    },

    showFilter: {
      type: Boolean,
      default: false,
    },

    showExport: {
      type: Boolean,
      default: false,
    },

    showPage: {
      type: Boolean,
      default: true,
    },

    params: {
      type: Object,
      default: () => ({}),
    },

    formModel: {
      type: Object,
      default: () => ({}),
    },

    /* eslint-disable vue/require-default-prop */
    data: {
      type: Array,
    },

    fetch: {
      type: Function,
    },
    /* eslint-enable vue/require-default-prop */
  },

  data () {
    return {
      loading: true,
      list: [],
      page: {
        total: 40,
        current: 1,
        size: 20,
      },
    };
  },

  created () {
    this.getTableData();
  },

  methods: {
    getTableData ({ page, size, sort } = {}) {
      if (typeof page === 'undefined') page = this.page.current;
      if (typeof size === 'undefined') size = this.page.size;

      console.log(page, size, sort);

      if (this.data) {
        this.list = this.data;
        this.loading = false;
        return;
      }

      this.loading = true;

      if (this.fetch) {
        // TODO: 确定接口 请求参数 及 响应数据 格式
        this.fetch()
          .then(data => {
            this.list = data.list;
          })
          .finally(() => {
            this.loading = false;
          });
        return;
      }

      this.loading = false;
    },

    exportTableData () {
      // TODO: 导出字段聚合 (导出字段是否会影响表格数据列显示)
      console.log('table export button clicked!');
    },

    resetForm () {
      if (!this.$refs.form) return;
      this.$refs.form.resetFields();
      this.$refs.form.clearValidate();
    },

    resetPage () {
      this.page.current = 1;
      this.getTableData();
    },

    reset () {
      this.resetForm();
      this.resetPage();
    },

    setTableData (data, { total, current = 1, size = 20 } = {}) {
      if (!data) return;
      this.list = data;
      this.page = { total: total || data.length, current, size };
      if (this.loading) this.loading = false;
    },

    setLoading (state) {
      this.loading = !!state;
    },

    refresh () {
      this.getTableData();
    },
  },
};
</script>

<style scoped lang="scss">
  .table {
    width: 100%;
    margin: 20px 0;

    ::v-deep {
      .el-button + .el-dropdown {
        margin-left: 10px;
      }
    }
  }
</style>
