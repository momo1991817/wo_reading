<template>
  <div class="viphelp">
    <!-- 头部 -->
    <van-nav-bar
      title="VIP会员权益说明"
      left-text
      left-arrow
      @click-left="onClickLeft"
      style="font-weight=700;"
      :border="false"
      :fixed="true"
    />
    <!-- 信息 -->
    <div class="help-c">
      <div>
        <h4 class="title">沃阅读白银会员</h4>
        <ul>
          <li>
            <h4>1、代金券权益</h4>
            <p>白银会员每月免费领取100代金券，可在沃阅读APP中用于购买电子书。</p>
          </li>
          <li>
            <h4>2、普通权益</h4>
            <p>白银会员可选择2款互联网或沃阅读产品权益</p>
          </li>
        </ul>
        <h4 class="title">沃阅读黄金会员</h4>
        <ul>
          <li>
            <h4>1、代金券权益</h4>
            <p>黄金会员每月免费领取200代金券，可在沃阅读APP中用于购买电子书。</p>
          </li>
          <li>
            <h4>2、精品权益</h4>
            <p>黄金会员每月免费领取1款热门互联网VIP周卡或沃阅读产品月卡。</p>
          </li>
          <li>
            <h4>3、普通权益</h4>
            <p>黄金可选择1款互联网或沃阅读产品权益</p>
          </li>
          <li>
            <h4>4、线下权益</h4>
            <p>黄金会员可免费参与沃阅读“四时读书乐”旗下名家活动（活动当月需仍保持会员标识）</p>
          </li>
        </ul>
        <h4 class="title">沃阅读钻石会员</h4>
        <ul>
          <li>
            <h4>1、代金券权益</h4>
            <p>钻石会员每月免费领取300代金券，可在沃阅读APP中用于购买电子书。</p>
          </li>
          <li>
            <h4>2、精品权益</h4>
            <p>钻石会员每月免费领取1款热门互联网VIP月卡或沃阅视界知名讲师课程。</p>
          </li>
          <li>
            <h4>3、普通权益</h4>
            <p>钻石会员可选择1款互联网或沃阅读产品权益</p>
          </li>
          <li>
            <h4>4、线下权益</h4>
            <p>钻石会员可免费参与沃阅读“四时读书乐”旗下名家活动（活动当月需仍保持会员标识）</p>
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
.viphelp {
  max-width: 640px;
  min-width: 300px;
  padding: 0 0.2rem;
  // background-color: #fff;
  // 头部
  > .van-nav-bar {
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
  > .help-c {
    margin: 0.5rem 0 0.1rem 0;
    box-shadow: 0 0.02rem 0.1rem 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    border-radius: 0.05rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    > div {
      > h4 {
        margin: 0;
        padding: 0.05rem 0 0 0;
        margin-bottom: 0.1rem;
      }
      > ul {
        padding-bottom: 0.2rem;
        > li {
          font-size: 0.13rem;
          color: #000;
          line-height: 0.18rem;
          > h4 {
            margin: 0;
            font-size: 0.14rem;
            color: #000;
            line-height: 0.2rem;
            margin-bottom: 0.01rem;
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