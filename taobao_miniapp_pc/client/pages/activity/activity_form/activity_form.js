/*
  活动创建表单，需要填入基本信息
*/
Page({
  data: {
    actId: 0,
    selectTab: 'base',
    counter: {}
  },
  onLoad(query) {
    this.setData({ actId: query.id })
  },

  onShow() {

  },
  tabOnChange(e) {
    this.setData({
      selectTab: e.detail.value
    })
    if (e.detail.value == 'base') { }
    if (e.detail.value == 'award') {

    }
  },
  tabClick(e) {
    let tab = e.target.dataset.tab
    this.setData({
      selectTab: tab
    })
  },
  // 子组件调用
  handleTab(e) {
    this.setData({
      selectTab: e
    })
  }
})