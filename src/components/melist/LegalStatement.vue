<template>
  <div class="LegalStatement">
    <!-- 头部 -->
    <van-nav-bar
      title="法律声明"
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
        <h4 class="title">领取声明和法律声明</h4>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;感谢您对沃阅读产品服务的信任，您已经进入沃阅读视频权益开通流程，当您完成权益开通后，即可享受我们专门为用户提供的产品服务。
          <br />&nbsp;&nbsp;&nbsp;&nbsp;法律声明：对于本平台提供的各类账户密码，仅供特定用户单独使用，严禁再次分享或转让。否则，视为严重违反本平台规则。本平台有权收回特定账户密码，并对于所造成的不利影响或损失，保留通过法律途径解决的权利。感谢您的配合！
        </div>
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
.LegalStatement {
  width: 3.75rem;
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  // padding: 0 0.2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  > .van-nav-bar {
    position: relative;
    top: 0%;
    left: 50%;
    transform: translate(-50%,0);
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
    width: 100%;
    border-radius: 0.05rem;
    padding: 0 0.5rem;
    box-sizing: border-box;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -75%);
    > div {
      > h4 {
        text-align: center;
        margin: 0 auto;
        padding: 0.05rem 0 0 0;
        margin-bottom: 0.1rem;
      }
      > div {
        letter-spacing: 0.05rem;
      }
    }
  }
}
</style>