<template>
  <div class="admin-layout-page-tab">
    <!-- 标签页 Tab -->
    <el-scrollbar>
      <ul class="tabs flex align-center flex-nowrap">
        <li
          :class="['tab-item', active === -1 ? 'active' : '']"
          @click="handleTabClick"
          @contextmenu.prevent="openContextmenu($event, null, -1)"
        >
          <span class="title px15">首页</span>
        </li>
        <li
          v-for="(item, index) in opened"
          :key="item.fullPath"
          :class="['tab-item', active === index ? 'active' : '']"
          @click="handleTabClick(item, index)"
          @contextmenu.prevent="openContextmenu($event, item, index)"
        >
          <span class="title px15">{{ item.meta.title }}</span>
          <i class="el-icon-close ml10" @click.stop="close(index)" />
        </li>
      </ul>
    </el-scrollbar>
    <!-- 右键菜单 -->
    <ul
      v-show="contextmenu.visible"
      class="contextmenu-list"
      :style="{ left: `${contextmenu.x}px`, top: `${contextmenu.y}px` }"
    >
      <li class="contextmenu-item" @click="refresh">
        <i class="el-icon-refresh" />
        <span class="contextmenu-item-title">刷新</span>
      </li>
      <template v-if="opened.length">
        <!-- 如果当前点击元素不是前两个 -->
        <li v-if="contextmenu.index > 0" class="contextmenu-item" @click="closeWithType('left')">
          <i class="el-icon-arrow-left" />
          <span class="contextmenu-item-title">关闭左侧</span>
        </li>
        <!-- 如果当前点击元素不是最后一个 -->
        <li v-if="contextmenu.index !== opened.length - 1" class="contextmenu-item" @click="closeWithType('right')">
          <i class="el-icon-arrow-right" />
          <span class="contextmenu-item-title">关闭右侧</span>
        </li>
        <li class="contextmenu-item" @click="closeWithType('other')">
          <i class="el-icon-close" />
          <span class="contextmenu-item-title">关闭其它</span>
        </li>
        <li class="contextmenu-item" @click="closeWithType('all')">
          <i class="el-icon-circle-close" />
          <span class="contextmenu-item-title">关闭全部</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contextmenu: {
        visible: false,
        target: null,
        index: -1,
        x: 0,
        y: 0,
        menus: [
          { icon: 'refresh', title: '刷新', value: 'refresh' },
          { icon: 'arrow-left', title: '关闭左侧', value: 'left' },
          { icon: 'arrow-right', title: '关闭右侧', value: 'right' },
          { icon: 'close', title: '关闭其它', value: 'other' },
          { icon: 'circle-close', title: '关闭全部', value: 'all' },
        ],
      },
    };
  },
  computed: {
    active () {
      return this.$store.state.page.active;
    },
    opened () {
      return this.$store.state.page.opened;
    },
  },
  watch: {
    'contextmenu.visible': function (value) {
      if (value) {
        document.body.addEventListener('click', this.closeContextmenu);
      } else {
        document.body.removeEventListener('click', this.closeContextmenu);
      }
    },
  },
  methods: {
    handleTabClick ({ fullPath = '/' } = {}, index = -1) {
      this.$store.commit('page/SET_ACTIVE_PAGE', index);
      this.$router.push(fullPath);
    },
    openContextmenu (event, item, index) {
      this.contextmenu.x = event.clientX;
      this.contextmenu.y = event.clientY;
      this.contextmenu.target = item;
      this.contextmenu.index = index;
      this.contextmenu.visible = true;
    },
    closeContextmenu () {
      this.contextmenu.visible = false;
      this.contextmenu.target = null;
      this.contextmenu.index = -1;
    },
    refresh () {
      console.log('refresh');
    },
    close (index) {
      this.$store.dispatch('page/close', index);
    },
    closeWithType (type) {
      this.$store.dispatch('page/closeWithType', { type, index: this.contextmenu.index });
    },
  },
};
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .el-scrollbar {
    background-color: #2a344e;
  }

  .tabs {
    .tab-item {
      background-color: #41495c;
      height: 36px;
      color: #fafafa;
      border-top-left-radius: 8px;
      box-sizing: border-box;
      margin-right: 12px;
      padding: 10px 0;
      display: flex;
      cursor: pointer;
      flex-wrap: nowrap;
      position: relative;
      transition: background-color ease 0.3s;

      &::after {
        width: 0;
        height: 100%;
        border-left: 20px solid #41495c;
        border-bottom: none;
        border-top: 36px solid transparent;
        border-right: none;
        box-sizing: border-box;
        transition: border-left-color ease 0.3s;
        display: block;
        content: '';
        position: absolute;
        top: 0;
        right: -20px;
      }
    }

    .tab-item.active {
      background-color: #fff;
      color: #333;

      &::after {
        border-left-color: #fff;
        z-index: 1;
      }
    }
  }

  .contextmenu-list {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    padding: 5px 0;
    position: absolute;
    z-index: 2018;

    .contextmenu-item {
      padding: 8px 20px 8px 15px;
      margin: 0;
      font-size: 14px;
      color: #606266;
      cursor: pointer;

      &:hover {
        background: #ecf5ff;
        color: #66b1ff;
      }

      .contextmenu-item-title {
        margin-left: 10px;
      }
    }
  }
</style>
