import parse from 'mini-html-parser2';

const app = getApp();
Page({
  data: {
    title: "taobao",
    currentConfig: [],
    actInfo: {
    },
    // 布局宽度
    layoutHeight: 1200,
    // 布局背景图片
    bgImage: '', bgColor: '',
    // 规则信息
    ruleList: [],
    // 规则信息--弹窗使用
    ruleAlertList: [],
    // 奖品信息
    awardList: [],
    // 商家信息
    sellerInfo: {},
    user_id: 0,
    // 活动详情
    memo_nodes: '',
    // 游戏正在运行
    gameRunning: false,
    gameRoundOneRunning: false,
    // 大转盘游戏转度
    round_change_angle: 0,
    // 大转盘抽奖的次数--直接照搬的代码，不知作用
    round_play_count: 0,
    // 大转盘游戏类型
    round_game_type: 0,
    // 大转盘游戏效果2的转度
    roundAngleConfig: [],
    // 奖品个数
    countLuckyAward: 0,

    // 大富翁共享参数
    rich_idx: 0,

    // 老虎机共享参数
    tigerGameData: {
      transY1: 0, // 第一列动画
      transY2: 0, // 第二列动画
      transY3: 0, // 第三列动画
      duration1: 5000,
      duration2: 5000,
      duration3: 5000,
      tigerPicUrl: [
      ],
      defaultAwardPicUrl: [
        'https://img.alicdn.com/imgextra/i3/289589474/TB2tQyXcYplpuFjSspiXXcdfFXa-289589474.png',
        'https://img.alicdn.com/imgextra/i2/289589474/TB2WGXwdNhmpuFjSZFyXXcLdFXa-289589474.png',
        'https://img.alicdn.com/imgextra/i1/289589474/TB2vl08c90jpuFjy0FlXXc0bpXa-289589474.png',
        'https://img.alicdn.com/imgextra/i1/289589474/TB2bW0wdNBmpuFjSZFDXXXD8pXa-289589474.png',
        'https://img.alicdn.com/imgextra/i1/289589474/TB2bVMIh5pnpuFjSZFIXXXh2VXa-289589474.png',
        'https://img.alicdn.com/imgextra/i4/289589474/TB294dbdJBopuFjSZPcXXc9EpXa-289589474.png',
      ],
      areaHeight: 90,
    },
    //红包游戏共享参数
    hongbaoGameData: {
      shakeStyle: 'none',//动画class名称
    },

    animationData: {},
    // 背景色弹窗标记
    showShadow: false,
    // 中奖弹窗-显示隐藏标记
    showWin: false,
    // 未中奖弹窗-显示隐藏标记
    showLose: false,

    // 中奖信息
    luckyAward: {},
    // 是否中奖
    luckyRes: false,
    // 是否淘宝卡券的奖品。是：做出提示
    isTbAwardType: false,
    // 未中奖提示信息
    drawNoLuckyMsg: '',
    awardImg: [],
    // 中奖滚动信息
    awardRollInfo: '',
    // 回调地址
    callback: '/pages/gameRich/gameRich',
    // 中奖弹窗背景图片
    awardBackSrc: ''
  },
  onLoad(query) {
    let t = this;
    if (query.activeId) {
      app.activeId = query.activeId;
    }
    if (query.shopId) {
      app.shopId = query.shopId;
    }
    if (query.themeId) {
      app.themeId = query.themeId;
    }
    setTimeout(() => {
      t.loadElements(query);
    }, 100);
    // 页面加载
  },
  onShow() {
    // 页面显示
  },
  onReady() {
    // 页面加载完成
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  // 大转盘点击抽奖按钮的效果
  handleRoundRun(data) {
    this.setData(data)
  },
  setGameData(data) {
    this.setData(data)
  },

  onShareAppMessage() {
    let url = this.data.actInfo.share_url
    return {
      title: '抽奖靠手',
      desc: '动动小手，下一个锦鲤就是你~',
      path: url,//`pages/new_index/new_index?shopId=${app.shopId}&activeId=${app.activeId}`,
    };
  },

  // 对象转数组
  objToArr(data) {
    let obj = Object.keys(data);
    let m = obj.map(key => data[key]);
    return m
  },
  // 获取信息
  async loadElements(query) {
    var that = this
    my.showLoading({ content: '加载中...' });

    app.cloud.function.invoke('luckyHandler', { acid: app.activeId, shop_id: app.shopId }, 'getElement').then(res => {
      my.hideLoading();

      // 152无奖品,182无活动,183无奖品,184无模板
      if ([152, 182, 183, 184].indexOf(res.code) > -1) {
        my.alert({
          content: res.msg,
        });
        return false;
      }

      // 获取到有效数据
      else if (res.code === 100) {
        let awardImg = []
        let ruleAlertList = [];
        let tigerPicUrl = [];
        let richPicUrl = [];
        for (const award of res.awardList) {
          awardImg.push(award.award_pic_url)
          tigerPicUrl.push(award.award_pic_url)
        }

        var concatTigerPicUrl = [...tigerPicUrl, ...that.data.tigerGameData.defaultAwardPicUrl]
        richPicUrl = [...richPicUrl, ...that.data.tigerGameData.defaultAwardPicUrl]

        for (let j = 0; j < res.awardList.length; j++) {
          richPicUrl[res.awardList[j].award_sort - 1] = res.awardList[j].award_pic_url;
        }

        if (8 - richPicUrl.length > 0) {
          for (let i = 0; i < 8 - richPicUrl.length; i++) {
            richPicUrl.push(that.data.tigerGameData.defaultAwardPicUrl[i])
          }
        }

        for (const rule of res.ruleList) {
          if (rule.rule_type === 0) {
            for (const sub_rule of rule.rule_extend) {
              var sub_obj = {}
              sub_obj.rule_type = sub_rule.rule_type
              sub_obj.finish_times = sub_rule.finish_times
              sub_obj.join_times = sub_rule.join_times
              sub_obj.value = sub_rule.value
              ruleAlertList.push(sub_obj)
            }
          } else {
            var obj = {}
            obj.rule_type = rule.rule_type
            obj.finish_times = rule.rule_extend.finish_times
            obj.join_times = rule.rule_extend.join_times
            obj.value = rule.rule_extend.value
            ruleAlertList.push(obj)
          }
        }
        this.setData({
          actInfo: res.activityInfo,
          ruleList: res.ruleList,
          awardList: res.awardList,
          countLuckyAward: res.awardList.length,

          currentConfig: this.objToArr(res.layoutInfo[0].val),
          layoutHeight: res.layoutInfo[0].height * app.numMultiple,
          bgImage: res.layoutInfo[0].bg,
          bgColor: res.layoutInfo[0].bgColor ? res.layoutInfo[0].bgColor : '#fff',
          awardBackSrc: res.layoutInfo[0].awardBackSrc,
          awardImg: awardImg,
          ruleAlertList: ruleAlertList,
          'tigerGameData.tigerPicUrl': concatTigerPicUrl,
          richPicUrl: richPicUrl,
          awardRollInfo: res.awardRollInfo
        });

        app.handleActivityDetail(this.data.actInfo, this.data.ruleList, this.data.awardList);

        app.layoutList = res.layoutInfo
        app.ruleDataList = res.ruleList
        app.actInfo = res.activityInfo
        app.awardList = res.awardList

        if (query.index) {
          my.navigateTo({ url: `/pages/custom/custom?index=${query.index}&callback=${this.data.callback}` });
        }
      }
      else {
        app.funcExcept(res);
      }
    }, err => {
      console.log('error', err)
    });
  },
  // 隐藏抽奖弹窗
  hideModal: function () {
    var that = this
    var animation = my.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })

    that.animation = animation
    animation.translateY(890).step()
    that.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        showShadow: false,
        showWin: false,
        showLose: false
      })
    }, 500)
  },
  // 填写领奖信息
  gotoMyInfo(type = 'myinfo') {
    my.navigateTo({ url: `/pages/myaward/myaward?t=${type}` })
  },
  // 领取优惠券
  getYHQ() {
    let url = this.data.luckyAward.award_url
    app.navigateToOutside(url)
  },
  // 关注店铺
  handleFavorShop() {
    my.tb.favorShop({
      id: "289589474",
      async success() {
        app.luckyHttp(app.shopFollow, 'POST', { acid: app.activeId, shop_id: app.shopId }, res => {
          my.showToast({ 'content': res.msg });
        }).catch(res => {
          my.showToast({ 'content': res.msg });
        });
      },
      fail: (res) => {
        if (res.error == 11) {
          my.showToast({ 'content': '关注店铺已取消' });
        } else {
          my.showToast({ 'content': '已经关注过该店铺，请勿重复关注' });
        }
      }
    })

  },
  gotoHotGoods() {
    my.navigateTo({ url: '/pages/showgoods/showgoods' })
  },
  gotoLZ() {
    my.navigateTo({ url: '/pages/input_msg/input_msg' })
  },
  // 购买宝贝
  gotoBuyItem(e) {
    my.navigateTo({ url: `/pages/buygoods/buygoods?award_type=${e.target.dataset.award_type}` })
  },
  // 进入店铺
  openShop() {
    my.tb.navigateToTaobaoPage({
      appCode: 'shop',
      appParams: {
        shopId: app.shopId.toString(),
        weexShopTab: "shopindexbar",
        weexShopSubTab: "shopindex"
      },
      fail: (res) => {
        console.log(res);
        my.alert({ content: "fail - " + res.error })
      }
    })
  },
  gotoVote() {
    my.navigateTo({ url: '/pages/new_vote/new_vote' });
  },
  handleShareActivity() {
    app.luckyHttp(app.shareActivity, 'POST', { acid: app.activeId, shop_id: app.shopId }, res => {
      my.showSharePanel();
    }).catch(res => {
      my.showToast({ 'content': res.msg });
    });
  },
  // 签到
  handleSign() {
    app.luckyHttp(app.saveSignin, 'POST', { acid: app.activeId, shop_id: app.shopId }, res => {
      my.alert({
        content: res.msg
      });
    }).catch(res => {
      my.alert({
        content: res.msg
      });
    });
  },
  // 领取流量
  getTbFlow(e) {
    let award_per_num = e.currentTarget.dataset.award_per_num;
    app.luckyHttp(app.sendFlow, 'POST', { acid: app.activeId, shop_id: app.shopId, award_per_num: award_per_num }, res => {
      my.showSharePanel();
    }).catch(res => {
      my.showToast({ 'content': res.msg });
    });
  },
  // 打开活动说明
  openMemoModal() {
    my.navigateTo({ url: '/pages/detail/detail' })
  },

  //跳转加入会员页面
  joinMember() {
    let url = `market.m.taobao.com/app/sj/member-center-rax/pages/pages_index_index?wh_weex=true&source=ShopSelfUse&sellerId=${this.data.user_id}`
    app.navigateToOutside(url)
  },
})