/*
  页头控件.by kohelp
*/
Component({
  mixins: [],
  data: {
    user_info: {},
  },
  props: {},
  didMount() {
    let that = this
    let res = my.getStorageSync({ key: 'user_info' });
    console.log('index didMount res',res)
    if (res.success) {
      that.setData({
        user_info: res.data.user_info
      })
    }
  },
  didUpdate() { 
     let that = this
    let res = my.getStorageSync({ key: 'user_info' });
    // console.log('index didUpdate res',res)
  },
  didUnmount() { },
  methods: {
    onHelp(){
          my.redirectTo({ url: `/pages/user_help/user_help` })
    },
    onBuy() {
      my.qn.navigateToWebPage({
        url: "https://fuwu.taobao.com/ser/detail.htm?service_code=ts-20506&tracelog=search&from_key=%E4%BA%92%E5%8A%A8%E9%9D%A0%E6%89%8B",
        success: res => {
        },
        fail: res => {
        }
      });
    },
    onQianniu() {
      my.qn.navigateToWebPage({
        url: "https://www.taobao.com/go/market/webww/ww.php?ver=3&touid=kohelp&siteid=cntaobao&status=1&charset=utf-8",
        success: res => {
        },
        fail: res => {
        }
      });
    },
    onExit() {
      my.qn.cleanToken({
        success: (res) => {
        },
        fail: (res) => {
        }
      })
      my.removeStorageSync({
        key: 'user_info',
      });
      my.exit();
    }
  },
});