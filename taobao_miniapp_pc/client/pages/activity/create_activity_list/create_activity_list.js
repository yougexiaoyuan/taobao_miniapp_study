/*
  创建活动页面.by kohelp
*/
import SettingConfig from "../../../config"

const app = getApp()
Page({
  data: {
    modalMa: false,
    listData: [],
    searchForm: {
      page: 1,
      limit: 20,
      show: 1,
      festival: '',
      game: '',
    },
    game: SettingConfig.gameArr,
    gameOther: SettingConfig.gameOtherArr,
    festival: SettingConfig.festivalArr,
    gameTypeNumberObj: SettingConfig.gameTypeNumberObj,
    qrCodeImage: '',
  },
  onLoad(query) {
    this.getList()
  },
  onShow() { },
  getList() {
    let that = this
    my.showLoading({ content: "加载中..." });
    app.luckyHttp(app.diyGetList, 'GET', that.data.searchForm, res => {
      that.setData({ listData: res.list })
      my.hideLoading()
    })
  },
  handleGetAppUrl() {
    let that = this
    app.luckyHttp(app.getAppUrl, 'GET', {}, res => {
      that.setData({ appUrl: res.url })
    })
  },
  handleFestivalFilter(e) {
    let val = e.currentTarget.dataset['id']
    this.setData({
      'searchForm.game': '',
      'searchForm.festival': val
    })
    this.getList()
  },
  handleGameTypeFilter(e) {
    let val = e.currentTarget.dataset['id']
    this.setData({
      'searchForm.game': val,
      'searchForm.festival': ''
    })
    this.getList()
  },
  // 预览
  onView(e) {
    let that = this
    let id = e.currentTarget.dataset['id']
    my.showLoading({ content: "加载中..." });
    //if (this.data.appUrl == '') this.handleGetAppUrl()
    app.luckyHttp(app.getQrcodeBase, 'GET', { id: id }, res => {
      my.hideLoading()
      that.setData({
        modalMa: true,
        qrCodeImage: res.qrcode
      })

    })
  },
  // 使用
  onUsed(e) {
    let that = this
    let themeId = e.currentTarget.dataset['id']
    let gameType = e.currentTarget.dataset['game_type']

    let luckyTitle = '幸运大抽奖'
    if (gameType === that.data.gameTypeNumberObj.game_shopping) {
      luckyTitle = '关注店铺有礼'
    }
    if (gameType === that.data.gameTypeNumberObj.game_sign) {
      luckyTitle = '签到有礼'
    }
    if (gameType === that.data.gameTypeNumberObj.game_image) {
      luckyTitle = '晒图有礼'
    }
    if (gameType === that.data.gameTypeNumberObj.game_market) {
      luckyTitle = '闭环营销'
    }
    if (gameType === that.data.gameTypeNumberObj.game_share) {
      luckyTitle = '分享裂变'
    }

    my.showLoading({ content: "加载中..." });

    app.luckyHttp(app.used_template, 'POST', {
      is_auto_memo: 1,
      is_need_userauth: 1,
      themeid: themeId,
      lucky_title: luckyTitle,
    }, res => {
      my.hideLoading()
      res = JSON.parse(res)
      if (res.status == 200) {
        my.navigateTo({ url: `/pages/activity/activity_form/activity_form?id=${res.msg}&gametype=${gameType}` })
      } else {
        my.showToast({ content: '创建失败，一会再试试' });
        return false
      }
    })
  },
  modalOnCancel() {
    this.setData({
      modalMa: false
    })
  }
})