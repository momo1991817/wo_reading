<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div class="tab-w" v-show="$route.meta.showFooter">
      <van-tabbar v-model="active" color="#ad6bff">
        <van-tabbar-item to="/">
          <img v-if="home" src="../static/images/home.png" alt="" />
          <img v-else src="../static/images/home-active.png" alt="" />
          <div>首页</div>
        </van-tabbar-item>
        <van-tabbar-item to="/vip">
          <img
            v-if="vip"
            class="vip-img"
            src="../static/images/vip.png"
            alt=""
          />
          <img
            v-else
            class="vip-img-active"
            src="../static/images/vip-active.png"
            alt=""
          />
        </van-tabbar-item>
        <van-tabbar-item class="prpro" to="/me">
          <img v-if="pepro" src="../static/images/pepro.png" alt="" />
          <img v-else src="../static/images/pepro-active.png" alt="" />
          <div>我的</div>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload //调用reload方法
    };
  },
  data: () => ({
    active: 0,
    isRouterAlive: true, //一开始router-view为true
    home: true,
    vip: true,
    pepro: true
  }),
  created() {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      //在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  },
  watch: {
    $route(to, from) {
      //判断是否显示tabbar
      if (to.path == "/") {
        this.active = 0;
        this.home = false;
        this.vip = true;
        this.pepro = true;
      } else if (to.path == "/vip") {
        this.active = 1;
        this.home = true;
        this.vip = false;
        this.pepro = true;
      } else if (to.path == "/me") {
        this.active = 2;
        this.home = true;
        this.vip = true;
        this.pepro = false;
      }
    }
  }
};
</script>

<style lang="less">
#app {
  padding-bottom: 0.5rem;
  // tabbar样式
  .van-tabbar-item {
    position: relative;
    > .van-tabbar-item__icon {
    }
  }
  .van-tabbar-item__text {
    > img {
      width: 21px;
      height: 18px;
    }
    > .vip-img {
      width: 36.5px;
      height: 14.5px;
    }
    > .vip-img-active {
      width: 41px;
      height: 41px;
    }
    > div {
      text-align: center;
      font-size: 14px;
      // color: #666666;
      position: relative;
      left: -4px;
    }
  }

  // 选中高亮
  .van-tabbar {
    width: 3.75rem;
    margin: auto auto;
  }
  .van-tabbar--fixed {
    position: fixed;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
  }
  .van-tabbar-item--active {
    color: #000;
    font-weight: 600;
  }
}
</style>
