<template>
  <!--collapse 是否水平折叠收起菜单-->
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!--是否水平折叠收起菜单 会影响这里字段的显示 -->
    <h3 v-show="isCollapse">SD</h3>
    <h3 v-show="!isCollapse">Scaffold-Decorator</h3>
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  //计算属性
  computed: {
    //没有子菜单
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    //有子菜单 (这样设置会有一个问题 就是有子菜单的 永远会在没有子菜单的下面
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    isCollapse() {
      // 这里的数据就是从vuex取得
      return this.$store.state.tab.isCollapse
    }
  },
  data() {
    return {
      menu: [
        {
          path: '/',
          name: 'home',
          label: 'home',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          label: 'Scaffold-Decorator',
          icon: 'star-off',
          children: [
            {
              path: '/train',
              name: 'train',
              label: 'train',
              icon: 'star-on',
              url: 'Scaffold-Decorator/PageOne'
            },
            {
              path: '/sampling',
              name: 'sampling',
              label: 'sampling',
              icon: 'star-on',
              url: 'Scaffold-Decorator/PageTwo'
            }
          ]
        },
      ]

    }
  },
  methods: {
    //跳转路由 根据名称跳转
    clickMenu(item) {
      this.$store.commit('selectMenu', item)
      this.$router.push({ name: item.name })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>
