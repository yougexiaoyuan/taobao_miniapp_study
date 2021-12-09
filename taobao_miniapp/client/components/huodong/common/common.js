const app = getApp();
Component({
  mixins: [],
  data: {
    is_public: 1
  },
  props: { actInfo: {} },
  didMount() {

    this.setData({
      width: '100%',
      height: '86',

      logoConfig: 'https://img.alicdn.com/imgextra/i2/289589474/O1CN01hbTirS2Jr92AKIZCg_!!289589474.png',
    });
  },
  didUpdate() {

    if (this.props.actInfo && this.props.actInfo.is_public != '') {
      this.setData({
        is_public: this.props.actInfo.is_public
      })
    }
  },
  didUnmount() { },
  methods: {
    // https://m.duanqu.com/?_ariver_appid=3000000037174641&_mp_code=tb&transition=present&pages/flow_share/flow_share
    handleGotoFlowShare() {
      my.navigateToMiniProgram({
        appId: "3000000037174641", // 跳转到抢大礼
        path: "pages/flow_share/flow_share"
      });
    }
  }
});
