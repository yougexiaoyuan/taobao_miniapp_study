Component({
  mixins: [],
  data: {
    acid: 0,
    shopid: 0,
    token: '',
    url: '',
    showVersion: false
  },
  props: { actId: 0 },
  didMount() {
    let that = this
    let res = my.getStorageSync({ key: 'user_info' });
    if (res.data.token == null || res.data.token == '') {
      my.alert({
        content: '授权已过期，请重新授权',
        complete: () => {
          my.qn.cleanToken({
            success: (res) => {
            },
            fail: (res) => {
            }
          })
          my.exit();
        }
      })
    }
    let shopid = 0, token = '', showVersion = false
    if (res.success) {
      shopid = res.data.user_info.id
      token = res.data.user_info.qn_token
    }

    let version_limit = res.data.user_info.version_limit.rule
    if (version_limit != '') {
      showVersion = true
    }

    let url = `https://luckyhelper.kohelp.com/admin/lucky/v2_activity_setting_form?acid=${that.props.actId}&ot=edit&shopid=${shopid}&token=${token}`
    that.setData({
      acid: that.props.actId,
      shopid: shopid,
      token: token,
      url: url,
      showVersion: showVersion
    })

  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    // 复制链接
    onCopyLink() {
      my.setClipboard({
        text: this.data.url,
        complete() {
          my.getClipboard({
            success: ({ text }) => {
              my.showToast({ content: '复制成功' });
            },
          });
        }
      });
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
    onHelp() {
      my.qn.navigateToWebPage({
        url: "https://www.yuque.com/docs/share/bce3f420-1e44-4b6b-b533-bebf70f92aa2?#",
        success: res => {
        },
        fail: res => {
        }
      });
    }
  },
});