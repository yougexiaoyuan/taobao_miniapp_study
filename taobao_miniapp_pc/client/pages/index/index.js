/*
  首页入口，主要完成首页的展示和相关代码.by kohelp
*/
const app = getApp()
const basePath = '/activity/info';

Page({
  data: {
    show: false,
    labelCol: { fixedSpan: 4 },
    wrapperCol: { span: 20 },
    ruleSignData: {
      days: 1,
      join_times: 1
    },
    activeKey: '',
    defaultActiveKey: basePath,

    info: {
      company: '北京科讴科技有限公司',
      miniappName: '淘宝serverless互动小程序PC端学习展示',
      logo: 'https://luckyhelper.kohelp.com/admin/view_admin/img/logo.73c3acc1.png'
    },
    menu: [

      {
        name: '首页',
        key: 'first',
        title: '首页'
      },
      {
        name: '营销活动',
        key: 'activity',
        title: '营销活动',
        sub_menu: [
          { name: '基本信息', key: 'info' },
          { name: '任务设置', key: 'task' },
          { name: '奖品设置', key: 'prize' }
        ]
      },
      {
        name: '参与用户',
        key: 'participant',
        title: '参与用户'
      },
      {
        name: '兑奖记录',
        key: 'prize',
        title: '兑奖记录'
      },
      {
        name: '生成应用',
        key: 'generate',
        title: '生成应用',
        tabs: [
          { name: '当前版本', key: 'current/123' },
          { name: '生成新版本', key: 'new-version' }
        ]
      }
    ],
    userData: [
      {
        title: '创建活动',
        imgUrl: 'https://img.alicdn.com/imgextra/i2/289589474/O1CN01hkSJjr2Jr8ycoangU_!!289589474.png',
        url: '/pages/activity/create_activity_list/create_activity_list',
      },
      {
        title: '我的活动',
        imgUrl: 'https://img.alicdn.com/imgextra/i1/289589474/O1CN01nrZwkZ2Jr8yeOga3x_!!289589474.png',
        url: '/pages/activity/activity_list/activity_list',
      },
  
    ],

    templateList: [],

    // 案例信息
    goodCaseTop: [],
    hotTemplate: [
      'https://img.alicdn.com/imgextra/i2/289589474/O1CN01iDbxOU2Jr8ybmOed9_!!289589474.png',
      'https://img.alicdn.com/imgextra/i4/289589474/O1CN01RwGeQt2Jr8zKA0gPm_!!289589474.png',
      'https://img.alicdn.com/imgextra/i1/289589474/TB2l8TzebtlpuFjSspoXXbcDpXa-289589474.jpg',
      'https://img.alicdn.com/imgextra/i3/289589474/TB2GmAUkhtmpuFjSZFqXXbHFpXa-289589474.png',
      'https://img.alicdn.com/imgextra/i3/289589474/TB2BHJzemBjpuFjy1XdXXaooVXa-289589474.jpg',
      'https://img.alicdn.com/imgextra/i1/289589474/TB2.pQvXuUkyKJjSspjXXbKTXXa-289589474.jpg'
    ],
    setMiniapp: [
      'https://img.alicdn.com/imgextra/i4/289589474/O1CN01FMVKmA2Jr8yJhO3yD_!!289589474.png',
      'https://img.alicdn.com/imgextra/i2/289589474/O1CN016WAnAd2Jr8yMNIH5W_!!289589474.png',
      'https://img.alicdn.com/imgextra/i3/289589474/O1CN01lBEcSR2Jr8yKQ4AEp_!!289589474.jpg',
      'https://img.alicdn.com/imgextra/i2/289589474/O1CN013327tz2Jr8yLjcX6x_!!289589474.png',
      'https://img.alicdn.com/imgextra/i3/289589474/O1CN01jMtLnj2Jr91qcdYmR_!!289589474.jpg',
      'https://img.alicdn.com/imgextra/i4/289589474/O1CN01fb5AsK2Jr91psivK6_!!289589474.jpg'
    ],
  },
  onLoad(query) {
    // console.log('onLoad')
  },
  onReady() {
    // console.log('onReady')
    // 页面加载完成
    // 页面显示
    let that = this
    // setTimeout(() => {
    // that.getSysTemplate()
    // that.getCaseInfo()
    // }, 2000);
  },
  onShow() {
    // console.log('onShow')
    this.setData({ show: true })

  },
  onHide() {
    // console.log('onHide')
    this.setData({ show: false })
    // 页面隐藏
  },
  onUnload() {
    // console.log('onUnload')
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },

  getSysTemplate() {
    let that = this
    app.luckyHttp(app.diyGetList, 'GET', { home_index: 1 }, res => {
      that.setData({
        templateList: res.list
      })
    })
  },

  getCaseInfo() {
    let that = this
    app.luckyHttp(app.get_case_info, 'GET', {}, res => {
      that.setData({
        goodCaseTop: res.top,
        // goodCaseMiddle: res.middle.concat(res.middle),
        // goodCaseBottom: res.bottom,
      })
    })
  },

  handleUsed(e) {
    my.showLoading({ content: "加载中..." });
    app.luckyHttp(app.used_template, 'POST', {
      themeid: e.currentTarget.dataset['id'],
      is_auto_memo: 1,
      is_need_userauth: 1
    }, res => {
      my.hideLoading()
      res = JSON.parse(res)
      if (res.status == 200) {
        my.navigateTo({ url: `/pages/activity/activity_form/activity_form?id=${res.msg}` })
      } else {
        my.showToast({ content: '创建失败，一会再试试' });
        return false
      }
    })
  }
});
