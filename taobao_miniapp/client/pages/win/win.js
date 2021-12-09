import common from '../../utils/common';

const app = getApp();
Page({
  data: {
    lucky: [],
    BuyerNick: '',
    RealName: '',
    Gender: '男',
    Address: '',
    Tel: '',
    Email: '',
    BirthDay: '',
    tabs: [
      {
        title: '中奖结果',
      },
      {
        title: '领奖信息',
      },
    ],
    activeTab: 1,
  },
  onLoad(query) {
    this.setData({activeTab: query.t == "award" ? 0 : 1})
    this.loadData()
  },
  handleTabClick({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  handleTabChange({ index }) {
    this.setData({
      activeTab: index,
    });
  },
  inputBuyerNick(e) {
    this.setData({BuyerNick: e.detail.value})
  },
  inputRealName(e) {
    this.setData({RealName: e.detail.value})
  },
  changeGender(e) {
    this.setData({Gender: e.detail})
  },
  inputTel(e) {
    this.setData({Tel: e.detail.value})
  },
  inputEmail(e) {
    this.setData({Email: e.detail.value})
  },
  inputBirthDay(e) {
    this.setData({BirthDay: e.detail.value})
  },
  inputAddress(e) {
    this.setData({Address: e.detail.value})
  },

  async submitInfo() {
    if(this.data.BuyerNick == "") {
      my.showToast({
        type: "fail",
        content: "请输入您的登录昵称"
      })
      return false
    }
    if(this.data.RealName == "") {
      my.showToast({
        type: "fail",
        content: "请输入您的姓名"
      })
      return false
    }
    if(this.data.Tel == "") {
      my.showToast({
        type: "fail",
        content: "请输入您的电话号码"
      })
      return false
    }
    if(this.data.Address == "") {
      my.showToast({
        type: "fail",
        content: "请输入您的详细地址"
      })
      return false
    }

    my.showLoading({content: '提交中...'});
    const {cloud} = getApp()
    var that = this
    try{
      const result = await cloud.application.httpRequest({
        'path' : `${app.fetchLuckyData_old}/saveAddress`, 
        'method':'POST',
        'params': {
          BuyerNick: that.data.BuyerNick, 
          RealName: that.data.RealName, 
          Gender: that.data.Gender.value, 
          Address: that.data.Address, 
          Tel: that.data.Tel, 
          Email: that.data.Email, 
          BirthDay: that.data.BirthDay
        },
        'headers': {},
        'exts': {  "cloudAppId":app.cloudAppId ,'timeout': app.timeout }
      })

      my.alert({
        content: "提交成功"
      })
    } catch(e) {
      my.alert({
        content: 'error ' + e.message  
      });  
    }
    my.hideLoading();
  },
  async loadData() {
    const {cloud} = getApp()
    var that = this
    try{
      my.showLoading({content: '加载中...'});
      const result = await cloud.application.httpRequest({
        'path' : `${app.fetchLuckyData_old}/getModalContent`, 
        'method':'POST',
        'params': {actid: app.activeId, shopid: app.shopId, comname: "myaward"},
        'headers': {},
        'exts': {  "cloudAppId":app.cloudAppId ,'timeout': app.timeout }
      })
      result.lucky.forEach(function(item) {
          var date = new Date(parseInt(item.Time + "000"));
          item.my_date = common.formatDate(date, "yyyy-MM-dd hh:mm:ss")
      })
      that.setData({
        lucky: result.lucky,
        BuyerNick: result.user?result.user.BuyerNick:'', 
        RealName: result.user?result.user.RealName:'', 
        Gender: result.user && result.user.Gender == '女' ? '女' : '男',
        Tel: result.user?result.user.Tel:'',
        Email: result.user?result.user.Email:'',
        BirthDay: result.user?result.user.BirthDay:'',
        Address: result.user?result.user.Address:'',
      })
    } catch(e) {
      my.alert({
        content: 'error ' + e.message  
      });  
    }
    my.hideLoading()
  },
  close() {
    my.navigateBack()
  },
  getYHQ(e) {
    let url =e.currentTarget.dataset.url
    // my.navigateTo({ url: '/pages/web/web?url=' + encodeURIComponent(e.currentTarget.dataset.url) })
      app.navigateToOutside(url)
  },
});
