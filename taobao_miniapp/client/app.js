import cloud from '@tbmp/mp-cloud-sdk';
import parse from 'mini-html-parser2';
cloud.init({
  env: 'test'
});

App({
  cloud,
  userInfo: {},
  cloudAppId: 9608, // 小程序云应用的ID，12750抽奖有礼。9608互动靠手
  timeout: 80000, // 请求过期时间
  activeId: 10,// 2859 上线使用
  shopId: 121686309,  // 测试店铺--121686309
  themeId: 0, // 系统模板使用，商家一定是0.
  gameType: 4,//4转盘 7大富翁 14红包 8砸蛋 9老虎机  12刮刮卡
  pagequery: {},
  // 前后台像素换算倍率
  numMultiple: 2,
  memo_nodes:'',
  tbFlow: 302,
  // 规则列表
  ruleDataList: [],
  // 多页面布局信息
  layoutList: [],



  addLogInfo: 'addLogInfo', // 日志同步信息
  getElement: 'getElement', // 获取4大基础信息
  getLuckyChance: 'getLuckyChance', // 抽奖
  changeLuckySendStatus: 'changeLuckySendStatus', // 修改抽奖中奖表发送状态
  saveSignin: 'saveSignin', // 签到
  shopFollow: 'shopFollow', // 收藏
  shareActivity: 'shareActivity', // 分享活动
  getShareUrl: 'getShareUrl',//获取分享链接
  saveVote: 'saveVote', // 投票

  // 关注有礼
  getFollowResult: 'get_follow_result', // 关注有礼
  getFollowElement: 'get_follow_element', // 关注有礼获取基础信息
  getFollowLuckyDog: 'get_follow_lucky_dog', // 获取关注有礼中奖数据
  changeFollowLuckySendStatus: 'change_follow_lucky_send_status', // 修改优惠券发送状态
  // 分享裂变
  getShareElement: 'share/get_element', // 关注有礼获取基础信息
  joinShare: 'share/join', // 关注有礼
  getShareLuckyDog: 'share/get_lucky_dog', // 获取关注有礼中奖数据
  getShareResult: 'share/get_result', // 点击获取奖励按钮
  changeShareLuckySendStatus: 'share/change_lucky_send_status', // 修改优惠券发送状态
  // 签到有礼日历版
  getSignResult: 'get_sign_result', // 日历签到
  getSignElement: 'get_sign_element', // 签到有礼获取基础信息
  getSignLuckyDog: 'get_sign_lucky_dog', // 获取签到有礼中奖数据
  changeSignLuckySendStatus: 'change_sign_lucky_send_status', // 修改优惠券发送状态
  gameSignWin: '签到完成', // 定义签到成功的提示
  // 晒图有礼
  getImageResult: 'get_image_result', // 点击领奖
  getImageElement: 'get_image_element', // 获取基础信息
  getImageLuckyDog: 'get_image_lucky_dog', // 获取中奖数据
  changeImageLuckySendStatus: 'change_image_lucky_send_status', // 修改优惠券发送状态
  uploadImage: 'upload_image', // 上传图片

  // 闭环营销
  // 开始营销
  postStartMarket: 'post_start_market',
  // 结束营销
  postEndMarket: 'post_end_market',

  luckyDog: 'luckyDog',
  saveAddress: 'saveAddress',
  showGoods: 'showGoods',
  sendFlow: 'sendFlow',
  goodsBrowse: 'goodsBrowse',
  inputMsg: 'inputMsg',

  ruleObj: {
    201: '商品件数',
    202: '交易额',
    203: '订单好评',
    204: '订单数',
    211: '无门槛抽奖',
    212: '指定昵称',
    213: '每日签到',
    214: '关注店铺',
    215: '会员规则',
    221: '分享活动',
    222: '浏览宝贝',
    231: '投票规则',
    232: '录入信息',
  },
  ruleSuffixList: {
    211: '',
    204: '笔',
    201: '件',
    202: '元',
    203: '个',
    212: '',
    221: '个',
    213: '',
    214: '',
    215: '',
    222: '件',
    231: '',
    232: '',
  },

  // infoApi: "/index.php/draw/infoapi",
  // drawApi: "/index.php/draw/drawapi",
  // joinApi: "/index.php/draw/joinapi",
  // lzinfoApi: "/index.php/draw/lzinfoapi",
  // lzApi: "/index.php/draw/lzapi",
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');

    // this.activeId = 58;
    // this.shopId = 121686309;
    // this.themeId=86;
  },

  onShow(options) {
    my.hideBackHome()


    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  // 获取用户信息
  // 2021-09-13 修改
  getUserInfo() {
    // console.log('app.js', 1)
    return new Promise((resolve, reject) => {
      // console.log('app.js', 3)
      if (Object.keys(this.userInfo).length > 0) {
        // console.log('app.js', 4)
        resolve(this.userInfo);
      } else {
        // console.log('app.js', 5)
        // 获取用户对小程序的授权状态
        my.getSetting({
          success: (res) => {
            // console.log('app.js', 6)
            // console.log('app.js', res)
            // 没有用户信息
            if (res.authSetting.userInfo == null || res.authSetting.userInfo == false) {
              // console.log('app.js', 7)
              my.authorize({
                scopes: 'scope.userInfo',
                success: authcode => {
                  // console.log('app.js', 8)
                  my.getAuthUserInfo({
                    success: res => {
                      // console.log('app.js', 9)
                      this.userInfo = res;
                      resolve(this.userInfo);
                    },
                    fail: (e) => {
                      // console.log('app.js', 10)
                      this.funcExcept(e, false)
                      reject(e);
                    },
                  })
                },
                fail: (e) => {

                  my.showActionSheet({
                    title: '1.授权需要获取用户昵称信息 ，方便商家更好服务消费者。2.不授权无法获取到用户昵称，无法参与活动，而且中奖无法联系用户。',
                    items: ['用户授权', '跳过授权', '安全退出'],
                    badges: [
                      { index: 0, type: 'point' },
                      { index: 1, type: 'point' },
                      { index: 2, type: 'point' },
                    ],
                    success: (res) => {
                      // 安全退出
                      if (res.index == -1 || res.index == 2) {
                        my.exit();
                      }
                      // 用户授权
                      if (res.index == 0) {
                        my.openSetting({
                          success: (res) => {
                            my.alert({ content: '授权成功后，请重新进入小程序即可' })
                          }
                        })
                      }
                      //跳过授权
                      if (res.index == 1) {
                        my.navigateTo({ url: '/pages/noAuth/noAuth' })
                      }
                    },
                  });
                  // this.funcExcept(e, false)
                  reject(e);
                }
              });
            }
            // 用户已授权,直接获取用户信息
            else {
              my.getAuthUserInfo({
                success: res => {
                  // console.log('app.js', 9)
                  // console.log('app.js', res)
                  this.userInfo = res;
                  resolve(this.userInfo);
                },
                fail: (e) => {
                  // console.log('app.js', 10)
                  this.funcExcept(e, false)
                  reject(e);
                },
              })
            }
          }
        })
      }
    });
  },


  // 异常处理函数&增加日志到后台
  async funcExcept(res, isAlert = true) {

  },
  // 获取规则标题集合
  getRuleTitle(ruleList) {
    let awardlistnode = [];
    let that = this
    ruleList.forEach(function (item, index) {
      let textArr = [];
      item.rule_extend = JSON.parse(item.rule_extend)
      if (Array.isArray(item.rule_extend)) {
        for (const extend of item.rule_extend) {
          textArr.push(that.getRuleExtend(extend))
        }
        var children = [];
        textArr.forEach(function (sitem, sindex) {
          // console.log(sindex);
          var text = sitem;
          if (sindex == 0) {
            text = `（${index + 1}）${sitem}`;
          }
          children.push(
            {
              type: "text",
              text: text
            },
          );
          if (sindex < (textArr.length - 1)) {
            children.push(
              {
                attrs: { style: "margin:0 10px 0 10px;font-weight: 600;" },
                children: [{
                  text: '并且必须满足',
                  type: "text"
                }],
                name: 'span',
              }
            );
          }
        })
        awardlistnode.push({
          name: 'div',
          children: children
        })
      } else {
        var text = [that.getRuleExtend(item.rule_extend)];
        awardlistnode.push({
          name: 'div',
          children: [{
            type: 'text',
            text: `（${index + 1}）${text}`,
          }]
        })
      }
    })
    return awardlistnode;
  },
  // 规则过滤
  getRuleExtend(extend) {
    var multi = '';
    var orderDes = '';
    if (extend.is_multi) multi = '【自动累加倍数】';
    if (extend.key && extend.key.orderstate) {
      var orderObj = {
        1: '【买家已付款】',
        2: '【商家已发货】',
        3: '【交易成功】',
        4: '【已付定金】',
        5: '【买家已下单(不限支付状态)】',
      };
      orderDes = orderObj[extend.key.orderstate];
    }
    // ruleList: {201: '商品件数',202: '交易额',203: '订单好评',204: '订单数',211:
    // '无门槛抽奖',212: '指定昵称',213: '每日签到',214: '关注店铺',221: '分享商品',222: '浏览宝贝',231: '投票规则',232: '录入信息'},
    switch (extend.rule_type) {
      case 201:
      case 202:
      case 203:
      case 204:
      case 221:
      case 222:
        return (
          this.ruleObj[extend.rule_type] +
          extend.finish_times +
          this.ruleSuffixList[extend.rule_type] +
          '，可抽奖' +
          extend.join_times +
          '次' +
          orderDes +
          multi
        )
      case 211:
      case 214:
      case 231:
      case 232:
        return (
          this.ruleObj[extend.rule_type] +
          '，可抽奖' +
          extend.join_times +
          '次'
        );
      case 212:
      case 215:
        return this.ruleObj[extend.rule_type] + '，可抽奖';
      case 213:
        return this.ruleObj[extend.rule_type] + `，累计签到${extend.value.days}天，可抽奖${extend.value.join_times}次`
      default:
        return '';
    }
  },

  // 处理活动详情
  async handleActivityDetail(actInfo, ruleList, awardList) {
    var nodes = []
    // 自动生成规则
    if (actInfo.is_auto_memo) {
      nodes.push(this.getBaseObjForDetail(1, '活动标题', actInfo.lucky_title))
      nodes.push(this.getBaseObjForDetail(2, '活动时间', `${actInfo.start_date}~${actInfo.end_date}`))

      nodes.push(this.getBaseObjForDetail(3, '规则', this.getRuleTitle(ruleList)))
      nodes.push(this.getBaseObjForDetail(4, '奖品', this.getAwardTitle(awardList)))

      // nodes.push(this.getBaseObjForDetail(5, '', ''))
    } else {
      // 手动拼写规则
      var info = this.getBaseObjForDetailMemo();
      parse(actInfo.memo, (err, n) => {
        // console.log('n', n)
        n.forEach(function (item) {
          // console.log('item', item)
          info.children.push(item);
        })
        nodes.push(info);
      })

      // nodes.push(this.getBaseObjForDetail(5, '', ''))
    }
    this.memo_nodes = nodes
  },

  //手动拼写规则 活动详情
  getBaseObjForDetailMemo() {
    return {
      name: 'div',
      attrs: {
        class: 'card',
      },
      children: [
        {
          name: 'div',
          attrs: {
            class: 'card-title',
          },
          children: [{
            type: 'text',
            text: `活动详情`,
          }],
        }
      ]
    }
  },

  // 获取基本对象 为 活动详情
  getBaseObjForDetail(type, title, content) {
    if (type === 5)
      return {
        name: 'div',
        attrs: {
          class: 'card',
        },
        children: [{
          type: 'text',
          text: '本活动由卖家全权解释',
        }]
      }
    let children = [{
      type: 'text',
      text: content,
    }]
    if (type == 3 || type == 4) {
      children = content
    }
    return {
      name: 'div',
      attrs: {
        class: 'card',
      },
      children: [
        {
          name: 'div',
          attrs: {
            class: 'card-title',
          },
          children: [{
            type: 'text',
            text: `${type}.${title}`,
          }],

        }, {
          name: 'div',
          attrs: {
            class: 'card-content',
          },
          children: children,
        }

      ]
    }
  },
  // 获取奖品标题集合
  getAwardTitle(awardList) {
    let awardlistnode = [];
    awardList.forEach(function (item) {
      awardlistnode.push({
        name: 'div',
        children: [{
          type: 'text',
          text: item.award_title,
        }]
      })
    })
    return awardlistnode;
  },

  // 上传图片到商家图片空间
  async uploadCloudImage(imgPath, resolve) {
    try {
      const fileImg = await cloud.file.uploadFile({
        filePath: imgPath,
        fileType: 'image',
        seller: true,
        // dirId: '2223'
      })
      // console.log('xxxxx', fileImg);
      resolve(fileImg);
    } catch (e) {
      my.alert({
        content: 'error ' + e.message
      });
    }
  },

  // 小程序跳转外链方法
  navigateToOutside(url) {
    my.call("navigateToOutside", {
      url: url
    });
    // my.navigateTo({ url: '/pages/web/web?url=' + encodeURIComponent(url) })
  }

});
