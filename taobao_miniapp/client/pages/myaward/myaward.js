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
      }
    ],
    activeTab: 1,
    nickName:'', //旺旺号
    is_auth:false, //是否授权
  },
  onLoad(query) {
    this.setData({activeTab: query.t == "award" ? 0 : 1})
    // 授权
    if (app.actInfo.is_need_userauth == 1) {
      app.getUserInfo().then(user => {
        this.setData({nickName:user.nickName});
        this.setData({is_auth:true});
        this.loadData()
      }, () => {
        this.loadData();
      })
    }else{
      this.loadData()
    }
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
    this.setData({Gender: e.detail.value})
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
    var that = this
    app.luckyHttp(app.saveAddress, 'POST', { 
      buyer_nick: that.data.BuyerNick, 
      real_name: that.data.RealName, 
      gender: that.data.Gender, 
      address: that.data.Address, 
      tel: that.data.Tel, 
      email: that.data.Email, 
      birthDay: that.data.BirthDay,
      shop_id: app.shopId,
    }, res => {
      console.log('res',res)
        my.alert({
          content: res.msg
        })
    }).catch(res => {
      console.log('res',res)
      my.alert({
        content: res.msg
      })
    });
    my.hideLoading();
  },
  loadData() {
    var that = this
    my.showLoading({content: '加载中...'});
    // app.luckyHttp(app.luckyDog, 'GET', { acid: app.activeId, shop_id: app.shopId }, res => {
        app.cloud.function.invoke('luckyHandler', { acid: app.activeId, shop_id: app.shopId }, 'getLuckyDog').then(res => {
      console.log('2222',res)
          that.setData({
        lucky: res.list
      })
    }).catch(res => {
      my.alert({
        content: res.msg
      })
    });
    my.hideLoading()
  },
  close() {
    my.navigateBack()
  },
  getYHQ(e) {
    let url ='https://main.m.taobao.com/index.html'
    // my.navigateTo({ url: '/pages/web/web?url=' + encodeURIComponent('https://main.m.taobao.com/index.html') })
       app.navigateToOutside(url)
  },
});
