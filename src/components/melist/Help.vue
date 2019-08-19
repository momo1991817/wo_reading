<template>
  <div class="help">
    <!-- 头部 -->
    <van-nav-bar
      title="客服中心"
      left-text
      left-arrow
      @click-left="onClickLeft"
      style="font-weight=700;"
      :border="false"
      :fixed="true"
    />
    <!-- 信息 -->
    <div class="login">
      <div>
        <h3 class="title">常见问题</h3>
        <ul>
          <li>
            <h4>1、目前沃阅读会员特权提供哪些会员服务？</h4>
            <p>沃阅读会员特权提供沃阅读白银/黄金/钻石会员专享特权。其中，白银会员每月免费领取1款周会员产品，黄金会员每月免费领取2款周会员产品，钻石会员每月免费领取1款月会员产品。</p>
          </li>
          <li>
            <h4>2、沃阅读会员特权会员可以享受哪些会员权益</h4>
            <p>沃阅读会员可以享受如下权益：每月领热门VIP会员，免流量访问门户，优先获取线下名家活动入场券等。</p>
          </li>
          <li>
            <h4>3、沃阅读会员特权只有联通用户能用吗？</h4>
            <p>沃阅读会员特权支持联通、移动、电信全网用户输入手机号码登录。</p>
          </li>
          <li>
            <h4>4、如何开通沃阅读会员特权会员？</h4>
            <p>通过“沃阅读”微信公众号底部菜单-“会员特权”进入，点击“开通会员”菜单进入会员开通页面，选择需要开通会员点击开通按钮即可。</p>
          </li>
          <li>
            <h4>5、沃阅读会员特权有哪些支付方式？</h4>
            <p>目前沃阅读会员特权会员支持联通话费支付、微信支付；会员特权商品支持微信支付。其中会员特权会员话费开通，按照自然月计费，按月自动续费；会员特权会员微信开通，按照非自然月（30天）计费，按月自动续费。</p>
          </li>
          <li>
            <h4>6、如何兑换沃阅读权益商品？</h4>
            <p>通过“沃阅读”微信公众号底部菜单-“会员特权”进入，点击“兑换”菜单进入商品兑换页面，输入兑换码后点击兑换按钮即可。</p>
          </li>
          <li>
            <h4>7、沃阅读会员特权会员可以提供月卡/季卡/半年卡/年卡购买吗？</h4>
            <p>当前用户可以通过兑换码的方式，兑换黄金/白银会员的月卡/季卡/半年卡/年卡，有效时间按照非自然月进行计算。</p>
          </li>
          <li>
            <h4>8、可以开通多个会员服务吗？</h4>
            <p>沃阅读会员特权会员不互斥，即用户可订购不同会员产品。同一会员不可重复订购。</p>
          </li>
          <li>
            <h4>9、客服微信</h4>
            <p>反馈问题请联系客服，客服微信: wo15616253653</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    onClickLeft() {
      history.back();
    }
  }
};
</script>

<style lang="less">
.help {
  padding: 0 0.2rem;
  // background-color: #fff;
  // 头部
  > .van-nav-bar {
    width: 3.75rem;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: #fff;
    .van-nav-bar__left {
      .van-icon {
        color: black;
        font-weight: 700;
      }
    }
    > .van-nav-bar__title {
      font-weight: 700;
    }
  }
  // 帮助信息
  > .login {
    margin: 0.5rem 0 0.2rem 0;
    box-shadow: 0 0.02rem 0.1rem 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    border-radius: 0.05rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    > div {
      > h3 {
        padding: 0.15rem 0 0 0;
        margin: 0;
      }
      > ul {
        padding-bottom: 0.2rem;
        > li {
          font-size: 0.13rem;
          color: #000;
          line-height: 0.18rem;
          > h4 {
            font-size: 0.14rem;
            color: #000;
            line-height: 0.2rem;
            margin-bottom: 0.03rem;
          }
          > p {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>