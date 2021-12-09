const app = getApp();
Page({
  data: {
    shareType: '',
    shareGoodsId: '',
    goods: [],
    joinRes: {
      msg: '',
      errorMessage: '',
    },
  },
  onLoad() {
    this.loadData()
  },
  onShow() {
    if (this.data.joinRes.msg) {
      my.showToast({ 'content': this.data.joinRes.msg });
    }
    if (this.data.joinRes.errorMessage) {
      my.showToast({ 'content': this.data.joinRes.errorMessage });
    }

  },
  onShareAppMessage(e) {
    let data = {
      title: '抽奖靠手',
      desc: '动动小手，下一个锦鲤就是你~',
      path: `pages/index/index?shopId=${app.shopId}&activeId=${app.activeId}`,
    }
    if (this.data.shareType == "shop") {
      data = {
        title: '抽奖靠手',
        desc: '分享店铺',
        url: 'https://shop' + app.shopId + '.m.taobao.com',
        success: function (e) {
          my.alert({
            content: '分享成功'
          });
        },
        fail: function (e) {
          my.alert({
            content: '分享失败了 ' + JSON.stringify(e)
          });
        }
      }
    } else if (this.data.shareType == "goods") {
      data = {
        title: '抽奖靠手',
        desc: '分享商品',
        url: 'https://h5.m.taobao.com/awp/core/detail.htm?id=' + this.data.shareGoodsId,
      }
    }
    return data
  },
  async loadData() {
    const { cloud } = getApp()
    try {
      my.showLoading({ content: '加载中...' });
      const result = await cloud.application.httpRequest({
        'path': `${app.fetchLuckyData_old}/getModalContent`,
        'method': 'POST',
        'params': { actid: app.activeId, shopid: app.shopId, comname: "share" },
        'headers': {},
        'exts': { "cloudAppId": app.cloudAppId, 'timeout': app.timeout }
      })
      this.setData({ goods: result })
    } catch (e) {
      my.alert({
        content: 'error ' + e.message
      });
    }
    my.hideLoading()
  },
  openGoods(e) {
    let itemId = e.currentTarget.dataset['id']
    my.tb.openDetail({
      itemId: itemId,
      fail: (res) => {
        my.alert({ content: 'error ' + e.message });
      },
    })
  },
  shareActivity() {
    this.setData({ shareType: "activity" })
    my.showSharePanel()
  },
  shareShop() {
    this.setData({ shareType: "shop" })
    my.showSharePanel()
  },
  async shareGoods(e) {
    const { cloud } = getApp()
    this.setData({
      shareType: "goods",
      shareGoodsId: e.currentTarget.dataset['id']
    })
    const result = await cloud.application.httpRequest({
      'path': `${app.fetchLuckyData_old}/share_goods`,
      'method': 'POST',
      'params': { actid: app.activeId, shopid: app.shopId, comname: "share", 'goodsid': e.currentTarget.dataset['id'] },
      'headers': {},
      'exts': { "cloudAppId": app.cloudAppId, 'timeout': app.timeout }
    })
    this.setData({
      'joinRes': result,
    });
    my.showSharePanel()
  },
  close() {
    my.navigateBack()
  },
});
