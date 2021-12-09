/*
  展示宣传页面，通过生成的链接，粘贴到店铺便于用户访问.by kohelp
*/
const { cloud, tempVersion } = getApp();
Component({
  mixins: [],
  data: {
    viewShow: '',
    qrUrl: '',
    selectIndex: 0,
    titleArr: [
      { id: 0, title: '预览推广' }
    ]
  },
  props: { actId: 0 },
  didMount() {
    this.getLink()
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    // 链接
    getLink() {
      let that = this, acid = this.props.actId
      my.showLoading({ content: '加载中...' });


      let userInfo = my.getStorageSync({ key: 'user_info' });
      let shop_id = userInfo.data.user_info.sid
      let seller_nick = userInfo.data.user_info.nickName

      cloud.function.invoke('sellerInfo', { "shop_id": shop_id, "tempVersion": tempVersion, "userNick": seller_nick }, 'initSellerInfo').then(res => {
        my.hideLoading();
        if (res.success) {
          that.setData({
            qrUrl: `${res.data}&page=pages/index/index?shopId%3D${shop_id}%26activeId%3D${acid}`

          })
        } else {
          my.showToast({ content: '保存失败，请稍后再试' });
        }
      })

    },

    // 复制链接
    onCopyUrl() {
      my.setClipboard({
        text: this.data.qrUrl,
        complete() {
          my.getClipboard({
            success: ({ text }) => {
              my.showToast({ content: '复制成功' });
            },
          });
        }
      });
    }
  }
});