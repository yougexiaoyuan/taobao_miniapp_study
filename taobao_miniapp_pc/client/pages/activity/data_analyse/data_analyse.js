/*
  数据分析.by kohelp
*/
const app = getApp();
Page({
  data: {
    acid: 0,
    gametype: 0,
    selectTab: 'dataDetail',
  },
  onLoad(query) {
    this.setData({ acid: query.acid, gametype: query.gametype })
  },
  onShow() { },
  tabOnChange(e) {
    let that = this   
    that.setData({
      selectTab: e.detail.value
    })
    if (e.detail.value == 'dataTbMini') {
      my.showLoading({ content: '加载中...' });
      app.luckyHttp(`${app.get_shop_app_id}`, 'GET', {}, res => {
        my.hideLoading();
        if (res.data && res.data != '') {
          my.qn.navigateToWebPage({
            url: `https://console-snipcode.taobao.com/miniapp/data/board#/index?appId=${res.data}`,
            success: res => {
            },
            fail: res => {
            }
          });
        }

      })
    }
  }
})